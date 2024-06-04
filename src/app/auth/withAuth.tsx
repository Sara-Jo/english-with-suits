import { useEffect } from "react";
import { useAuthContext } from "./supabaseProvider";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { user, loading } = useAuthContext();

    useEffect(() => {
      if (!loading && !user) {
        window.location.href = "/login";
      }
    }, [loading, user]);

    if (loading || !user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
