import React, { useEffect, useState } from "react";
import { LoginForm } from "./App/LoginForm";
import { apiFetch } from "./utils/api";
import { Site } from "./App/Site";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    apiFetch("/me")
      .then(setUser)
      .catch(() => setUser(false));
  }, []);

  if (user === null) {
    return null;
  }

  return user ? <Site /> : <LoginForm onConnect={setUser} />;
}
