import { createContext, useState, useEffect } from "react";
import { getCurrentUser, onAuthStateChange } from "../services/authService";

const AuthContext = createContext({ user: null, loading: true });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching current user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();

    const subscription = onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, loading, error }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
