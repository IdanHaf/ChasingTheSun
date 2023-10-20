const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
  res.send({ numbers: [1, 2, 3] });
});

app.use(express.static("public"));

app.listen(5000, () => console.log("Server running on port 5000"));
