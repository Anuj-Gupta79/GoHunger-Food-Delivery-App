import express from "express";
import User from "../Models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const jwtSecret = "ahsjucbdhebdusncujsoicnduxhdybncjcksomcid";
const router = express.Router();

router.post('/logIn', [
  body('email', "Enter a Valid Email").isEmail(),
  body('password', "Password cannot be blank").exists(),
], async (req, res) => {
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;
  try {
      let user = await User.findOne({ email });  
      if (!user) {
          return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
      }

      const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
      if (!pwdCompare) {
          return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
      }
      const data = {
          user: {
              id: user.id
          }
      }
      success = true;
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success, authToken })


  } catch (error) {
      console.error(error.message)
      res.send("Server Error")
  }
})


export default router;
