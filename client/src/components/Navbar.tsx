import axios from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../pages/Context";

const Navbar = () => {
  const user = useContext(myContext)

  const logout = () => {
    axios.get("http://localhost:4000/logout", {withCredentials:true}).then((res)=> {
      window.location.href = "/"
      
    })
  }
  return (
    <div className="NavContainer">
        <Link to="/">Home</Link>
      {user ? (<>
        <Link to="/profile">Profile</Link>
        {user.isAdmin ? ( <Link to="/admin">Admin</Link>) : null}
       
        <Link onClick={logout} to="/logout">Logout</Link>
      </>
      ) : (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}

    </div>
  );
};

export default Navbar;
