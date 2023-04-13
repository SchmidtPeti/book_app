import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  

  if (currentUser) {
    return <div>You are already logged in.</div>;
  }

  return (
<div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <h2 className="text-center mb-4">Login</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            ref={emailRef}
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  </div>
</div>

  );
};

export default Login;
