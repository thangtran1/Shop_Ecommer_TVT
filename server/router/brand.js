const router = require("express").Router();
const ctrl = require("../controllers/brand");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrl.createNewBranch);
router.get("/", ctrl.getBrands);
router.put("/:bcid", [verifyAccessToken, isAdmin], ctrl.updateBrand);
router.delete("/:bcid", [verifyAccessToken, isAdmin], ctrl.deleteBrand);

module.exports = router;
