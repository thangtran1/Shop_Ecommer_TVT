const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, address, status } = req.body;
  if (address) {
    await User.findByIdAndUpdate(_id, { address, cart: [] });
  }
  const data = { products, total, address, orderBy: _id };
  if (status) data.status = status;
  const response = await Order.create(data);

  return res.status(200).json({
    success: true,
    result: response ? response : "Something went wrong",
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing inputs");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Something went wrong",
  });
});

const getUserOrder = asyncHandler(async (req, res) => {
  let queries = { ...req.query };
  const excludeFields = ["limit", "sort", "page", "fields", "isMine"];
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  if (queries?.title) {
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  }
  if (queries?.category) {
    formatedQueries.category = { $regex: queries.category, $options: "i" };
  }
  let queryCommand = Order.find(formatedQueries);

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);

  try {
    const orders = await queryCommand.exec();
    const counts = await Order.countDocuments(formatedQueries);

    return res.status(200).json({
      success: true,
      counts,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const getOrders = asyncHandler(async (req, res) => {
  let queries = { ...req.query };

  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" };
  if (queries?.category)
    formatedQueries.category = { $regex: queries.category, $options: "i" };
  let queryCommand = Order.find(formatedQueries);

  // Sorting theo giá
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand.skip(skip).limit(limit);

  // Execute query
  try {
    const response = await queryCommand.exec();
    const counts = await Order.find(formatedQueries).countDocuments();
    return res.status(200).json({
      success: response ? true : false,
      counts,
      orders: response ? response : "Cannot get orders",
    });
  } catch (err) {
    throw new Error(err.message);
  }
});
module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getOrders,
};
