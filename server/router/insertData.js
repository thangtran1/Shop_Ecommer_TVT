const router = require("express").Router();
const ctrl = require("../controllers/insertData");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", ctrl.insertProduct);
router.post("/cate", ctrl.insertCategory);

module.exports = router;
