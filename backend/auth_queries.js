import db from "./database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(req, res) {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Insert the user into the database
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, hashedPassword], (err, result) => {
    if (err) {
      console.error("Registration failed: " + err.message);
      res.status(500).json({ error: "Registration failed" });
    } else {
      console.log("User registered");
      res.status(200).json({ message: "Registration successful" });
    }
  });
}

async function login(req, res) {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) {
        console.error("Login failed: " + err.message);
        res.status(500).json({ error: "Login failed" });
      } else if (result.length === 0) {
        console.error("User not found");
        res.status(401).json({ error: "Login failed" });
      } else {
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          console.log("User logged in");
          // create a session token for the client
          const token = jwt.sign(
            { username: user.username,
              score: user.score },
            "your-secret-key"
          );
          res.status(200).json({ token });
        } else {
          console.error("Wrong password");
          res.status(401).json({ error: "Login failed" });
        }
      }
    }
  );
}

function authenticate(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export { register, login, authenticate };
