const router = require("express").Router();
const ctrl = require("../controllers/user");
const upload = require("../config/cloundinary.config");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/register", ctrl.register);
router.post("/fake-create-user", ctrl.fakeCreateUser);
router.put("/finalregister/:token", ctrl.finalRegister);
router.post("/login", ctrl.login);
router.get("/current", verifyAccessToken, ctrl.getCurrent);
router.post("/refreshtoken", ctrl.refreshAccessToken);
router.get("/logout", ctrl.logout);
router.post("/forgot-password", ctrl.forgotpassword);
router.put("/reset-password", ctrl.resetPassword);
router.get("/", [verifyAccessToken, isAdmin], ctrl.getUsers);
router.delete("/:uid", [verifyAccessToken, isAdmin], ctrl.deleteUser);
router.put("/address", [verifyAccessToken], ctrl.updateAddressUser);
router.put("/cart", [verifyAccessToken], ctrl.updateCart);
router.delete("/removecart/:pid/:color", [verifyAccessToken], ctrl.removeCart);

router.put(
  "/current",
  [verifyAccessToken, upload.single("avatar")],
  ctrl.updateUser
);
router.put("/:uid", [verifyAccessToken, isAdmin], ctrl.updateUserByAdmin);
module.exports = router;
