import React, { Suspense } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import { ProtectedRoutes, LoggedInUser } from "./components/ProtectedRoutes";
import AppLayout from "./layout/AppLayout";
import { useAuth } from "./hooks/useAuth";
import AppBootLoader from "./components/Ui/AppBootLoader";
import WorkSpaceLoader from "./components/Ui/WorkSpaceLoader";
import ProfileSkeleton from "./components/Skeleton/ProfileSkeleton";
import EditProfileSkeleton from "./components/Skeleton/EditProfileSkeleton";

const CodeEditorLayout = React.lazy(() => import("./pages/CodeEditorLayout"));
const Profile = React.lazy(() => import("./pages/Profile"));
const EditProfile = React.lazy(() => import("./pages/EditProfile"));

function App() {
  const { isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <AppBootLoader />;
  }

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    {
      element: <AppLayout />,
      children: [
        {
          path: "/profile",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<ProfileSkeleton />}>
                <Profile />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/profile/edit",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<EditProfileSkeleton />}>
                <EditProfile />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
      ],
    },
    {
      path: "/editor/:roomId",
      element: (
        <ProtectedRoutes>
          <Suspense fallback={<WorkSpaceLoader />}>
            <CodeEditorLayout />
          </Suspense>
        </ProtectedRoutes>
      ),
      children: [{ path: ":fileId", element: <div /> }],
    },
    {
      path: "/register",
      element: (
        <LoggedInUser>
          <AuthLayout>
            <Signup />
          </AuthLayout>
        </LoggedInUser>
      ),
    },
    {
      path: "/login",
      element: (
        <LoggedInUser>
          <AuthLayout>
            <Login />
          </AuthLayout>
        </LoggedInUser>
      ),
    },
    {
      path: "/verify-email",
      element: (
        <AuthLayout>
          <EmailVerify />
        </AuthLayout>
      ),
    },
    {
      path: "/reset-password",
      element: (
        <AuthLayout>
          <ResetPassword />
        </AuthLayout>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
