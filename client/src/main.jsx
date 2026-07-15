import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "@vscode/codicons/dist/codicon.css";

import App from "./App.jsx";
import appStore from "./app/store.js";

import ErrorBoundary from "./ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import EditorThemeProvider from "./context/EditorThemeContext";
import { AppearanceProvider } from "./lib/appearance.jsx";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={appStore}>
      <ErrorBoundary>
        <AppearanceProvider>
          <EditorThemeProvider>
            <AuthProvider>
              <App />
            </AuthProvider>

            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
            />
          </EditorThemeProvider>
        </AppearanceProvider>
      </ErrorBoundary>
    </Provider>
  </GoogleOAuthProvider>
);