const {createUser}= require("./userController");
const router = require("express").Router();

router.post("/",createUser);

module.exports = router;