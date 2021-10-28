import React, { useState } from "react";
import PropTypes from "prop-types";
import { ApiErrors, apiFetch } from "../utils/api";

export const LoginForm = ({ onConnect }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setError(null);
    setLoading(true);
    e.preventDefault();
    const data = new FormData(e.target); //on accede au form
    try {
      const user = await apiFetch("/login", {
        method: "POST",
        body: data,
      });
      onConnect(user);
    } catch (e) {
      if (e instanceof ApiErrors) {
        setError(e.errors[0].message);
      } else {
        console.error(e);
      }
      setLoading(false);
    }
  };

  return (
    <form className="container mt-4" onSubmit={handleSubmit}>
      <h2>Se Connecter</h2>
      {error && <Alert>{error}</Alert>}
      <div className="form-group">
        <label htmlFor="email">Nom d'utilisateur</label>
        <input
          type="text"
          name="email"
          id="email"
          className="form-control"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          name="password"
          id="password"
          className="form-control"
          required
        />
      </div>
      <button disabled={loading} type="submit" className="btn btn-primary">
        Se connecter
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  onConnect: PropTypes.func.isRequired,
};

const Alert = ({ children }) => {
  return <div className="alert alert-danger">{children}</div>;
};
