const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const userRouter = require("./api/users/userRouter")
app.use(express.json());
//user router
app.use("/api/users",userRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("[-] server running on 3000");
});
