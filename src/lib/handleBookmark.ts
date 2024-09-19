import supabase from "@/app/auth/supabaseClient";
import { IUser } from "./interface";

export const addBookmark = async (
  userData: IUser | null,
  expressionId: number
): Promise<IUser | null> => {
  if (!userData) return null;

  const updatedBookmarks = userData.bookmarks
    ? [...userData.bookmarks, expressionId]
    : [expressionId];

  const { error } = await supabase
    .from("users")
    .update({ bookmarks: updatedBookmarks })
    .eq("id", userData.id);

  if (error) {
    console.error("Error updating bookmark:", error);
    return null;
  }

  return { ...userData, bookmarks: updatedBookmarks };
};

export const removeBookmark = async (
  userData: IUser | null,
  expressionId: number
): Promise<IUser | null> => {
  if (!userData) return null;

  const updatedBookmarks = userData.bookmarks.filter(
    (bookmarkId: number) => bookmarkId !== expressionId
  );

  const { error } = await supabase
    .from("users")
    .update({ bookmarks: updatedBookmarks })
    .eq("id", userData.id);

  if (error) {
    console.error("Error updating bookmark:", error);
    return null;
  }

  return { ...userData, bookmarks: updatedBookmarks };
};
