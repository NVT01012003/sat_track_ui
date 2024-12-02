import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobeSizeContextProvider } from "./context/globeSizeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GlobeSizeContextProvider>
        <App />
    </GlobeSizeContextProvider>
);
