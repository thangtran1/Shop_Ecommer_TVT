const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) throw new Error("Missing inputs");
  const response = await Blog.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBlog: response ? response : "Cannot create new Blog",
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.status(200).json({
    success: response ? true : false,
    updatedBlog: response ? response : "Cannot update Blog",
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Blog.findByIdAndDelete(bid);
  return res.status(200).json({
    success: response ? true : false,
    deletedBlog: response || "Something went wrong",
  });
});

const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.status(200).json({
    success: response ? true : false,
    Blogs: response ? response : "Cannot getBlogs Blog",
  });
});

const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  const blog = await Blog.findById(bid);
  const alreadyDisliked = blog?.disLikes?.find((el) => el.toString() === _id);
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { disLikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  }
  const isLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error("Missing input");
  const blog = await Blog.findById(bid);
  const alreadyDisliked = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { likes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  }
  const isDislike = blog?.disLikes?.find((el) => el.toString() === _id);
  if (isDislike) {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $pull: { disLikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  } else {
    const response = await Blog.findByIdAndUpdate(
      bid,
      { $push: { disLikes: _id } },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      result: response,
    });
  }
});

const getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    bid,
    { $inc: { numberView: 1 } },
    { new: true }
  )
    .populate("likes", "firtname lastname")
    .populate("disLikes", "firtname lastname");
  return res.status(200).json({
    success: blog ? true : false,
    result: blog,
  });
});

const uploadImagesBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file) throw new Error("Mising inputs");
  const response = await Blog.findByIdAndUpdate(
    bid,
    { image: req.file.path },
    { new: true }
  );
  return res.status(200).json({
    status: response ? true : false,
    updatedBlog: response ? response : "Cannot upload image blog",
  });
});
module.exports = {
  createNewBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  likeBlog,
  dislikeBlog,
  getBlog,
  uploadImagesBlog,
};
