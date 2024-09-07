'use client';

import { Box, Center, Container, Flex, Grid, GridItem, Image, Input, LinkBox, Link, Stack, Text, HStack, FormControl, Button } from "@chakra-ui/react";
import { doc, getDoc, collection, getDocs, addDoc, updateDoc, serverTimestamp, where, onSnapshot, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from '../context/AuthContext';
import { AuthProvider } from "../context/AuthContext";
import { AuthGuard } from "../authguard/AuthGuard";
import HeaderTop from "../components/HeaderTop";
import { convertDraftContentToHTML } from "../utils/convertDraftContentToHTML";

type Post = {
  id: string;
  title: string;
  content: string;
  image_path: string;
}

type Comment = {
  comment_id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: any;
  updated_at: any;
  text: string;
  timestamp: string;
}

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [morePosts, setMorePosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const authContext = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      //現在の投稿を取得
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setError("投稿が見つかりませんでした");
        return;
      }

      const fetchedPost = docSnap.data() as Post;
      setPost(fetchedPost);


      // 他の投稿を取得
      const postsRef = collection(db, "posts");
      const postsSnap = await getDocs(postsRef);

      const allPosts = postsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }) as Post);

      // MorePost 投稿をランダム取得
      const filteredPosts = allPosts.filter(p => p.title !== post?.title);
      setMorePosts(shuffleArray(filteredPosts).slice(0, 3));
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    //コメントを取得する
    const q = query(collection(db, "comments"), where("post_id", "==", params.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        comment_id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [params.id]);

  // 配列をシャッフルする関数
  function shuffleArray(array: Post[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //コメント機能
  const handleAddComment = async () => {
    if (commentText.trim() === "") return;

    const user = authContext?.user;

    const newComment: Comment = {
      comment_id: "",
      user_id: user ? user.uid : "user",
      post_id: params.id,
      content: commentText,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      text: commentText,
      timestamp: new Date().toLocaleTimeString(),
    };

    const docRef = await addDoc(collection(db, "comments"), newComment);
    setCommentText("");
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return <Center><Box mt='20' color="gray.500">Loading...</Box></Center>;;
  }

  return (
    <AuthProvider>
      <HeaderTop />
      <Box pt={10} pb={20}>
        <Container maxW="4xl">
          <Box bg="yellow.200" p={{ base: 4, md: 10 }} borderRadius={20}>
            <Flex justify="space-between" gap={4}>
              <Text fontSize="3xl" fontWeight="bold" mb={3}>{post.title}</Text>
              <Flex display={{ base: "none", md: "block" }} align="center" justify="center" h={50} w={50} borderRadius={100} overflow="hidden" flexGrow={0} flexShrink={0}>
                <Image src="http://satyr.dev/50-100x50-100/7?text=Dummy+Image&texture=cross" alt="ダミーイメージ" loading="lazy" objectFit="cover" h="100%" w="100%" />
              </Flex>
            </Flex>

            <Flex align="center" justify="center" bg="gray.50" h={{ base: "200", md: "400" }}>
              <Image src={post.image_path} alt="post image" loading="lazy" objectFit="contain" h="100%" />
            </Flex>

            <Box rounded="md" p={5} mt={6} bg="yellow.50">
              <Box
                dangerouslySetInnerHTML={{ __html: convertDraftContentToHTML(post.content) }}
              >
              </Box>
            </Box>
          </Box>

          <Box mt={10}>
            <Text fontSize="2xl" fontWeight="bold" mb={3}>More Posts</Text>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
              {morePosts.map((morePost, index) => (
                <GridItem key={index}>
                  <Box>
                    <Link href={`/${morePost.id}`}>
                      <Flex align="center" justify="center" h="200">
                        <Image src={morePost.image_path} alt="投稿画像" loading="lazy" objectFit="contain" h="100%" />
                      </Flex>
                      <Text fontWeight="medium" mt={3}>{morePost.title}</Text>
                    </Link>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Box>

          <Box mt={10} maxW={600} mx="auto">
            <Text fontSize="2xl" fontWeight="bold" mb={3}>Comments</Text>

            <FormControl mb={5}>
              <Flex gap={2} flexDirection={{ base: "column", md: "row" }}>
                <Input
                  id='comment'
                  placeholder='Your Comment...'
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  colorScheme='blue'
                  type='submit'
                  fontSize="sm"
                  onClick={handleAddComment}
                >
                  Comment
                </Button>
              </Flex>
            </FormControl>

            <Stack>
              {comments.map((comment, index) => (
                <Box key={index} bg="gray.300" borderRadius={10} p={5}>
                  <Flex gap={3}>
                    <Box>
                      <Flex align="center" justify="center" h={50} w={50} borderRadius={100} overflow="hidden">
                        <Image src="http://satyr.dev/50-100x50-100/5?text=Dummy+Image&texture=cross" alt="ダミーイメージ" loading="lazy" objectFit="cover" h="100%" w="100%" />
                      </Flex>
                      <Flex align="center" justify="center" mt={1}>
                        <Text fontWeight="medium" fontSize="sm">User</Text>
                      </Flex>
                    </Box>
                    <Box>
                      <Text fontSize="sm">{comment.text}</Text>
                      <Text fontSize="xs" mt={3} color="blue.500">{comment.timestamp}</Text>
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </AuthProvider>
  );
}

