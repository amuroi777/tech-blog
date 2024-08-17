'use client'
import { Box, Card, CardBody, Center, Heading, Image, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from 'react'
import Pagination from "./components/Pagination";
import { usePosts } from "./hooks/UsePosts";


export default function Home() {

  const { posts, loading, error } = usePosts();
  const [currentPage, setCurrentPage] = React.useState(1);
  const limit = 6;
  const totalCount = 18;


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (

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
          {posts.map((post) => (
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
                  <Stack mx='5' spacing='2' my='4'>
                    <Text mt={1} color="gray.500" textAlign="right"> {post.category_id}</Text>
                    <Heading size='md'>{post.title}</Heading>
                    <Box display='flex' alignItems='center' >
                      <Text mt={1} color="gray.500">{post.user_id}</Text>
                      <Text mt={1} color="gray.500" marginLeft='5'>  {new Date(post.created_at).toLocaleDateString()}</Text>
                    </Box>
                    <Text fontSize={["sm", "md", "lg", "xl"]} mb={2}>{post.content}</Text>
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
          limit={limit}
          count={totalCount}
          path="/page" // ページリンクのパス未設定（仮）で詳細ページに
          onPageChange={handlePageChange} // ページ変更のハンドラを渡す
        />
      </Box>

    </Box>

  );
}

