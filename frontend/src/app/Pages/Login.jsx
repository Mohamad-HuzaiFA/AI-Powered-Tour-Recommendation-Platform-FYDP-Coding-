import React from "react";
import Link from "next/link"; // ✅ Use Next.js Link
import "../Styles/Login.css";

const Login = () => {
  return (
    <div className="body">
      <div className="container">
        <h1 className="title">Travel</h1>

        <form className="signup-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>

        <p className="switch-page">
          Don't have an account? <Link href="/SignUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
