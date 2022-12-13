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


router.post("/",createUser);
router.get("/",getUsers); 
router.get("/:id",getUserById);
router.patch("/", updateUser);
router.delete("/",deleteUser);
router.post("/login", login);

module.exports = router;
