import express from "express";
import { Client } from "./../entities/Client";
import { Banker } from "./../entities/Banker";

const route = express.Router();

route.put("/api/banker/:bankerId/client/:clientId", async (req, res) => {
  const { bankerId, clientId } = req.params;
  const client = await Client.findOne({ where: { id: parseInt(clientId) } });
  const banker = await Banker.findOne({ where: { id: parseInt(bankerId) } });

  if (!banker || !client) {
    return res.json({
      msg: "Banker or Client not found",
    });
  }

  banker.clients = [client];
  //Only works with the Entity that has the join table

  await banker.save();

  return res.json({
    msg: "Banker connected to Client",
  });
});

export { route as connectBankerToClientRouter };
