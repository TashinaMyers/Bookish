import { useState } from "react";
// import { Form, Button, Alert, Navbar } from "react-bootstrap";
import { loginUser } from "../utils/API";
import Auth from "../utils/auth";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <section>
        < Navbar />
        < LoginForm />
        < SignupForm />
    </section>
  )
}

export default Home;
