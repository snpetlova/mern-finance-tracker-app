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

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/">Dashboard</Link>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isSignedIn } = useAuth();
  
  if (!isSignedIn) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default App;
