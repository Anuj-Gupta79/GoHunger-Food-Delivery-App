import express from "express";
import User from "../Models/User.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/createUser",
  [
    body("email").isEmail(),
    body("email").isLength({ min: 7 }),
    body('password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array() });
    }
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false });
    }
  }
);

export default router;
