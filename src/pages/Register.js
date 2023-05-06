import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { handleGoogleSignIn } from "../utils/firebase_functions";
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-top: 5rem;
`;

const StyledForm = styled.form`
  margin-top: 1rem;
`;

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
      setPasswordConfirmError("A jelszavak nem egyeznek.");
      return;
    }

    if (!termsAccepted) {
      setError("El kell fogadnia a szolgáltatási feltételeket és az adattárolást.");
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
    return <div>Már be vagy jelentkezve.</div>;
  }

  return (
    <StyledContainer className="container">
      <h2>Regisztráció</h2>
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

      <StyledForm onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail cím
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
            Jelszó
          </label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="password"
            placeholder="Jelszó"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordConfirm" className="form-label">
            Jelszó megerősítése
          </label>
          <input
            ref={passwordConfirmRef}
            type="password"
            className="form-control"
            id="passwordConfirm"
            placeholder="Jelszó megerősítése"
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
            Elfogadom a szolgáltatási feltételeket és az adattárolást.
          </label>
        </div>
    
        <button type="submit" className="btn btn-primary">
          Regisztráció
        </button>
      </StyledForm>
            <button
        type="button"
        className="btn btn-secondary mt-3"
        onClick={() => handleGoogleSignIn({ setError, navigate })}
      >
        Regisztráció Google fiókkal
      </button>
    
    </StyledContainer>
);
};

export default Register;    