const { Order } = require("../../models");

const connectedUser = {};
const socketIo = (io) => {
  io.on("connection", (socket) => {
    console.log("client connect:", socket.id);
    const userId = socket.handshake.query.id;
    connectedUser[userId] = socket.id;

    socket.on("load messages", async (payload) => {
      try {
        const data = await Order.findAll();
        socket.emit("messages", data);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("send messages", async (payload) => {
      try {
        const { firstName, lastName, number, address } = payload;
        await Order.create({ firstName, lastName, number, address });
        console.log("socket id " + socket.id);
        io.to(socket.id).emit("new message");
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("client disconnect");
      delete connectedUser[userId];
    });
  });
};

module.exports = socketIo;
