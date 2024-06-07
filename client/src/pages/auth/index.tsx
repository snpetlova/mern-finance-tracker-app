import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import "./auth.css";
import image from "../../assets/finance.jpeg.webp";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src={image} alt="Welcome" />
      </div>
      <div className="auth-content">
        <h1>Welcome to Track My Finance</h1>
        <SignedOut>
          <p>Please sign in or sign up to continue</p>
          <div className="auth-buttons">
            <div>
              <SignUpButton mode="modal">Sign Up</SignUpButton>
            </div>
            <div>
              <SignInButton mode="modal">Sign In</SignInButton>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          <button onClick={navigateToDashboard}>Go to Dashboard</button>
        </SignedIn>
      </div>
    </div>
  );
};
