const express = require("express");
const app = express();

app.get("/", () => {
  console.log("welcome");
});

app.listen(4000, () => {
  console.log(`server is running on http://localhost:4000`);
});
