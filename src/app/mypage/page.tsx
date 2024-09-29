"use client";

import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/supabaseProvider";
import withAuth from "../auth/withAuth";
import { fetchUserData } from "@/lib/fetchUserData";
import { IExpression, IUser } from "@/lib/interface";
import supabase from "../auth/supabaseClient";
import Loading from "../_components/Loading/Loading";
import { removeBookmark } from "@/lib/handleBookmark";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import styles from "./page.module.css";

function MyPage() {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [bookmarkedExpressions, setBookmarkedExpressions] = useState<
    IExpression[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

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

  const handleRemoveBookmark = async (id: number) => {
    if (isRemoving) return;

    setIsRemoving(true);

    const updatedUserData = await removeBookmark(userData, id);
    if (updatedUserData) {
      setBookmarkedExpressions((prev) =>
        prev.filter((expression) => expression.id !== id)
      );
      setUserData(updatedUserData);
    }

    setIsRemoving(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <h2 className={styles.title}>🧑‍🎓 Profile</h2>
        <p className={styles.email}>{user?.email}</p>
      </div>
      <div className={styles.bookmarksSection}>
        <h2 className={styles.title}>🔖 Bookmarks</h2>
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
                      onClick={() => handleRemoveBookmark(expression.id)}
                      className={styles.removeButton}
                    >
                      <HighlightOffRoundedIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noBookmarks}>No bookmarks</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(MyPage);
