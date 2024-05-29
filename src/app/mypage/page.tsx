"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "../auth/supabaseProvider";
import withAuth from "../auth/withAuth";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { fetchUserData } from "@/lib/fetchUserData";
import { Expression, User } from "@/lib/interface";
import Loading from "../_components/Loading";
import supabase from "../auth/supabaseClient";

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

        if (userData?.bookmarks && userData?.bookmarks.length > 0) {
          const { data, error } = await supabase
            .from("expressions")
            .select("*")
            .in("id", userData.bookmarks);

          if (error) {
            console.error(
              "Error fetching bookmarked expressions:",
              error.message
            );
          } else {
            setBookmarkedExpressions(data);
          }
        }

        setIsLoading(false);
      }
    };

    fetchUserAndBookmarks();
  }, [user, userData]);

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
