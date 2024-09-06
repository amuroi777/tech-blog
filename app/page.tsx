'use client';

import { Box, Card, CardBody, Center, Heading, Image, Input, InputGroup, Stack, Text, SimpleGrid, InputRightElement } from "@chakra-ui/react";
import Pagination from "./components/Pagination";
import { usePosts } from "./hooks/UsePosts";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderTop from "./components/HeaderTop";
import { AuthProvider } from './context/AuthContext';
import { AuthGuard } from './authguard/AuthGuard';
import { convertDraftContentToHTML } from "./utils/convertDraftContentToHTML";
import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { posts, loading } = usePosts();
  const itemPerPage = 9;

  // 現在のページ番号を管理するステート
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 検索用の状態
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const page = parseInt(searchParams.get('p') || '1', 10);
    setCurrentPage(page);
  }, [searchParams]);

  // ページ変更時の処理
  const handlePageChange = (page: number) => {
    router.push(`?p=${page}`);
    setCurrentPage(page);
  };

  // 検索欄の入力変更時の処理
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // ローディング中の表示
  if (loading) {
    return <Center><Box mt='20' color="gray.500">Loading...</Box></Center>;
  }

  // 検索処理
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 表示する投稿の範囲を決定
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const displayedPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <AuthProvider>
      <AuthGuard>
        <HeaderTop />

        <Box mx='6'>
          <Stack mt='6' spacing='3'></Stack>

          <Box as="div" mx={"0 auto"}>
            <Center>
              <InputGroup width="100%" maxW="500px" m="5">
                <Input
                  minW="350px"
                  w="100%"
                  type="text"
                  placeholder="Search Blog Post"
                  color="gray.800"
                  bg="gray.100"
                  rounded="full"
                  border="1"
                  _focus={{
                    bg: "gray.200",
                    outline: "none",
                  }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <InputRightElement pointerEvents="none">
                  < SearchIcon color="gray.500" />
                </InputRightElement>
              </InputGroup>
            </Center>
          </Box>

          <Box display='flex' alignItems='center' justifyContent="center" p={4}>
            <SimpleGrid columns={[1, 1, 2, 3]} spacing={3}>
              {displayedPosts.map((post) => (
                <Card key={post.id} border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
                  <Link href={`/${post.id}`}>
                    <CardBody p="0" borderTopRadius="md" maxH="inherit">
                      <Image
                        borderTopRadius="md"
                        objectFit='cover'
                        src={post.image_path}
                        alt={post.title}
                        maxH="inherit"
                      />
                      <Box>
                        <Stack px='5' spacing='2' py='4'>
                          <Text mt={1} color="gray.500" textAlign="right">{post.categoryName}</Text>
                          <Heading size='md'>{post.title}</Heading>
                          <Box display='flex' alignItems='center' >
                            <Text mt={1} color="gray.500">{post.userName}</Text>
                            <Text mt={1} color="gray.500" marginLeft='5'>{new Date(post.created_at).toLocaleDateString()}</Text>
                          </Box>
                          <Box
                            fontSize={["sm", "md", "lg", "xl"]}
                            mb={2}
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

          <Box display='flex' alignItems='center' justifyContent="center" p={4}>
            <Pagination
              currentPage={currentPage}
              limit={itemPerPage}
              count={filteredPosts.length}
              onPageChange={handlePageChange}
              path={""}
            />
          </Box>
        </Box>
      </AuthGuard>
    </AuthProvider>
  );
}
