const Conversation = require("../models/conversation");
const User = require("../models/user");
const { getSocket } = require("../socket");

const sendMessage = async (req, res) => {
  try {
    const { senderId, content } = req.body;
    const sender = await User.findById(senderId);

    if (!sender || sender.role !== "member") {
      return res
        .status(403)
        .json({ message: "Chỉ người dùng mới có thể gửi tin nhắn." });
    }

    const receiverId = "6764e2ef09079dbc00c5f37a";

    // Kiểm tra xem cuộc trò chuyện giữa senderId và receiverId đã tồn tại chưa
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Nếu chưa tồn tại cuộc trò chuyện, tạo mới
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId], // Đảm bảo có ít nhất 2 thành viên
        messages: [],
      });
    }

    // Thêm tin nhắn vào cuộc trò chuyện
    conversation.messages.push({
      senderId,
      content,
      role: "member",
      createdAt: new Date(),
    });

    await conversation.save();

    // Gửi tin nhắn qua WebSocket (nếu có)
    const io = getSocket();
    io.emit("receiveMessage", {
      senderId,
      content,
      role: "member",
      createdAt: new Date(),
    });

    res
      .status(201)
      .json({ message: "Tin nhắn đã được gửi", data: conversation });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};

const sendReply = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    if (!senderId || !receiverId || !content) {
      return res.status(400).json({
        message: "Các trường senderId, receiverId và content là bắt buộc.",
      });
    }

    const admin = await User.findById(senderId);
    if (!admin || admin.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Chỉ admin mới có thể gửi phản hồi." });
    }

    // Tìm hoặc tạo mới cuộc trò chuyện
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    // Thêm tin nhắn mới vào mảng messages
    conversation.messages.push({
      senderId,
      content,
      role: "admin",
      createdAt: new Date(),
    });
    await conversation.save();

    // Emit tin nhắn mới qua socket
    const io = getSocket();
    io.to(receiverId).emit("receiveMessage", {
      senderId,
      content,
      role: "admin",
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Phản hồi đã được gửi",
      data: conversation,
    });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const adminId = "6764e2ef09079dbc00c5f37a";

    // Tìm cuộc trò chuyện giữa người dùng và admin
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, adminId] },
    }).populate("messages.senderId", "name");

    if (!conversation) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy cuộc trò chuyện." });
    }

    res.status(200).json({
      message: "Lấy tin nhắn thành công.",
      data: conversation.messages,
    });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const adminId = "6764e2ef09079dbc00c5f37a";

    const conversations = await Conversation.find({
      participants: adminId,
    }).populate("participants", "name firstname lastname email avatar");

    if (!conversations || conversations.length === 0) {
      return res
        .status(404)
        .json({ message: "Không có cuộc trò chuyện nào với admin." });
    }

    const users = conversations.map((conversation) => {
      const user = conversation.participants.find(
        (participant) => participant._id.toString() !== adminId
      );
      return user;
    });

    res.status(200).json({
      message: "Lấy danh sách người dùng thành công.",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra", error: error.message });
  }
};

module.exports = { sendMessage, sendReply, getMessages, getAllUsers };
