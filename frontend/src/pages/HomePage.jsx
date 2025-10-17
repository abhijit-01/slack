import React from 'react'
import { SignOutButton } from "@clerk/clerk-react";

const HomePage = () => {
  return (
    <SignOutButton mode="modal">
      <button className="cta-button">
        Get Started with Slap
        <span className="button-arrow">→</span>
      </button>
    </SignOutButton>
  );
}

export default HomePage
