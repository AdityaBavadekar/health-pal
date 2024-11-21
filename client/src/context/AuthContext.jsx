import { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        type: decoded.type,
        name: decoded.name || "User",
        email: decoded.email || "user@example.com",
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
