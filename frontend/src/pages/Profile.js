import React from "react";
import { Link } from "react-router-dom";

function Profile() {
  if (localStorage.getItem("token") === null) {
    return (
        <Link to="/login" />
    ) 
  }

  return (
    <div>
      <h1>Your Profile</h1>
    </div>
  );
}

export default Profile;