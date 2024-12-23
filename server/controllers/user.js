const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  gennerateAccessToken,
  gennerateRefreshToken,
} = require("../middlewares/jwt");
const crypto = require("crypto");
const sendMail = require("../ultils/sendMail");
const jwt = require("jsonwebtoken");
const makeToken = require("uniqid");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, phone } = req.body;
  if (!email || !password || !firstname || !lastname || !phone) {
    return res.status(400).json({
      success: false,
      msg: "Missing inputs",
    });
  }
  const user = await User.findOne({ email });
  if (user) throw new Error("User already exists");
  else {
    const token = makeToken();
    const emailNotActived = btoa(email) + "@" + token;
    const newUser = await User.create({
      email: emailNotActived,
      password,
      firstname,
      lastname,
      phone,
      token,
    });
    if (newUser) {
      const html = `<h2>Register code: </h2><br /> <blockquote>${token}</blockquote>`;
      await sendMail({
        email,
        html,
        subject: "Confirm register account",
      });
    }
    setTimeout(async () => {
      await User.deleteOne({ email: emailNotActived });
    }, [200000]);

    return res.status(200).json({
      success: newUser ? true : false,
      msg: newUser
        ? "Please check your email to complete the registration"
        : "Something went wrong",
    });
  }
});

const finalRegister = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const notActivedEmail = await User.findOne({
    email: new RegExp(`${token}$`),
  });
  if (notActivedEmail) {
    notActivedEmail.email = atob(notActivedEmail?.email?.split("@")[0]);
    notActivedEmail.save();
  }
  return res.status(200).json({
    success: notActivedEmail ? true : false,
    msg: notActivedEmail
      ? "Register is Successlly. Pls go login"
      : "Something went wrong",
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      msg: "Missing inputs",
    });
  }
  const response = await User.findOne({ email });
  if (response && (await response.isCorrectPassword(password))) {
    const { password, refreshToken, ...userData } = response.toObject();
    const accessToken = gennerateAccessToken(response._id, response.role);
    const newRefreshToken = gennerateRefreshToken(response._id);
    await User.findByIdAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      userData: {
        ...userData,
        role: response.role,
      },
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id, {
    password: 0,
    refreshToken: 0,
  })
    .populate({
      path: "cart",
      populate: {
        path: "product",
        select: "title thumb price",
      },
    })
    .populate("wishlist", "title thumb price color");
  return res.status(200).json({
    success: user ? true : false,
    result: user ? user : "User not found",
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookie");

  const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const responese = await User.findOne({
    _id: result._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: responese ? true : false,
    newAccessToken: responese
      ? gennerateAccessToken(responese._id, responese.role)
      : "Refresh token not matched",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");

  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status.json({
    success: true,
    msg: "Logout is done!!!",
  });
});

const forgotpassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      msg: "Missing email",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      msg: "User not found",
    });
  }
  const resetToken = user.createPasswordChangeToken();
  await user.save();

  const html = `Please click on the link below to change your password. This link will expire in 15 minutes from now.
    <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`;

  const data = {
    email,
    html,
    subject: "Forgot password",
  };
  const rs = await sendMail(data);
  return res.status(200).json({
    success: rs.response?.includes("OK") ? true : false,
    msg: rs.response?.includes("OK")
      ? "Check your email to change password"
      : "Something went wrong",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing inputs");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Invalid reset token");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangeAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    msg: user ? "Updated password" : "Something went wrong",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  let queries = { ...req.query };
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);
  let queryString = JSON.stringify(queries);

  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQuries = JSON.parse(queryString);

  if (queries?.name)
    formatedQuries.title = { $regex: queries.title, $options: "i" };

  if (req.query.q) {
    delete formatedQuries.q;
    formatedQuries["$or"] = [
      { firstname: { $regex: req.query.q, $options: "i" } },
      { lastname: { $regex: req.query.q, $options: "i" } },
      { email: { $regex: req.query.q, $options: "i" } },
    ];
  }

  let queryCommand = User.find(formatedQuries);

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join("  ");
    queries = queryCommand.sort(sortBy);
  }

  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_USERS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  try {
    const response = await queryCommand.exec();
    const counts = await User.find(formatedQuries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      users: response ? response : "Cannot get users",
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const response = await User.findByIdAndDelete(uid);
  return res.status(200).json({
    success: response ? true : false,
    message: response
      ? `User with email ${response.email} delete`
      : "No user delete",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { firstname, lastname, phone, email, address } = req.body;
  const data = { firstname, lastname, phone, email, address };
  if (req.file) {
    data.avatar = req.file.path;
  }

  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, data, {
    new: true,
  }).select("-password -role");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response
      ? "Updated user successfully"
      : "Something went wrrong",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    message: response ? "Updated user successfully" : "Something went wrong",
  });
});

const updateAddressUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { address } = req.body;

  if (!address) throw new Error("Missing inputs");

  // Lấy danh sách địa chỉ hiện tại
  const user = await User.findById(_id).select("address");
  if (!user) throw new Error("User not found");

  // Kiểm tra địa chỉ trùng lặp
  const isAddressExist = user.address.some(
    (addr) => addr.toLowerCase() === address.toLowerCase()
  );
  if (isAddressExist) {
    return res.status(400).json({
      success: false,
      message: "Address already exists",
    });
  }

  // Thêm địa chỉ mới nếu không trùng lặp
  const response = await User.findByIdAndUpdate(
    _id,
    { $push: { address: address } },
    {
      new: true,
    }
  ).select("-password -role -refreshToken");

  return res.status(200).json({
    success: response ? true : false,
    updatedAddressUser: response ? response : "Something went wrong",
  });
});
const updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity = 1, color, price, thumbnail, title } = req.body;

  if (!pid || !color) throw new Error("Missing inputs");

  // Lấy thông tin giỏ hàng của user
  const user = await User.findById(_id).select("cart");

  // Tìm sản phẩm trong giỏ hàng với màu sắc tương ứng
  const alreadyProduct = user?.cart?.find(
    (el) => el.product.toString() === pid && el.color === color
  );

  if (
    alreadyProduct &&
    alreadyProduct.price === price &&
    alreadyProduct.color === color
  ) {
    // Nếu sản phẩm với màu sắc đó đã có, chỉ cần cộng thêm số lượng
    const response = await User.updateOne(
      {
        _id,
        cart: {
          $elemMatch: { product: pid, color }, // Đảm bảo chỉ cập nhật sản phẩm khớp màu
        },
      },
      {
        $inc: { "cart.$.quantity": quantity }, // Cộng thêm số lượng
      },
      { new: true }
    );

    return res.status(200).json({
      success: response.modifiedCount > 0,
      message:
        response.modifiedCount > 0
          ? "Cart updated successfully"
          : "Failed to update cart",
    });
  } else {
    // Nếu sản phẩm chưa có trong giỏ hàng với màu sắc này, thêm mới vào giỏ
    const response = await User.findByIdAndUpdate(
      _id,
      {
        $push: {
          cart: { product: pid, quantity, color, price, thumbnail, title },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Product added to cart" : "Something went wrong",
    });
  }
});

const removeCart = asyncHandler(async (req, res) => {
  const { pid, color } = req.params;
  const { _id } = req.user;
  const response = await User.findByIdAndUpdate(
    _id,
    { $pull: { cart: { product: pid, color } } },
    { new: true }
  );
  if (!response) {
    return res.status(404).json({
      success: false,
      msg: "User not found or product not removed",
    });
  }

  return res.status(200).json({
    success: true,
    counts: response.cart.length,
    message: "Product removed from cart",
  });
});
const fakeCreateUser = asyncHandler(async (req, res) => {
  const userData = require("../ultils/constant").users;
  const createdUsers = await User.insertMany(userData);
  return res.status(200).json({
    success: createdUsers ? true : false,
    users: createdUsers ? createdUsers : "Something went wrong",
  });
});

const updateWishlist = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { _id } = req.user;
  const user = await User.findById(_id);
  const alreadyProduct = user?.wishlist?.find((el) => el.toString() === pid);
  if (alreadyProduct) {
    const response = await User.findByIdAndUpdate(
      _id,
      { $pull: { wishlist: pid } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response
        ? "Product removed from wishlist"
        : "Something went wrong",
    });
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { wishlist: pid } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      message: response ? "Product added to wishlist" : "Something went wrong",
    });
  }
});

module.exports = {
  removeCart,
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotpassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  updateAddressUser,
  updateCart,
  finalRegister,
  fakeCreateUser,
  updateWishlist,
};
