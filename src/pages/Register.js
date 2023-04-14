import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const passwordConfirmRef = useRef();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPasswordConfirmError(null);
  
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setPasswordConfirmError("Passwords do not match.");
      return;
    }
  
    if (!termsAccepted) {
      setError("You must accept the terms of service and data storage.");
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };
  

  if (currentUser) {
    return <div>You are already logged in.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
      {passwordConfirmError && (
  <div className="alert alert-danger mt-3" role="alert">
    {passwordConfirmError}
  </div>
)}

      <form onSubmit={handleSubmit} className="mt-3">
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
        <div className="mb-3">
  <label htmlFor="passwordConfirm" className="form-label">
    Confirm Password
  </label>
  <input
    ref={passwordConfirmRef}
    type="password"
    className="form-control"
    id="passwordConfirm"
    placeholder="Confirm Password"
    required
  />
</div>
<div className="mb-3 form-check">
  <input
    type="checkbox"
    className="form-check-input"
    id="terms"
    checked={termsAccepted}
    onChange={(e) => setTermsAccepted(e.target.checked)}
  />
  <label className="form-check-label" htmlFor="terms">
    I accept the terms of service and data storage.
  </label>
</div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;