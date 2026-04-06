import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import appStore from "./app/store.js";
import ThemeProvider from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@vscode/codicons/dist/codicon.css";
import ErrorBoundary from "./ErrorBoundary";
import Navbar from "./components/Navbar";
import ProfileMenu from "./components/ProfileMenu";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import dotenv from "dotenv";

// dotenv.config();

console.log("Google Client ID from env:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <Provider store={appStore}>
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <App>
            <Navbar>
              <ProfileMenu /> ✅
            </Navbar>
          </App>
        </AuthProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </ThemeProvider>
    </ErrorBoundary>
  </Provider>
  </GoogleOAuthProvider>
  // </StrictMode>,
);
