const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();

require("./db/connection.js");
//import User from "./models/userSchema.js";

app.use(express.json());
app.use(require("./routes/auth.js"));

const port = process.env.PORT || 8000;

//Middleware
const middleware = (req, res, next) => {
  console.log("Middleware");
  next();
};

// app.get('/', (req, res) => {
//     res.send(`Hello world from the server app.js`);
// });

app.get("/about", middleware, (req, res) => {
  console.log(`Hello my About`);
  res.send(`Hello About world from the server`);
});

app.get("/contact", (req, res) => {
  res.send(`Hello Contact world from the server`);
});

app.get("/signin", (req, res) => {
  res.send(`Hello Login world from the server`);
});

app.get("/signup", (req, res) => {
  res.send(`Hello Registration world from the server`);
});

app.listen(port, () => {
  console.log(`server is runnig at port no ${port}`);
});
