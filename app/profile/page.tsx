'use client'

import { Box, Card, CardBody, Center, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React, { useState } from 'react';
import { AuthProvider } from "../context/AuthContext";
import { AuthGuard } from "../authguard/AuthGuard";
import HeaderTop from "../components/HeaderTop";
import { usePosts } from "../hooks/UsePosts";
import { convertDraftContentToHTML } from "../utils/convertDraftContentToHTML";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";


export default function Profile() {
  const { posts, loading, error } = usePosts();
  const [user, loadingAuth] = useAuthState(auth);

  // ページネーションのための状態
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // 投稿が存在しない場合、空の配列を使用
  const DisplayedPersonalPosts = posts.filter(post => post.user_id === user?.uid).slice(startIndex, endIndex);


  // 画像エラーの場合
  const [imageError, setImageError] = useState<string>("");



  if (loading) {
    return <Center><Box mt='20' color="gray.500">Loading...</Box></Center>;
  }
  if (error) return <Text>Error: {error}</Text>;

  return (
    <AuthProvider>
      <AuthGuard>
        <HeaderTop />

        <Box mx="6">
          <Stack mt="6" spacing="3"></Stack>
          <Box as="div" mx="0 auto">
            <Center>
              <Heading size="2xl" m="5" color="black.500">Your Post</Heading>
            </Center>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="center" p={4}>
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={3}>
              {DisplayedPersonalPosts.map((post) => (
                <Card key={post.id} border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
                  <Link href={`/${post.id}`}>
                    <CardBody p="0" borderTopRadius="md" height="498px" maxH="inherit">
                      <Image
                        borderTopRadius="md"
                        objectFit='cover'
                        src={post.image_path}
                        alt={post.title}
                        width="100%"
                        maxHeight="62%"
                        onError={() => setImageError(post.id)}
                        display={imageError === post.id ? "none" : "block"}


                      />
                      {imageError === post.id && (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          height="62%"
                          width="100%"
                          bg="gray.200"
                          borderTopRadius="md"
                        >
                          <Text color="gray.500" fontSize="lg">No Image</Text>
                        </Box>
                      )}
                      <Box>
                        <Stack px='5' spacing='2' py='4'>
                          <Text mt={1} color="gray.500" textAlign="right">{post.categoryName}</Text>

                          <Heading size='md'>{post.title}</Heading>

                          <Box display='flex' alignItems='center' >
                            <Text mt={1} color="blue.400">{post.userName}</Text>

                            <Text mt={1} color="blue.400" marginLeft='5'>
                              {new Date(post.created_at).toLocaleDateString()}
                            </Text>

                          </Box>
                          <Box
                            fontSize={["sm", "md", "lg", "xl"]}
                            mb={2}
                            // 文字を２行で省略
                            sx={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                              overflow: "hidden",
                            }}
                            dangerouslySetInnerHTML={{ __html: convertDraftContentToHTML(post.content) }}
                          />
                        </Stack>
                      </Box>
                    </CardBody>
                  </Link>
                </Card>
              ))}
            </SimpleGrid>
          </Box>
        </Box>

      </AuthGuard>
    </AuthProvider>
  );
}
