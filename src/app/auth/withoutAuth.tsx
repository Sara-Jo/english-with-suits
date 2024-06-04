"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "./supabaseProvider";
import { useEffect } from "react";

const withoutAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithoutAuth = (props: any) => {
    const { user, loading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!loading && user) {
        router.replace("/");
      }
    }, [loading, user, router]);

    if (loading || user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithoutAuth.displayName = `WithoutAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithoutAuth;
};

export default withoutAuth;
