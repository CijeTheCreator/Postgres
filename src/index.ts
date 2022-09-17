import { createConnection } from "typeorm";
import { Client } from "./entities/Client";
import { Banker } from "./entities/Banker";
import { Transaction } from "./entities/Transaction";
import express, { application } from "express";
import { createClientRouter } from "./routes/create_client";
import { createBankerRouter } from "./routes/create_banker";

const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "8563846a",
      database: "typeorm-crash-course",
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });
    console.log("Connected to Postgres");

    app.listen(8080, () => {
      console.log("Now running on port 8080");
    });

    app.use(express.json());
    app.use(createClientRouter);
    app.use(createBankerRouter);
  } catch (error) {
    console.error(error);
    throw new Error("Unable to Connect to db");
  }
};

main();
