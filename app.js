const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const userRouter = require("./api/users/userRouter");


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});


app.use(express.json()); //as user is passing the json object hence need to convert it to json explicitly
//user router
// app.use(
//   cors({
//     origin: "*",
//   })
// );



app.use("/api/users", userRouter);

app.use("/", (req, res) => {
  res.json({
    message: "mewelcome to NodeJs-Mysql RestApi",
    routes: "/api/users",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log("[-] server running on 3000");
});
