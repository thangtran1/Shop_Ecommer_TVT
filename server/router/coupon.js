const router = require("express").Router();
const ctrl = require("../controllers/coupon");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrl.createNewCoupon);
router.get("/", ctrl.getCoupons);
router.put("/:cid", [verifyAccessToken, isAdmin], ctrl.updateCoupon);
router.delete("/:cid", [verifyAccessToken, isAdmin], ctrl.deleteCoupon);

module.exports = router;
