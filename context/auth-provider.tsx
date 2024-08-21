"use client";

import { getCurrentUser } from "@/actions/user/user.action";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

export type AuthContextType = {
  //   user: UserWithRole | null;
  user: any;
  isLoadingAuth: boolean;
  role?: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  //   const [currentUser, setCurrentUser] = useState<UserWithRole | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const response = await getCurrentUser();
        console.log("🚀 ~ fetchCurrentUser ~ response:", response);
        if (response) {
          setCurrentUser(response);
          setIsLoadingAuth(false);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    fetchCurrentUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isLoadingAuth,
        // role: currentUser?.role?.roleName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
