const connection = require("../db");
const bcrypt = require("bcryptjs");
const Product = require("../models/Products");
const jwt = require("jsonwebtoken");

exports.createproduct = async (req, res) => {
  var product = {
    product_name: req.body.product_name,
    price: req.body.price,
    Productquantity: req.body.Productquantity,
    product_description: req.body.product_description,
  };
  Product.create(product)
    .then((product) => {
      res.json({ msg: "product created" });
    })
    .catch((err) => {
      res.send("error" + err);
    });
};

exports.fetchProduct = async (req, res, next) => {
  Product.findAll()
    .then((products) => {
      if (!products) {
        res.json({ msg: "No Product available" });
      } else {
        res.json({
          status: true,
          msg: "Product fetched",
          products,
        });
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
};

exports.updateproduct = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "product_name",
      "price",
      "Productquantity",
      "product_description",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation)
      return res.status(400).send({ error: "Invalid Update" });

    const data = {};
    ProductId = req.params.id;

    updates.forEach((update) => {
      data[update] = req.body[update];
    });

    const product = await Product.findByPk(ProductId);
    if (!product) {
      return res.status(400).json({ status: 400, msg: "No Product available" });
    }

    await Product.update(data, {
      where: {
        ProductId,
      },
    });

    res.status(200).json({
      status: 200,
      msg: "product updated",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.fetchSingleProduct = (req, res, next) => {
  Product.findOne({
    where: {
      ProductId: req.params.id,
    },
  })
    .then((product) => {
      if (!product) {
        res.json({ msg: "No product available" });
      } else {
        res.json({
          status: true,
          msg: "product fetched",
          product,
        });
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
};

exports.deleteSingleProduct = async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        ProductId: req.params.id,
      },
    });

    res.status(200).json({
      status: 200,
      msg: "product deleted",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};
