import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use React 18 createRoot
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
