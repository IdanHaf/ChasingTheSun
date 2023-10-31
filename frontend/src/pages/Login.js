// log in page
import React, { useState } from "react";

function Login() {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center gap-8 bg-black/20 font-mono">
      <h1 className="font-bold text-4xl">Join the mission</h1>
      <h2>for hamas terrorists, please enter 1 :)</h2>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="" />
        <input type="password" placeholder="Password" />
        <div className="flex gap-8 items-end">
          <button type="submit" className="bg-red-400 px-2 rounded-lg">
            Login
          </button>
          <p className="text-sm">don't have an account?</p>
          <button type="submit" className="bg-red-400 px-2 rounded-lg">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
