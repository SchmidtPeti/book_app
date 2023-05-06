import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { handleGoogleSignIn } from "../utils/firebase_functions";
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledForm = styled.form`
  width: 100%;
  min-width: 300px;
`;

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
    return <div>Már be vagy jelentkezve.</div>;
  }

  return (
    <StyledContainer className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Bejelentkezés</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
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
            <button type="submit" className="btn btn-primary">
              Bejelentkezés
            </button>
          </StyledForm>
          <button
            type="button"
            className="btn btn-secondary mt-3"
            onClick={() => handleGoogleSignIn({ setError, navigate })}
          >
            Bejelentkezés Google fiókkal
          </button>
        </div>
      </div>
    </StyledContainer>
  );
};

export default Login;
