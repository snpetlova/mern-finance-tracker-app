import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton, useAuth } from "@clerk/clerk-react";
import { Analysis } from "./pages/analysis"; 
import NotFound from "./pages/404/404";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/">Dashboard</Link>
          <Link to="/analysis">Analysis</Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <FinancialRecordsProvider>
                  <Dashboard />
                </FinancialRecordsProvider>
                </RequireAuth>
            }
          />
          <Route
            path="/auth"
            element={
                <Auth />
            }
          />
           <Route
            path="/analysis"
            element={
              <RequireAuth>
                <FinancialRecordsProvider>
                  <Analysis />
                </FinancialRecordsProvider>
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isSignedIn } = useAuth();
  
  // Check if the user is signed in and render the children if true
  if (isSignedIn) {
    
    return children;
  } else {
    // If not signed in, check if the current pathname is the authentication page
    // If not, redirect to the authentication page
    if (window.location.pathname !== "/auth") {
      return <Navigate to="/auth" replace />;
    } else {
      // Otherwise, render the children (authentication page)
      return children;
    }
  }
}

export default App;
