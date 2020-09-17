const express = require('express');
const router = express.Router();
const registerController = require("../controller/user-login-register-controller");


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/customer", registerController.register);
router.post("/login", registerController.login);

 router.get("/customers", registerController.fetchUser);
 router.get("/customer/:id", registerController.fetchSingleUser);
 router.put("/customer/:id",registerController.updatecustomer);
 router.delete("/customer/:id", registerController.deleteSingleUser);
 router.delete("/customers",registerController.DeleteUsers)



module.exports = router;