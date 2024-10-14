import { useAuthContext } from "./supabaseProvider";
import { useEffect } from "react";

const useAuth = () => {
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login";
    }
  }, [loading, user]);

  return { user, loading };
};

export default useAuth;
