const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    console.log("data",data);
    pool.query(
      `insert into registration(firstname,lastname,gender,email,password,number)
    values(?,?,?,?,?,?)`,
      [
        data.firstname,
        data.lastname,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
