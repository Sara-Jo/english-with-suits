"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../auth/supabaseClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const setupAuthListener = async () => {
      try {
        const { data: authListener } = await supabase.auth.onAuthStateChange(
          async (event, session) => {
            console.log("Auth event:", event);
            if (event === "SIGNED_IN" || event === "USER_UPDATED") {
              const user = session?.user;
              if (user) {
                window.location.href = "/";
              }
            }
          }
        );

        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (err) {
        console.error("Error in setupAuthListener:", err);
      }
    };

    setupAuthListener();
  }, [router]);

  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: { container: { width: "300px" }, input: { color: "white" } },
        }}
        theme="dark"
        providers={["google", "kakao", "github"]}
        redirectTo="http://localhost:3000/login/reset-password"
      />
    </div>
  );
}
