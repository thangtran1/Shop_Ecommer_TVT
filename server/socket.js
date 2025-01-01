const socketIo = require("socket.io");
let io;
const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
      console.log("Rooms joined by socket:", socket.rooms);
    });

    socket.on("sendMessage", (message) => {
      console.log("Received message from user:", message);

      const newMessage = {
        senderId: message.senderId,
        content: message.content,
        receiverId: message.receiverId,
        createdAt: new Date().toISOString(),
      };

      // Gửi tin nhắn tới người nhận
      io.to(message.receiverId).emit("receiveMessage", newMessage);

      console.log("Message sent to receiver:", newMessage);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
const getSocket = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }
  return io;
};

module.exports = { initSocket, getSocket };
