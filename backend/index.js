import express from "express";
import cors from "cors";
import { register, login, authenticate } from "./auth_queries.js";

const app = express();
app.use(cors());
app.use(express.json());


app.get("/api", (req, res) => {
  res.send({ numbers: [1, 2, 3] });
});

app.use(express.static("public"));

app.listen(5000, () => console.log("Server running on port 5000"));

app.post("/register", async (req, res) => {
  await register(req, res);
});

app.post("/login", async (req, res) => {
  await login(req, res);
});

app.get("/profile", authenticate, (req, res) => {
  // This route can only be accessed by authenticated users
  const username = req.user.username;
  res.json({ message: `Welcome, ${username}!` });
});