"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();
  
  const handleFormSumbit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const { accessToken } = await res.json();

    if(accessToken){
      router.push("/")
    }else{
      alert("login failed")
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold py-5">Login Form</h1>
      <form onSubmit={handleFormSumbit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          className="border border-gray-600 m-2 p-1"
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border border-gray-600 m-2 p-1"
        />
        <input
          type="submit"
          className="border border-gray-800 rounded-md cursor-pointer mx-2 py-1 px-4"
        />
      </form>
    </div>
  );
};

export default page;
