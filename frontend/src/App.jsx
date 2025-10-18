import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import React from 'react'
import { Routes,Route, Navigate } from 'react-router';
import AuthPage from "./pages/AuthPage";
import CallPage from "./pages/CallPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "@clerk/clerk-react";

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return null;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />
          }
        />
        <Route
          path="/auth"
          element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />}
        />

        <Route
          path="/call/:id"
          element={
            isSignedIn ? <CallPage /> : <Navigate to={"/auth"} replace />
          }
        />

        <Route
          path="*"
          element={
            isSignedIn ? (
              <Navigate to={"/"} replace />
            ) : (
              <Navigate to={"/auth"} replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App