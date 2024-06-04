"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import supabase from "./supabaseClient";
import insertNewUser from "./insertNewUser"; // Adjust the import based on your project structure

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const session = await supabase.auth.getSession();
      if (session.data.session?.user) {
        const loggedInUser = session.data.session.user;
        setUser(loggedInUser);
        await insertNewUser(loggedInUser); // Insert user if they don't exist
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkUser();

    // const { data: authListener } = supabase.auth.onAuthStateChange(
    //   async (event, session) => {
    //     const loggedInUser = session?.user || null;

    //     if (loggedInUser && loggedInUser.id !== user?.id) {
    //       setUser(loggedInUser);
    //       await insertNewUser(loggedInUser); // Insert user if they don't exist
    //     } else if (!loggedInUser && user) {
    //       setUser(null);
    //     }

    //     if (event === "SIGNED_OUT") {
    //       router.push("/login");
    //     }
    //   }
    // );

    // return () => {
    //   authListener.subscription.unsubscribe();
    // };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      router.push("/login", { scroll: false });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => useContext(AuthContext);
