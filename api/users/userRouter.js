const {checktoken} = require("../../middleware/token_validation");
const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  login
} = require("./userController");
const router = require("express").Router();


router.post("/", checktoken,createUser);
router.get("/",checktoken,getUsers); 
router.get("/:id", checktoken,getUserById);
router.patch("/",checktoken, updateUser);
router.delete("/", checktoken,deleteUser);
router.post("/login", login);

module.exports = router;
