const router = require("express").Router();
const ctrl = require("../controllers/product");
const uploader = require("../config/cloundinary.config");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrl.createProduct);
router.get("/", ctrl.getProducts);
router.put("/ratings", verifyAccessToken, ctrl.ratings);

router.delete("/:pid", [verifyAccessToken, isAdmin], ctrl.deleteProduct);
router.get("/:pid", ctrl.getProduct);
router.put("/:pid", [verifyAccessToken, isAdmin], ctrl.updateProduct);

router.put(
  "/uploadimage/:pid",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 10), // Cho phép upload tối đa 10 ảnh
  ctrl.uploadImagesProduct
);

module.exports = router;
