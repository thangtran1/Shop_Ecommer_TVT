const { response } = require("express");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    createProduct: newProduct ? newProduct : "Cannot create new product",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid).populate({
    path: "ratings.postedBy",
    select: "firstname lastname avatar",
  });

  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get new product",
  });
});

// Filter, sort & pagination
const getProducts = asyncHandler(async (req, res) => {
  let queries = { ...req.query };

  //tach cac truong dac biet ra khoi qury
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  //format lai cac operators cho dung cu phap mogoose
  let queryString = JSON.stringify(queries);

  //   { price: { $gt: 100 } } tim gia tri > 100
  //   { price: { $gte: 100 } }            >=
  //   { price: { $lt: 100 } }             <
  //   { price: { $lte: 100 } }             <=
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQuries = JSON.parse(queryString);
  let colorQueryObject = {};

  // Filtering theo title
  if (queries?.title)
    formatedQuries.title = { $regex: queries.title, $options: "i" };
  if (queries?.category)
    formatedQuries.category = { $regex: queries.category, $options: "i" };

  if (queries?.color) {
    delete formatedQuries.color;
    const colorArr = queries?.color?.split(",");
    const colorQuery = colorArr.map((el) => ({
      color: { $regex: el, $options: "i" },
    }));
    colorQueryObject = { $or: colorQuery };
  }
  let q = { ...formatedQuries, ...colorQueryObject };
  let queryCommand = Product.find(q);

  // Sorting theo gia
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join("  ");
    queries = queryCommand.sort(sortBy);
  }

  // Fields limit han che truong lay ve
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  // Pagination
  // limit: so object lay vve 1 goi  api
  // skip: 2
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  // Execute query
  // so luong sp thoa man dieu kien !== so luong sp trar ve 1 lan goi api

  try {
    const response = await queryCommand.exec();
    const counts = await Product.find(q).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      products: response ? response : "Cannot get products",
    });
  } catch (err) {
    throw new Error(err.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updateProduct: updatedProduct ? updatedProduct : "Cannot update products",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deleteProduct ? true : false,
    updateProduct: deleteProduct ? deleteProduct : "Cannot delete products",
  });
});

const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star || !pid) throw new Error("Missing inputs");

  const imageUrls = req.files?.map((file) => file.path) || [];
  console.log("Uploaded images:", imageUrls);

  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings?.find(
    (el) => el.postedBy.toString() === _id
  );

  let updatedProduct;

  if (alreadyRating) {
    // Update existing rating
    updatedProduct = await Product.findOneAndUpdate(
      {
        _id: pid,
        "ratings._id": alreadyRating._id,
      },
      {
        $set: {
          "ratings.$.star": star,
          "ratings.$.comment": comment,
          "ratings.$.createdAt": new Date(),
          "ratings.$.images": imageUrls, // Đảm bảo images được set đúng
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: "ratings.postedBy",
      select: "firstname lastname avatar",
    });
  } else {
    // Add new rating
    updatedProduct = await Product.findByIdAndUpdate(
      pid,
      {
        $push: {
          ratings: {
            star,
            comment,
            postedBy: _id,
            createdAt: new Date(),
            images: imageUrls, // Đảm bảo images được set đúng
          },
        },
      },
      { new: true, runValidators: true }
    );
  }

  // sum ratings tong ratings / nguoi danh gia = sum ratings
  const ratingCount = updatedProduct.ratings.length;
  const sumRatings = updatedProduct.ratings.reduce(
    (sum, el) => sum + +el.star,
    0
  );
  updatedProduct.totalRatings =
    Math.round((sumRatings * 10) / ratingCount) / 10;
  await updatedProduct.save();

  return res.status(200).json({
    success: true,
    product: updatedProduct,
  });
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error("Mising inputs");
  const response = await Product.findByIdAndUpdate(
    pid,
    {
      $push: { images: { $each: req.files.map((el) => el.path) } },
    },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updatedProduct: response ? response : "Cannot upload image product",
  });
});

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadImagesProduct,
};
