const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

const createNewBranch = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBranch: response ? response : "Cannot create new branch",
  });
});

const getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.status(200).json({
    success: response ? true : false,
    brands: response ? response : "Cannot get brands",
  });
});

const updateBrand = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await Brand.findByIdAndUpdate(bcid, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updateBrand: response ? response : "Cannot updated brand",
  });
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { bcid } = req.params;
  const response = await Brand.findByIdAndDelete(bcid);
  return res.status(200).json({
    success: response ? true : false,
    deleteBrand: response ? response : "Cannot delete brand",
  });
});

module.exports = {
  createNewBranch,
  getBrands,
  updateBrand,
  deleteBrand,
};
