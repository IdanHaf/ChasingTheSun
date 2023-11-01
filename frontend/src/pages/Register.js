// lregister page
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { twJoin } from "tailwind-merge";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [score, setScore] = useState("");
  const [error, setError] = useState(false);
  function handleRegister() {
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
          setError(true);
          setTimeout(() => setError(false), 2000);  
        } else {
          console.log(data);
        }
      });
  }

  return (
    <div className="w-screen h-screen bg-black/20 flex justify-center items-center">
      <div
        className={twJoin(
          "flex flex-col justify-center items-center gap-8 font-mono",
        )}
      >
        <h1 className="font-bold text-4xl">
          Join the <span className="text-red-500 italic">mission</span>
        </h1>
        <h2>Enter a username, password and how much did you score!</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-1 rounded-xl bg-slate-600 placeholder:text-white text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-1 rounded-xl bg-slate-600 placeholder:text-white text-white"
          />
            <input
            type="score"
            placeholder="Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
            className="p-1 rounded-xl bg-slate-600 placeholder:text-white text-white"
          />
          <div
            className={twJoin(
              "self-center text-xs text-red-500 bg-red-300/30 p-1 px-2 rounded-md shadow-sm animate-fade-in",
              !error && "hidden"
            )}
          >
            Error logging in
          </div>
          <div className="flex flex-wrap gap-12 sm:items-end sm:flex-row flex-col items-center justify-center h-full">
            <button
              type="submit"
              className="bg-red-400 hover:bg-red-500 px-2 rounded-lg drop-shadow text-lg"
              onClick={() => handleRegister()}
            >
              Register
            </button>
            <div className="flex items-end gap-2">
              <p className="text-xs">aleady have an account?</p>
              <Link to="/login"
                type="submit"
                className="bg-red-400 hover:bg-red-500 px-2 rounded-lg drop-shadow"
              >
                Log In 
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
