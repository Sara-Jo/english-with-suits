"use client";

import { useAuthContext } from "../auth/supabaseProvider";
import withAuth from "../auth/withAuth";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/fetchUserData";
import { Expression } from "@/lib/interface";
import Loading from "../_components/Loading";
import supabase from "../auth/supabaseClient";

function MyPage() {
  const { user } = useAuthContext();
  const [bookmarkedExpressions, setBookmarkedExpressions] = useState<
    Expression[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserAndBookmarks = async () => {
      if (user?.id) {
        const data = await fetchUserData(user.id);

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
            <div className={styles.expression}>
              {bookmarkedExpressions.map((expression) => (
                <div key={expression.id}>
                  <p>{expression.season}</p>
                  <p>{expression.episode}</p>
                  <p>{expression.en}</p>
                  <p>{expression.ko}</p>
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
