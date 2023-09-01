import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="text-center py-5 space-x-10">
      <a href={"/"}>Home</a>
      <span>|</span>
      <a href={"/login"}>Login</a>
      <span>|</span>
      <a href={"/protected"}>Protected Page</a>
    </div>
  );
};

export default Header;
