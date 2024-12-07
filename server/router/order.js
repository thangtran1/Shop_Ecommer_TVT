const router = require("express").Router();
const ctrl = require("../controllers/order");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.get("/", [verifyAccessToken], ctrl.getUserOrder);
router.get("/admin", [verifyAccessToken, isAdmin], ctrl.getOrders);
router.post("/", [verifyAccessToken], ctrl.createOrder);
router.put("/status/:oid", [verifyAccessToken, isAdmin], ctrl.updateStatus);
module.exports = router;
