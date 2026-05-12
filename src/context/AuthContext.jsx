import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();


  const excludedPath = ["/login", "/register", "/", "/admin/login"];

  // ambil dari localStorage pas pertama load
  useEffect(() => {
    if (!excludedPath.includes(location.pathname)) validateUser();

  }, []);

  async function validateUser() {
    const request = await fetch(`${apiUrl}/api/auth/validate`, {method: "GET", credentials: "include"});
    const response = await request.json();
    if (response.success) {
      setUser(response.data);
    } else {
      window.location.href = "/login";
    }
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};