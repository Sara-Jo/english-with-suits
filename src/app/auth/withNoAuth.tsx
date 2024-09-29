import { useEffect } from "react";
import { useAuthContext } from "./supabaseProvider";
import Loading from "../_components/Loading/Loading";

console.log("withNoAuth module loaded");

const withNoAuth = (WrappedComponent: React.ComponentType) => {
  console.log("withNoAuth HOC called");

  const ComponentWithNoAuth = (props: any) => {
    const { user, loading } = useAuthContext();

    useEffect(() => {
      console.log("useEffect in ComponentWithNoAuth", { loading, user });
      if (!loading && user) {
        window.location.href = "/";
      }
    }, [loading, user]);

    if (loading) {
      return <Loading />;
    }

    if (user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithNoAuth.displayName = `WithNoAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithNoAuth;
};

export default withNoAuth;
