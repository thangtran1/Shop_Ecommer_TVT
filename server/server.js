const express = require("express");
const dbConnect = require("./config/dbConnect");
const initRouters = require("./router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { initSocket } = require("./socket");

require("dotenv").config();
const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
const port = process.env.PORT || 8888;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

initRouters(app);

server.listen(port, () => {
  console.log("Server running on the port:", port);
});
