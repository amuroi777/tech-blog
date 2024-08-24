import { useState, useEffect } from "react";
import { collection, getDocs, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from "@/firebase";

interface Post {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  content: string;
  image_path: string; // 画像パスを保持
  created_at: Date;
  updated_at: Date;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postData = collection(db, "posts");
        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(postData);

        // Firestore から取得したデータをそのまま posts に設定
        const postsArray: Post[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Post, "id">; // 必要なデータを取得
          return {
            id: doc.id,
            ...data,
          };
        });

        console.log("Number of documents fetched:", querySnapshot.docs.length);

        setPosts(postsArray);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
