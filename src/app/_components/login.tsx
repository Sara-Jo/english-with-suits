"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../auth/supabaseClient";

export default function Login() {
  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: { container: { width: "300px" } },
        }}
        theme="dark"
        providers={["google", "kakao", "github"]}
        redirectTo="http://localhost:3000"
      />
    </div>
  );
}
