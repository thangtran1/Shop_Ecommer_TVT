const router = require("express").Router();
const ctrl = require("../controllers/product");
const uploadCloud = require("../config/cloundinary.config");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

// Routes
router.post(
  "/",
  [verifyAccessToken, isAdmin],
  uploadCloud.fields([
    { name: "thumb", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ctrl.createProduct
);
router.get("/", ctrl.getProducts);
router.get("/hot-sale", ctrl.getHotSaleProducts);

// Route ratings với middleware xử lý upload 3 ảnh
router.put(
  "/ratings",
  verifyAccessToken,
  uploadCloud.array("images", 3),
  ctrl.ratings
);

router.delete("/:pid", [verifyAccessToken, isAdmin], ctrl.deleteProduct);
router.get("/:pid", ctrl.getProduct);
router.put("/:pid", [verifyAccessToken, isAdmin], ctrl.updateProduct);

// Route upload ảnh sản phẩm với middleware xử lý upload 10 ảnh
router.put(
  "/uploadimage/:pid",
  [verifyAccessToken, isAdmin],
  uploadCloud.array("images", 10),
  ctrl.uploadImagesProduct
);

module.exports = router;
