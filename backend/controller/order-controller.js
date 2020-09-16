const bcrypt = require("bcryptjs");
const Order = require("../models/order");
const Product = require("../models/Products");

const jwt = require("jsonwebtoken");

exports.createOrder = async (req, res) => {
  try {
    const orderData = {
      customerCustomerId: req.body.customerCustomerId,
      productProductId: req.body.productProductId,
    };

    // find product by productProductId
    //  product.productQuantity-- ??
    //  update product where id is productProductId
    const product = await Product.findOne({
      where: {
        ProductId: req.body.productProductId,
      },
    });
    Productcount =product.Productcount +1 ;
    Productquantity = product.Productquantity - 1;

    await Product.update({Productquantity,Productcount}, {
      where: {
        ProductId: req.body.productProductId,
      },
    });

    const orderCreated = await Order.create(orderData);
    res.status(201).json({
      status: 201,
      msg: "order created",
      result: orderCreated,
    });
  } catch (error) {
    res.send("error" + error);
  }
};

exports.updateorder = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["customerCustomerId", "productProductId"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation)
      return res.status(400).send({ error: "Invalid Update" });

    const data = {};
    OrderId = req.params.id;

    updates.forEach((update) => {
      data[update] = req.body[update];
    });

    const order = await Order.findByPk(OrderId);
    if (!order) {
      return res.status(400).json({ status: 400, msg: "No Order available" });
    }

    await Order.update(data, {
      where: {
        OrderId,
      },
    });

    res.status(200).json({
      status: 200,
      msg: "order updated",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.fetchOrder = (req, res, next) => {
  Order.findOne({
    where: {
      OrderId: req.params.id,
    },
  })
    .then((order) => {
      if (!order) {
        res.json({ msg: "No order available" });
      } else {
        res.json({
          status: true,
          msg: "order fetched",
          order,
        });
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        orderId: req.params.id,
      },
    });

    res.status(200).json({
      status: 200,
      msg: "order deleted",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};
