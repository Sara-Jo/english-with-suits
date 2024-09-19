import supabase from "@/app/auth/supabaseClient";
import { IUser } from "./interface";

export const handleBookmark = async (
  userData: IUser | null,
  expressionId: number,
  isBookmarked: boolean
) => {
  if (!userData) return null;

  const updatedUser = { ...userData };
  if (!updatedUser.bookmarks) {
    updatedUser.bookmarks = [];
  }

  if (isBookmarked) {
    // 북마크 해제
    updatedUser.bookmarks = updatedUser.bookmarks.filter(
      (id) => id !== expressionId
    );
  } else {
    // 북마크 추가
    updatedUser.bookmarks.push(expressionId);
  }

  const { error } = await supabase.from("users").upsert(updatedUser);
  if (error) {
    console.error("Error upserting bookmark:", error);
    return null;
  }

  return updatedUser;
};
