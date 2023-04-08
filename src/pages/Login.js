import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  if (currentUser) {
    return <div>You are already logged in.</div>;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input ref={emailRef} type="email" placeholder="Email" required />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
