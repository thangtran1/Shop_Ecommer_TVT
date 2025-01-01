import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import {
  sendMessage,
  replyMessage,
  getAllUsers,
  fetchMessages,
} from "../apis/message";
import { formatMessageDate } from "../ultils/helper";
import avatar from "assets/avatar_default.jpg";
import { IoCloseOutline } from "react-icons/io5";
import iconMessage from "../assets/icon-message.png";
import { VscSend } from "react-icons/vsc";
const ChatModal = ({ isOpen, onClose, idCurrent, roleCurrent }) => {
  const { current } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:5000");

      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);
        if (current?._id) {
          socketRef.current.emit("joinRoom", current._id);
        }
      });

      socketRef.current.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });
    }

    return () => {
      socketRef.current?.off("receiveMessage");
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [current?._id, isOpen]);

  useEffect(() => {
    const loadUsersAndMessages = async () => {
      // Tải danh sách người dùng
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }

      // Tải tin nhắn nếu có người dùng được chọn
      if (selectedUser) {
        try {
          const response = await fetchMessages(selectedUser._id);
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      } else {
        // Nếu không có người dùng được chọn, tải tin nhắn cho idCurrent
        try {
          const res = await fetchMessages(idCurrent);
          setMessages(res.data);
        } catch (error) {
          console.error("Error fetching messages for current ID:", error);
        }
      }
    };

    loadUsersAndMessages();
  }, [idCurrent, isOpen, selectedUser]);

  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const handleUserSendMessage = async () => {
    if (newMessage.trim() && socketRef.current) {
      const message = {
        senderId: current?._id,
        content: newMessage,
      };
      try {
        await sendMessage(message);
        socketRef.current.emit("sendMessage", message);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleAdminSendMessage = async () => {
    if (newMessage.trim() && socketRef.current) {
      const message = {
        senderId: current?._id,
        content: newMessage,
        receiverId: selectedUser?._id || "675c10716a9f7e182e3eb0b1",
      };

      try {
        await replyMessage(message);
        socketRef.current.emit("replyMessage", message);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            senderId: current?._id,
            content: newMessage,
            receiverId: selectedUser?._id || "675c10716a9f7e182e3eb0b1",
            createdAt: new Date().toISOString(),
          },
        ]);

        setNewMessage("");
      } catch (error) {
        console.error("Error sending reply:", error);
      }
    }
  };

  const handleKeyDown = (e, isAdmin) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (isAdmin) {
        handleAdminSendMessage();
      } else {
        handleUserSendMessage();
      }
    }
  };
  if (!isOpen) return null;

  return (
    <div>
      {current?.role === "admin" ? (
        <div
          className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50"
          onClick={onClose}
        >
          <div
            className={`bg-white rounded-lg w-[50rem] mr-72 ${
              isOpen ? "animate-slideUpp" : "animate-slideDownn"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#db2f17] rounded-lg p-4">
              <h2 className="text-[16px] flex justify-between items-center   font-emoji whitespace-nowrap text-white font-bold ">
                Admin
                <IoCloseOutline
                  className=" text-white hover:text-gray-300"
                  size={26}
                  color="white"
                  onClick={onClose}
                />
              </h2>
              <div className="px-2 text-[14px] font-mes  text-white  flex items-center gap-2">
                <img
                  src={iconMessage}
                  alt="icon-message"
                  className="w-10 rounded-full h-10"
                />
                Luôn sẵn sàng hỗ trợ bạn
              </div>
            </div>

            <div className="flex">
              <div className="w-1/3 border-r border-gray-300 h-80 overflow-y-auto">
                <h3 className="p-2 font-bold">Danh sách người dùng</h3>
                {users?.map((user) => (
                  <div
                    key={user._id}
                    className={`p-2 cursor-pointer hover:bg-gray-200 ${
                      selectedUser?._id === user._id ? "bg-gray-300" : ""
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <div className="flex items-center gap-2">
                      <span>
                        <img
                          src={avatar}
                          alt="avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      </span>
                      <span>
                        {user.firstname} {user.lastname}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex-grow p-4 h-80 overflow-y-auto">
                {messages &&
                  messages?.map((msg) => (
                    <div
                      key={msg._id}
                      className={`mb-2 ${
                        msg.senderId === current?._id ||
                        msg.role === roleCurrent
                          ? "text-right flex justify-end items-center gap-2 mb-[3px]"
                          : "text-left flex justify-start items-center gap-2 mb-[3px]"
                      }`}
                    >
                      {msg.role === roleCurrent ? (
                        <div className="text-[10px] text-[#808080]">
                          {msg.createdAt
                            ? formatMessageDate(msg.createdAt)
                            : "N/A"}
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className={`inline-block rounded-lg ${
                          msg.senderId === current?._id ||
                          msg.role === roleCurrent
                            ? "bg-[#464bff] text-white"
                            : "bg-[#f0f0f0] text-[#0a0a0a]"
                        }`}
                      >
                        <div className="flex items-center gap-2 p-2">
                          <span className="flex-wrap max-w-[200px] break-words whitespace-normal">
                            {msg.content}
                          </span>
                        </div>
                      </div>
                      {msg.role === roleCurrent ? (
                        ""
                      ) : (
                        <div className="text-[10px] text-[#808080]">
                          {msg.createdAt
                            ? formatMessageDate(msg.createdAt)
                            : "N/A"}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-2 flex p-2 border-t border-gray-300 items-center">
              <input
                type="text"
                value={newMessage}
                onKeyDown={(e) => handleKeyDown(e, true)}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow p-2 border-none outline-none focus:ring-0 font-emoji"
                placeholder="Nhập nội dung..."
              />
              {newMessage && (
                <div
                  className="text-[14px] font-mes text-red-500 px-2 cursor-pointer"
                  onClick={() => {
                    handleAdminSendMessage();
                    setNewMessage("");
                  }}
                >
                  <VscSend size={20} />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="fixed modalMessage  inset-0 flex  items-center justify-end bg-black bg-opacity-50"
          onClick={onClose}
        >
          <div
            className={`bg-white rounded-lg w-96 mr-72 ${
              isOpen ? "animate-slideUpp" : "animate-slideDownn"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#db2f17] rounded-lg p-4">
              <h2 className="text-[16px] flex justify-between items-center   font-emoji whitespace-nowrap text-white font-bold ">
                Chat với nhân viên tư vấn
                <IoCloseOutline
                  className=" text-white hover:text-gray-300"
                  size={26}
                  color="white"
                  onClick={onClose}
                />
              </h2>
              <div className="px-2 text-[14px] font-mes  text-white  flex items-center gap-2">
                <img
                  src={iconMessage}
                  alt="icon-message"
                  className="w-10 rounded-full h-10"
                />
                Em ở đây để hỗ trợ cho mình ạ
              </div>
            </div>

            <div className="mt-2">
              <div className="flex-grow p-4 h-80 overflow-y-auto overflow-x-hidden">
                {messages && messages?.length > 0 ? (
                  messages.map((msg) => (
                    <div
                      className={` ${
                        msg.senderId === current?._id ||
                        msg.role === roleCurrent
                          ? "text-right flex justify-end items-center gap-2 mb-[3px]"
                          : "text-left flex justify-start items-center gap-2 mb-[3px]"
                      }`}
                      key={msg._id}
                    >
                      {msg.role === roleCurrent ? (
                        <div className="text-[10px] text-[#808080]">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        className={` inline-block rounded-lg ${
                          msg.senderId === current._id ||
                          msg.role === roleCurrent
                            ? "bg-[#1372ff] text-white"
                            : "bg-[#f0f0f0] text-[#0a0a0a]"
                        }`}
                      >
                        <div className="flex items-center gap-2 p-2">
                          <span className="flex-wrap max-w-[200px] break-words whitespace-normal">
                            {msg.content}
                          </span>
                        </div>
                      </div>
                      {msg.role === roleCurrent ? (
                        ""
                      ) : (
                        <div className="text-[10px] text-[#808080]">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p>Không có tin nhắn nào.</p>
                )}
              </div>
            </div>
            <div className="mt-2 flex p-2 border-t border-gray-300 items-center">
              <input
                type="text"
                value={newMessage}
                onKeyDown={(e) => handleKeyDown(e, false)}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow p-2 border-none outline-none focus:ring-0  font-emoji"
                placeholder="Nhập nội dung..."
              />
              {newMessage && (
                <div
                  className="text-[14px] font-mes text-red-500 px-2 cursor-pointer"
                  onClick={() => {
                    handleUserSendMessage();
                    setNewMessage("");
                  }}
                >
                  <VscSend size={20} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatModal;
