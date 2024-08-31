'use client';

import { Box, Card, CardBody, Center, Heading, Image, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Pagination from "./components/Pagination";
import { usePosts } from "./hooks/UsePosts";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderTop from "./components/HeaderTop";
import { AuthProvider } from './context/AuthContext';
import { AuthGuard } from './authguard/AuthGuard'
import type { AppProps } from 'next/app'
import { convertDraftContentToHTML } from "./utils/convertDraftContentToHTML";

export default function Home({ Component, pageProps }: AppProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { posts, loading } = usePosts();
  const itemPerPage = 9;


  //現在のページ番号を管理するステート
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  useEffect(() => {
    const page = parseInt(searchParams.get('p') || '1', 10);
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    router.push(`?p=${page}`);
    setCurrentPage(page);
  };

  if (loading) {
    return <Center><Box mt='20' color="gray.500">Loading...</Box></Center>;
  }

  //  現在のページに基づいて表示するカードを制限
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const displayedPosts = posts.slice(startIndex, endIndex);

  return (
    <AuthProvider>
      <AuthGuard>
        <HeaderTop />


        <Box mx='6'>

          <Stack mt='6' spacing='3'></Stack>
          <Box
            as="div"
            mx={"0 auto"}
          >
            <Center>
              <Input
                minW="350px"
                w="46%"
                m="5"
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
              />
            </Center>
          </Box>
          <Box display='flex' alignItems='center' justifyContent="center" p={4}>

            <SimpleGrid columns={[1, 1, 2, 3]} spacing={3}>
              {displayedPosts.map((post) => (
                <Card key={post.id} border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
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
                        <Text mt={1} color="gray.500" textAlign="right"> {post.category_id}</Text>
                        <Heading size='md'>{post.title}</Heading>
                        <Box display='flex' alignItems='center' >
                          <Text mt={1} color="gray.500">{post.user_id}</Text>
                          <Text mt={1} color="gray.500" marginLeft='5'>  {new Date(post.created_at).toLocaleDateString()}</Text>
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
                </Card>
              ))}
            </SimpleGrid>
          </Box>

          <Box display='flex' alignItems='center' justifyContent="center" p={4}>

            <Pagination
              currentPage={currentPage}
              limit={itemPerPage}
              count={posts.length}
              onPageChange={handlePageChange}
              path={""} /> {/*現在のパスを渡す ? サーバー・・・サイド？*/}

          </Box>



        </Box>
      </AuthGuard>
    </AuthProvider>
  );
}
