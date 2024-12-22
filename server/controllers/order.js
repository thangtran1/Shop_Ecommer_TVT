const { response } = require("express");
const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

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
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id });
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Something went wrong",
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const response = await Order.find();
  return res.status(200).json({
    success: response ? true : false,
    result: response ? response : "Something went wrong",
  });
});
module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getOrders,
};
