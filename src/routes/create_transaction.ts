import express from "express";
import { Transaction, TransactionTypes } from "./../entities/Transaction";
import { Client } from "./../entities/Client";

const route = express.Router();

route.post("/api/client/:clientId/transaction", async (req, res) => {
  const { clientId } = req.params;
  const { type, amount } = req.body;

  const client = await Client.findOne({ where: { id: parseInt(clientId) } });

  if (!client) {
    return res.json({
      msg: "client not found",
    });
  }

  const transaction = await Transaction.create({
    amount,
    type,
    client,
  });

  await transaction.save();

  if (type === TransactionTypes.DEPOSIT) {
    client.balance = client.balance * 1 + parseInt(amount);
  } else if (type === TransactionTypes.WITHDRAW) {
    client.balance = client.balance - parseInt(amount);
  }

  await client.save();

  return res.json({
    msg: "Transaction added",
  });
});

export { route as createTransactionRouter };
