import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=>navigate("/")}>Home</button>
      <button onClick={()=>navigate("/signup")}>Signup</button>
      <p>Home Navbar</p>
    </div>
  );
};

export default Navbar;
