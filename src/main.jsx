import React from "react"; // Importing React library
import ReactDOM from "react-dom/client"; // Importing ReactDOM for rendering
import App from "./App.jsx"; // Importing the main App component
import "./index.css"; // Importing CSS file for styling
import ContextProvider from "./context/Context.jsx"; // Importing the ContextProvider component

// Rendering the root component of the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider> {/* Wrapping the App component with the ContextProvider */}
    <App /> {/* Rendering the main App component */}
  </ContextProvider>
);
