const { Order } = require("../../models");

const connectedUser = {};
const socketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("client connect:", socket.id);
    socket.on("load admin contact", async () => {
      try {
        let datas = await Order.findAll();
        socket.emit("orders", datas);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnect");
      delete connectedUser[userId];
    });
  });
};

module.exports = socketIo;
