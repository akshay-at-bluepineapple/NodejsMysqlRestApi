const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
let cors = require("cors");
const userRouter = require("./api/users/userRouter");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json()); //as user is passing the json object hence need to convert it to json explicitly

//user router
app.use("/api/users", userRouter);

app.use("/", (req, res) => {
  res.json({
    message: "welcome to NodeJs-Mysql RestApi",
    routes: "/api/users",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log("[-] server running on 3000");
});
