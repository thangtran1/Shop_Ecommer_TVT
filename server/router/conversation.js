const express = require("express");
const {
  sendMessage,
  sendReply,
  getMessages,
  getAllUsers,
} = require("../controllers/conversation");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/user/send", sendMessage);
router.post("/admin/send", [verifyAccessToken, isAdmin], sendReply);
router.get("/:userId", getMessages);
router.get("/", getAllUsers);

module.exports = router;
