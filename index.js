require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
// const { Server } = require("socket.io");
const app = express();
const routesOrder = require("./src/routes/order");
const server = http.createServer(app);
require("./src/socket/index");
const port = process.env.Port;
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/", routesOrder);
server.listen(port, () => console.log(`Listening on port ${port}`));
