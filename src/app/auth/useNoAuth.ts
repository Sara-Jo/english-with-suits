import { useEffect } from "react";
import { useAuthContext } from "./supabaseProvider";

const useNoAuth = () => {
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && user) {
      window.location.href = "/";
    }
  }, [loading, user]);

  return { user, loading };
};

export default useNoAuth;
