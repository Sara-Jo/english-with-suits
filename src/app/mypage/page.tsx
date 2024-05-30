"use client";

import { useAuthContext } from "../auth/supabaseProvider";
import withAuth from "../auth/withAuth";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/fetchUserData";
import { Expression, User } from "@/lib/interface";
import Loading from "../_components/Loading";
import supabase from "../auth/supabaseClient";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

function MyPage() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<User | null>(null);
  const [bookmarkedExpressions, setBookmarkedExpressions] = useState<
    Expression[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserAndBookmarks = async () => {
      if (user?.id) {
        const data = await fetchUserData(user.id);
        setUserData(data);
        if (data?.bookmarks && data.bookmarks.length > 0) {
          const { data: expressions, error } = await supabase
            .from("expressions")
            .select("*")
            .in("id", data.bookmarks);

          if (error) {
            console.error(
              "Error fetching bookmarked expressions:",
              error.message
            );
          } else {
            setBookmarkedExpressions(expressions);
          }
        }

        setIsLoading(false);
      }
    };

    fetchUserAndBookmarks();
  }, [user]);

  const removeBookmark = async (id: number) => {
    if (userData) {
      const updatedBookmarks = userData.bookmarks.filter(
        (bookmarkId: number) => bookmarkId !== id
      );

      const { error: updateError } = await supabase
        .from("users")
        .update({ bookmarks: updatedBookmarks })
        .eq("id", userData.id);

      if (updateError) {
        console.error("Error updating bookmarks:", updateError.message);
        return;
      }

      setBookmarkedExpressions((prev) =>
        prev.filter((expression) => expression.id !== id)
      );
    }
  };

  if (isLoading) {
    return (
      <div className="loadingMain">
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>🧑‍🎓 Profile</p>
        <p>{user?.email}</p>
      </div>

      <div className={styles.bookmarksWrapper}>
        <p className={styles.title}>🔖 Bookmarks</p>
        <div className={styles.bookmarksList}>
          {bookmarkedExpressions.length > 0 ? (
            <div>
              {bookmarkedExpressions.map((expression) => (
                <div key={expression.id} className={styles.expressionWrapper}>
                  <div className={styles.episodeExpression}>
                    <p className={styles.episode}>
                      S{expression.season} EP{expression.episode}
                    </p>
                    <div className={styles.expression}>
                      <p className={styles.en}>{expression.en}</p>
                      <p className={styles.ko}>{expression.ko}</p>
                    </div>
                  </div>
                  <div className={styles.removeButtonWrapper}>
                    <div
                      onClick={() => removeBookmark(expression.id)}
                      className={styles.removeButton}
                    >
                      <HighlightOffRoundedIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No bookmarks</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(MyPage);
