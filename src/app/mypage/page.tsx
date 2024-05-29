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
      My Page<p>Welcome, {user?.email}</p>
      <p>Bookmarks</p>
      {bookmarkedExpressions.length > 0 ? (
        <ul>
          {bookmarkedExpressions.map((expression) => (
            <li key={expression.id}>
              <p>{expression.en}</p>
              <p>{expression.ko}</p>
              {expression.ex && <p>Ex: {expression.ex}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookmarks</p>
      )}
    </div>
  );
}

export default withAuth(MyPage);
