// log in page
import React, { useState } from "react";
import { twJoin } from "tailwind-merge";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);

  return (
    <div className="w-screen h-screen bg-black/20 flex justify-center items-center">
      <div
        className={twJoin(
          "flex flex-col justify-center items-center gap-8 font-mono",
          clicked && "animate-shrink fill-mode-forwards"
        )}
      >
        <h1 className="font-bold text-4xl">
          Join the <span className="text-red-500 italic">mission</span>
        </h1>
        <h2>for hamas terrorists, please enter 1 :)</h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Username"
            className="p-1 rounded-xl bg-slate-600 placeholder:text-white text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-1 rounded-xl bg-slate-600 placeholder:text-white text-white"
          />
          <div className="flex flex-wrap gap-12 items-end">
            <button
              type="submit"
              className="bg-red-400 hover:bg-red-500 px-2 rounded-lg drop-shadow"
              onClick={() => setClicked(true)}
            >
              Login
            </button>
            <div className="flex items-end gap-2">
              <p className="text-xs">don't have an account?</p>
              <button
                type="submit"
                className="bg-red-400 hover:bg-red-500 px-2 rounded-lg drop-shadow"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
