const { Order } = require("../../models");

const socketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("client connect:", socket.id);

    socket.on("load order", async () => {
      try {
        let datas = await Order.findAll();
        socket.emit("orders", datas);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on("send order", async () => {
      try {
        console.log("socket id " + socket.id);
        io.to(socket.id).emit("new order");
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnect");
    });
  });
};

module.exports = socketIo;
