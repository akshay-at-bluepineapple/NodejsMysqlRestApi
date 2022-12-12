const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    console.log("data", data);
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
  getUsers: (callBack) => {
    pool.query(`select * from registration`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  getUserById: (id, callBack) => {
    pool.query(
      `select * from registration where id =?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    console.log("data", data);
    pool.query(
      `update registration set firstname=?,lastname=?,gender=?,email=?,password=?,number=? where id =?`,
      [
        data.firstname,
        data.lastname,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteUser: (data, callBack) => {
    console.log("data", data);
    pool.query(
      `delete from registration where id=?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email=?`,
      [email],
      (error, result, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, result[0]);
      }
    );
  },
};
