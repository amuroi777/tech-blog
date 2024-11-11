import { useState, useEffect } from "react";
import { collection, getDocs, QuerySnapshot, DocumentData, DocumentSnapshot } from "firebase/firestore";
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
  userName?: string;
  categoryName?: string;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostsWithDetails = async () => {
      try {
        // postsコレクションのデータを取得
        const postsCollection = collection(db, "posts");
        const postsSnapshot: QuerySnapshot<DocumentData> = await getDocs(postsCollection);
        const postsArray: Post[] = postsSnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Post, "id">;
          return {
            id: doc.id,
            ...data,
          };
        });

        // usersコレクションのデータを取得
        const usersCollection = collection(db, "users");
        const usersSnapshot: QuerySnapshot<DocumentData> = await getDocs(usersCollection);
        const usersMap = new Map<string, string>(
          usersSnapshot.docs.map((doc) => [doc.id, (doc.data() as { name: string }).name])
        );

        // categoriesコレクションのデータを取得
        const categoriesCollection = collection(db, "categories");
        const categoriesSnapshot: QuerySnapshot<DocumentData> = await getDocs(categoriesCollection);
        const categoriesMap = new Map<string, string>(
          categoriesSnapshot.docs.map((doc) => [doc.id, (doc.data() as { name: string }).name])
        );

        // user_idとcategory_idに基づいて名前を追加
        const postsWithDetails = postsArray.map((post) => ({
          ...post,
          userName: usersMap.get(post.user_id) || 'Unknown User',
          categoryName: categoriesMap.get(post.category_id) || 'Unknown Category'
        }));

        console.log("Number of documents fetched:", postsSnapshot.docs.length);
        setPosts(postsWithDetails);
      } catch (err) {
        console.error("Error fetching posts or related data:", err);
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostsWithDetails();
  }, []);

  return { posts, loading, error, setPosts };
};
