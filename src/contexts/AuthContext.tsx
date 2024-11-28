import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user: { email: string; role: string } | null;
  login: (email: string) => void;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    null
  );
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("pendingLoginEmail");
    if (email) {
      login(email);
    }
  }, []);

  const login = (email: string) => {
    const isAdminUser = email.includes("admin");

    setIsAdmin(isAdminUser);

    setUser({
      email,
      role: isAdminUser ? "SELLER_ADMIN" : "SELLER",
    });

    localStorage.setItem("pendingLoginEmail", email);
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("pendingLoginEmail");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
