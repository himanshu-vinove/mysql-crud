var bcrypt = require("bcryptjs");
const Customer = require("../models/Customer");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  Customer.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((customer) => {
      if (!customer) {
        var customer = {
          name: req.body.name,
          email: req.body.email,
          phone_num: req.body.phone_num,
          password: hashedPassword,
        };
        Customer.create(customer)
          .then((customer) => {
            res.json({ msg: "customer created" });
          })
          .catch((err) => {
            res.send("error" + err);
          });
      } else {
        res.json({ error: "customer already exists!!" });
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
};

exports.login = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  Customer.findOne({
    where: {
      email,
    },
  })
    .then((customer) => {
      if (!customer) {
        res.json({ msg: "customer not available" });
      } else {
        matchPassword = bcrypt.compare(password, customer.password);

        let token = jwt.sign(
          {
            CustomerId: customer.CustomerId,
            email: customer.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        );

        if (matchPassword) {
          res.json({
            status: true,
            msg: "Login Successfully",
            token,
          });
        }
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
};

exports.fetchUser = async (req, res, next) => {
  Customer.findAll()
    .then((customers) => {
      if (!customers) {
        res.json({ msg: "No User available" });
      } else {
        res.json({
          status: true,
          msg: "Users fetched",
          customers,
        });
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
};

exports.updatecustomer = async (req, res, next) => {
  //  var name = req.body.name,
  //   var email = req.body.email,
  //   var password = req.body.password;
  //   newpassword = await bcrypt.hash(req.body.newpassword,10);
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "phone_num", "password"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation)
      return res.status(400).send({ error: "Invalid Update" });
    const data = {};
    CustomerId = req.params.id;
    
    updates.forEach(async (update) => {
      if (update === 'password') {
        console.log('true')
        data.password = await bcrypt.hash(req.body.password, 10);
      } else {
        data[update] = req.body[update];
      }
    });

    const customer = await Customer.findByPk(CustomerId);
    if (!customer) {
      return res
        .status(400)
        .json({ status: 400, msg: "No Customer available" });
    }

    await Customer.update(data, {
      where: {
        CustomerId,
      },
    });

    res.status(200).json({
      status: 200,
      msg: "Customer updated",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.fetchSingleUser = (req, res, next) => {
  Customer.findOne({
    where: {
      CustomerId: req.params.id,
    },
  })
    .then((customer) => {
      if (!customer) {
        res.json({ msg: "No User available" });
      } else {
        res.json({
          status: true,
          msg: "User fetched",
          customer,
        });
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
};

exports.DeleteUsers = async (req, res, next) => {
  try {
    await Customer.destroy({
      truncate: true,
    });

    res.status(200).json({
      status: 200,
      msg: "All Customers are deleted",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.deleteSingleUser = async (req, res, next) => {
  try {
    await Customer.destroy({
      where: {
        CustomerId,
      },
    });

    res.status(200).json({
      status: 200,
      msg: "Customer deleted",
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};
