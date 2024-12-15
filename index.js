const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const authRoute = require("./router/authRoute");
const userRoute = require("./router/userRoute");

dbConnect();
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/auth", userRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App is listen on port:${port}`);
});
