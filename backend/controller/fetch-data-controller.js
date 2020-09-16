const Order = require("../models/order");
const Product = require("../models/Products");
const Customer = require("../models/Customer");

exports.customerpurchasedparticularitem = async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        productProductId: req.params.id,
      },
    });
    console.log(order)
    customerpurchaseditem = [];
    for (i of order) {
      const customer = await Customer.findByPk(i.customerCustomerId);
      customerpurchaseditem.push(customer);
    }
    res.status(200).json({
      status: 200,
      msg: "customer fetched by particular item",
      customers: customerpurchaseditem,
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};


exports.specificcustomerpurchase = async (req, res, next) => {
    try {
      const order = await Order.findAll({
        where: {
            customerCustomerId: req.params.id,
        },
      });
      console.log(order)
      customerproducts = [];
      for (i of order) {
        const product = await Product.findByPk(i.productProductId);
        customerproducts.push(product);
      }
      res.status(200).json({
        status: 200,
        msg: "Customer products fetched",
        products: customerproducts,
      });
    } catch (error) {
      res.status(404).json({ error });
    }
  };
  


  exports.mostpurchasedproduct = async (req,res,next) => {
    try {
        const product = await Product.findAll();
        product.sort((a,b) => b.Productcount - a.Productcount);
        //  console.log(product);
        mostpurchasedproduct = [];
        for (i of product) {
            const mostpurchase = {
                product_name : i.product_name,
                Productcount : i.Productcount,
                price : i.price,
                product_description : i.product_description
            }
            mostpurchasedproduct.push(mostpurchase);

        }
        res.status(200).json({
            status: 200,
            msg: "most purchased product fetched",
            products: mostpurchasedproduct,
          });
    }catch (error) {
      res.status(404).json({ error });
    }
  }