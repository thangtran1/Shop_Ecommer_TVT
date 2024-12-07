const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  gennerateAccessToken,
  gennerateRefreshToken,
} = require("../middlewares/jwt");
const crypto = require("crypto");
const sendMail = require("../ultils/sendMail");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const makeToken = require("uniqid");

// const register = asyncHandler(async (req, res) => {
//   const { email, password, firstname, lastname, phone } = req.body;
//   if (!email || !password || !firstname || !lastname || !phone) {
//     return res.status(400).json({
//       success: false,
//       msg: "Missing inputs",
//     });
//   }

//   const user = await User.findOne({ email });
//   if (user) {
//     throw new Error("User already exists");
//   } else {
//     const newUser = await User.create(req.body);
//     return res.status(200).json({
//       success: newUser ? true : false,
//       msg: newUser
//         ? "Register is successfully. Please go login"
//         : "Something went wrong",
//     });
//   }
// });

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
    const { password, role, refreshToken, ...userData } = response.toObject();
    const accessToken = gennerateAccessToken(response._id, role);
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
      userData,
    });
  } else {
    throw new Error("Invalid credentials!");
  }
});

// lay thong tin user
const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
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
  const response = await User.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing inputs");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response
      ? `User with email ${response.email} delete`
      : "No user delete",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Something went wrrong",
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
    updatedUser: response ? response : "Something went wrrong",
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
  const { pid, quantity, color } = req.body;

  if (!pid || !quantity || !color) throw new Error("Missing inputs");

  // Lấy thông tin giỏ hàng của user
  const user = await User.findById(_id).select("cart");

  // Tìm sản phẩm trong giỏ hàng với màu sắc tương ứng
  const alreadyProduct = user?.cart?.find(
    (el) => el.product.toString() === pid && el.color === color
  );

  if (alreadyProduct) {
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
      updatedCart:
        response.modifiedCount > 0
          ? "Cart updated successfully"
          : "Failed to update cart",
    });
  } else {
    // Nếu sản phẩm chưa có trong giỏ hàng với màu sắc này, thêm mới vào giỏ
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { cart: { product: pid, quantity, color } } },
      { new: true }
    );

    return res.status(200).json({
      success: response ? true : false,
      updatedCart: response ? response : "Something went wrong",
    });
  }
});

module.exports = {
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
};
