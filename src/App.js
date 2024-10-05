import React, { useEffect } from "react";
import { useAuth } from "@frontegg/react";
import "./App.css";
import Login from "./Components/LoginComponent";

function App() {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated && window.location.pathname === "/") {
      window.location.replace("/account/login");
    }
  }, [isAuthenticated]); // Runs this effect according to user authentication status

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
