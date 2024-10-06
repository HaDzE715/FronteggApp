import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FronteggProvider } from "@frontegg/react";

const contextOptions = {
  baseUrl: `${process.env.REACT_APP_BASE_URL}`,
  clientId: `${process.env.REACT_APP_CLIENT_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
};
// console.log(process.env.REACT_APP_CLIENT_ID);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={false}>
      <App />
    </FronteggProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
