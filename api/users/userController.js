const {
  create,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUserByUserEmail,
} = require("./userService");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    console.log(body);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          sucess: 0,
          message: "database connection error",
        });
      }
      return res.status(200).json({
        sucess: 1,
        data: results,
      });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      if (!result) {
        return res.json({
          sucess: 0,
          message: "record not found",
        });
      }
      return res.json({
        success: 1,
        data: result,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        success: 1,
        data: result,
      });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (error, result) => {
      console.log("result", result.affectedRows);
      if (error) {
        console.log(error);
        return;
      }
      if (!result || result.affectedRows === 0) {
        return res.json({
          sucess: 0,
          message: "failed to update",
        });
      }
      return res.json({
        sucess: 1,
        message: "updated sucessfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (error, result) => {
      console.log("deleted res", result);
      if (error) {
        console.log(error);
        return;
      }
      if (!result) {
        return res.json({
          sucess: 0,
          message: "Record not found",
        });
      }
      return res.json({
        sucess: 1,
        message: "user deleted sucessfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    console.log("body",body);
    getUserByUserEmail(body.email, (error, result) => {
      console.log("result", result);
      if (error) {
        console.log(error);
      }
      if (!result) {
        return res.json({
          sucess: 0,
          message: "Invalid username or password",
        });
      }
      const validate = compareSync(body.password, result.password);
      if (validate) {
        result.password = undefined;
        const jsontoken = sign({ validate: result }, "gdsdjgajh", {
          expiresIn: "1h",
        });
        return res.json({
          sucess: 1,
          message: "login sucessful",
          token: jsontoken,
        });
      } else {
        return res.json({
          sucess: 0,
          message: "Inavalid username or password",
        });
      }
    });
  },
};
