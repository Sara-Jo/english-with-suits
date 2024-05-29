import supabase from "../auth/supabaseClient";
import { User } from "@supabase/supabase-js";

const insertNewUser = async (user: User) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("id", user.id);

    if (error) {
      console.error("Error fetching user data:", error.message);
      return;
    }

    if (!data || data.length === 0) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: user.id,
          created_at: new Date().toISOString(),
          bookmarks: [],
        },
      ]);

      if (insertError) {
        console.error("Error inserting new user:", insertError.message);
      } else {
        console.log("User inserted successfully:", user.id);
      }
    } else {
      console.log("User already exists:", user.id);
    }
  } catch (err) {
    console.error("Unexpected error inserting new user:", err);
  }
};

export default insertNewUser;
