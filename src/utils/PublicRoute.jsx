import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children, pathToRedirect }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUser(){
        const unsubscribe = await auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
          });
        return () => unsubscribe();
    }
    getUser();
    
  }, [auth]);

  if (user) {
    return <Navigate to={pathToRedirect || "/"} replace />;
  }

  return !loading && children;
}
