"use client";

import { getCurrentUser } from "@/actions/user/get-current-user";
import { useRouter } from "next/navigation";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

export type AuthContextType = {
  user: any;
  isLoadingAuth: boolean;
  role?: string;
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken") || "";
    }
    return "";
  });

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        if (accessToken) {
          const response = await getCurrentUser(accessToken);
          console.log("🚀 ~ fetchCurrentUser ~ response:", response);
          if (response) {
            setCurrentUser(response);
            setIsLoadingAuth(false);
          }
        } else {
          router.push("/signin");
        }
      } catch (error: any) {
        toast.error(error.message);
        router.push("/signin");
      }
    }
    fetchCurrentUser();
  }, [accessToken]);

  console.log({ currentUser });

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        isLoadingAuth,
        role: currentUser?.role,
        accessToken,
        setAccessToken,
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
