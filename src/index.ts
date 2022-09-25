import express from "express";

const app = express();

app.get("/x", async (req, res) => {
  res.redirect("https://www.xnxx.com");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
