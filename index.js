require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const routesOrder = require("./src/routes/order");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
require("./src/socket")(io);
const port = process.env.Port;
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/", routesOrder);
server.listen(port, () => console.log(`Listening on port ${port}`));
