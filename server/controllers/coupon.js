const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createNewCoupon = asyncHandler(async (req, res) => {
  const { name, disCount, expiry } = req.body;
  if (!name || !disCount || !expiry) throw new Error("Mising inputs");
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: response ? true : false,
    createdCoupon: response ? response : "Cannot create new Coupon",
  });
});

const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    success: response ? true : false,
    Coupons: response ? response : "Cannot get Coupon",
  });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await Coupon.findByIdAndUpdate(cid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updateCoupon: response ? response : "Cannot updated Coupon",
  });
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const response = await Coupon.findByIdAndDelete(cid);
  return res.status(200).json({
    success: response ? true : false,
    deleteCoupon: response ? response : "Cannot delete Coupon",
  });
});

module.exports = {
  createNewCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
};
