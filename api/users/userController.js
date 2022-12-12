const { create } = require("./userService");
const {genSaltSync,hashSync} = require("bcrypt");

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
        sucess:1,
        data:results
      })
    });
  },
};
