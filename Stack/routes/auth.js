const { response } = require("express");
const express = require("express");
const router = express.Router();

require("../db/connection.js");
const User = require("../models/userSchema");

//Home page
router.get("/", (req, res) => {
  res.send(`Hello world from the server rotuer js`);
});

//Register Page
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ errors: "fill the data!" });
  }

  //Using async and await here
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ errors: "User already exists!" });
    } else if (password != cpassword) {
      return res.status(422).json({ errors: "Password is incorrect!" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      const userRegister = await user.save();

      if (userRegister) {
        res.status(201).json({ message: "User registration successful!" });
      } else {
        res.status(500).json({ error: "Failed to register" });
      }
    }
  } catch (err) {
    console.error(err);
  }

  //Using promises here
  /*   User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ errors: "User already exists!" });
      }

      const user = new User({ name, email, phone, work, password, cpassword });

      user
        .save()
        .then(() => {
          res.status(201).json({ message: "User saved successfully!" });
        })
        .catch((error) =>
          res.status(500).json({ message: "failed to save user!" })
        );
    })
    .catch((error) => {
      console.log(error);
    }); */
});

//Login Route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Fill the data!" });
    }

    const userLogin = await User.findOne({ email: email });

    console.log(userLogin);

    if (!userLogin) {
      res.status(400).json({ error: "Login Failed!" });
    } else {
      res.json({ message: "Login Successful!" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
