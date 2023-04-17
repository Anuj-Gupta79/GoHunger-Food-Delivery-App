import express from "express";
import User from "../Models/User.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/logIn",
  [
    body("email").isEmail(),
    body("email").isLength({ min: 7 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    let email = req.body.email;
    console.log(email);
    try {
      const userData = await User.findOne({email});
      console.log(userData);

      if (!userData)
        return res
          .status(400)
          .json({ errors: "Enter the correct credentials :(" });

      if (userData.password !== req.body.password)
        return res
          .status(400)
          .json({ errors: "Enter the correct credentials :(" });

      res.json({ success: true });
    } catch (error) {
      res.json({ success: false });
    }
  }
);

export default router;
