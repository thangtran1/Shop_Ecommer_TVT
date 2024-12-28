const router = require("express").Router();
const ctrl = require("../controllers/blog");
const uploader = require("../config/cloundinary.config");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", ctrl.getBlogs);
router.get("/one/:bid", ctrl.getBlog);
router.get("/:bid", [verifyAccessToken, isAdmin], ctrl.getBlogDetail);
router.post("/", [verifyAccessToken, isAdmin], ctrl.createNewBlog);

router.put("/like/:bid", [verifyAccessToken], ctrl.likeBlog);
router.put("/dislike/:bid", [verifyAccessToken], ctrl.dislikeBlog);

router.delete("/:bid", [verifyAccessToken, isAdmin], ctrl.deleteBlog);

router.put(
  "/image/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  ctrl.uploadImagesBlog
);

module.exports = router;
