import express from "express";
import cors from "cors";
import { register, login, authenticate } from "./auth_queries.js";
import {
  add_objective,
  get_random_objective,
  get_objective_by_id,
  remove_objective,
} from "./objective_queries.js";
import { objective_validator } from "./validators.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.send({ numbers: [1, 2, 3] });
});

app.use(express.static("public"));

app.listen(5000, () => console.log("Server running on port 5000"));

app.post("/api/register", async (req, res) => {
  await register(req, res);
});

app.post("/api/login", async (req, res) => {
  await login(req, res);
});

app.get("/api/profile", authenticate, async (req, res) => {
  // This route can only be accessed by authenticated users
  const username = req.user.username;
  res.json({ message: `Welcome, ${username}!` });
});

app.post("/api/objective", async (req, res) => {
  const { body } = req;
  if (!objective_validator(body)) {
    res.status(400).json({ error: objective_validator.errors });
    return;
  }
  await add_objective(req, res);
});

app.get("/api/objective/random", async (req, res) => {
  await get_random_objective(req, res);
});

app.get("/api/objective/:id", async (req, res) => {
  await get_objective_by_id(req, res);
});

app.delete("/api/objective/:id", async (req, res) => {
  await remove_objective(req, res);
});
