import express from "express";
import stripe from "stripe";

const payment = express.Router();

const stripeInstance = new stripe(
  "sk_test_51O6yhlSJBU0eXMnJgvhSM3g3TVqUZWub5go5t4nBkgIdXJOtGIom57iYoIvbbYsQTlUCRGP0gG78pAfASXACRPG900xKI8QxlZ"
);

payment.post("/payment", async (req, res) => {
  const payAmount = req.body.amount;

  const payData = await stripeInstance.paymentIntents.create({
    amount: payAmount,
    currency: "inr",
  });

  res.send({
    clientSecret: payData.client_secret,
  });
});

export default payment;
