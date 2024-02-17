import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const { currentUser } = getAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
