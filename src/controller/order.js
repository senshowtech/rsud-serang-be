const { Order } = require("../../models");

exports.getOrder = async (req, res) => {
  try {
    let datas = await Order.findAll();
    return res.status(201).json({
      status: "success",
      data: {
        datas,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error: "server error",
    });
  }
};

exports.insertOrder = async (req, res) => {
  try {
    let datas = await Order.create(req.body);
    return res.status(201).json({
      status: "success",
      data: {
        datas,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      error: "server error",
    });
  }
};
