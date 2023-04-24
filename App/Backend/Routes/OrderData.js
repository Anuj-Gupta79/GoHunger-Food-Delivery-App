import express from "express";
import Orders from "../Models/Orders.js";

const router = express.Router();

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.slice(0, 0, { Order_date: req.body.order_data });

  let eId = await Orders.findOne({ email: req.body.email });
  if (eId === null) {
    try {
      console.log(data);
      console.log("1231242343242354", req.body.email);
      await Orders.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Orders.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    console.log("email:::",req.body.email);
    let eId = await Orders.findOne({ email: req.body.email });
    res.json({eId});
  } catch (error) {
    res.send("Error", error.message);
  }
});

export default router;
