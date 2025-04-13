
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("revisitUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("revisitUser");
      }
    }
  }, []);

  // In a real app, this would call your backend API
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      // In a real app, this would be an actual API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any email/password combination works
      // In a real app, this would validate credentials with your backend
      const mockUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        token: "mock_jwt_token_" + Math.random().toString(36).substr(2, 16)
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("revisitUser", JSON.stringify(mockUser));
      
      toast.success("Login successful!");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  // In a real app, this would call your backend API
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      // In a real app, this would be an actual API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any registration works
      // In a real app, this would create a user in your backend
      const mockUser = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        email,
        name,
        token: "mock_jwt_token_" + Math.random().toString(36).substr(2, 16)
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("revisitUser", JSON.stringify(mockUser));
      
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("revisitUser");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
