import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  if (currentUser) {
    return <div>You are already logged in.</div>;
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input ref={emailRef} type="email" placeholder="Email" required />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
