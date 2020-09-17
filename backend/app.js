const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customer");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order-history");
const fetchRoutes = require("./routes/fetching-details");

const Product = require("./models/Products");
const Order = require("./models/order");
const Customer = require("./models/Customer");

const morgan = require("morgan");
const dotenv = require("dotenv");

const db = require("./db");

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;
// Load ENV variable
dotenv.config({ path: "./config/config.env" });
app.use(express.json());

app.use(morgan("dev"));

// Association Relation
//Customer.hasMany(Product, { foreignKey: { allowNull: false } });

// Product.belongsTo(Customer, {
//   foreignKey: { allowNull: false },
//   constraints: true,
//   onDelete: "CASCADE",
// });

Customer.hasMany(Order, { foreignKey: { allowNull: false } });
Product.hasMany(Order, { foreignKey: { allowNull: false } });

Order.belongsTo(Customer, {
  foreignKey: { allowNull: false },
  constraints: true,
  onDelete: "CASCADE",
});
Order.belongsTo(Product, {
  foreignKey: { allowNull: false },
  constraints: true,
  onDelete: "CASCADE",
});

// Mount Routes
app.use("/api", customerRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api/fetch", fetchRoutes);


db
// .sync({ force: true })
.sync()
  .then(
    app.listen(port, function () {
      console.log("server is running on port " + port);
    })
  )
  .catch((err) => console.log(err));
