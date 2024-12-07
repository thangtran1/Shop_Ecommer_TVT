const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const initRouters = require("./router");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
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

app.listen(port, () => {
  console.log("server running on the port:", +port);
});
