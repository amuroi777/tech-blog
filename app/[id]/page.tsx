'use client'
import { Box, Center, Container, Flex, Grid, GridItem, Image, Input, LinkBox, Link, Stack, Text, HStack, FormControl, Button } from "@chakra-ui/react";
import React from 'react'
import Dropzone from "react-dropzone";

const AddPage = () => {
  return (
    <Box pt={10} pb={20}>
      <Container maxW="4xl">
        <Box bg="yellow.200" p={{ base: 4, md: 10 }} borderRadius={20}>
          <Flex justify="space-between" gap={4}>
            <Text fontSize="3xl" fontWeight="bold" mb={3}>TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle</Text>
            <Flex display={{ base: "none", md: "block" }} align="center" justify="center" h={50} w={50} borderRadius={100} overflow="hidden" flexGrow={0} flexShrink={0}>
              <Image src="http://satyr.dev/50-100x50-100/7?text=Dummy+Image&texture=cross" alt="ダミーイメージ" loading="lazy" objectFit="cover" h="100%" w="100%" />
            </Flex>
          </Flex>

          <Flex align="center" justify="center" bg="gray.50" h={{ base: "200", md: "400" }}>
            <Image src="http://satyr.dev/500-1000x500-1000/1?text=Dummy+Image&texture=cross" alt="ダミーイメージ" loading="lazy" objectFit="contain" h="100%" />
          </Flex>

          <Box rounded="md" p={5} mt={6} bg="yellow.50">
            テキストテキストテキストテキストテキスト<br />
            テキストテキストテキストテキストテキスト<br />
            テキストテキストテキストテキストテキスト<br />
            テキストテキストテキストテキストテキスト<br />
            テキストテキストテキストテキストテキスト<br />
            テキストテキストテキストテキストテキスト<br />
            テキストテキストテキストテキストテキスト<br />
            テキストテキストテキストテキストテキスト<br />
            テキストテキストテキストテキストテキスト<br />
            テキストテキストテキストテキストテキスト<br />
            テキストテキストテキストテキストテキスト<br />
            テキストテキストテキストテキストテキスト<br />
          </Box>
        </Box>

        <Box mt={10}>
          <Text fontSize="2xl" fontWeight="bold" mb={3}>More Posts</Text>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
            <GridItem>
              <Box>
                <Link href="">
                  <Flex align="center" justify="center" bg="gray.200" h="200">
                    <Image src="http://satyr.dev/500-1000x500-1000/2?text=Dummy+Image&texture=cross" alt="ダミーイメージ" loading="lazy" objectFit="contain" h="100%" />
                  </Flex>
                  <Text fontWeight="medium" mt={3}>TitleTitle</Text>
                </Link>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Link href="">
                  <Flex align="center" justify="center" bg="gray.200" h="200">
                    <Image src="http://satyr.dev/500-1000x500-1000/3?text=Dummy+Image&texture=cross" alt="ダミーイメージ" loading="lazy" objectFit="contain" h="100%" />
                  </Flex>
                  <Text fontWeight="medium" mt={3}>TitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitleTitle</Text>
                </Link>
              </Box>
            </GridItem>
            <GridItem>
              <Box>
                <Link href="">
                  <Flex align="center" justify="center" bg="gray.200" h="200">
                    <Image src="http://satyr.dev/500-1000x500-1000/4?text=Dummy+Image&texture=cross" alt="ダミーイメージ" loading="lazy" objectFit="contain" h="100%" />
                  </Flex>
                  <Text fontWeight="medium" mt={3}>TitleTitle</Text>
                </Link>
              </Box>
            </GridItem>
          </Grid>
        </Box>

        <Box mt={10} maxW={600} mx="auto">
          <Text fontSize="2xl" fontWeight="bold" mb={3}>Comments</Text>

          <FormControl mb={5}>
            <Flex gap={2} flexDirection={{ base: "column", md: "row" }}>
              <Input
                id='name'
                placeholder='Your Comment...'
              />
              <Button
                colorScheme='blue'
                type='submit'
                fontSize="sm"
              >
                Comment
              </Button>
            </Flex>
          </FormControl>

          <Stack>
            <Box bg="gray.300" borderRadius={10} p={5}>
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
                  <Text fontSize="sm">テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</Text>
                  <Text fontSize="xs" mt={3} color="blue.500">a min ago</Text>
                </Box>
              </Flex>
            </Box>
            <Box bg="gray.300" borderRadius={10} p={5}>
              <Flex gap={3}>
                <Box>
                  <Flex align="center" justify="center" h={50} w={50} borderRadius={100} overflow="hidden">
                    <Image src="http://satyr.dev/50-100x50-100/6?text=Dummy+Image&texture=cross" alt="ダミーイメージ" loading="lazy" objectFit="cover" h="100%" w="100%" />
                  </Flex>
                  <Flex align="center" justify="center" mt={1}>
                    <Text fontWeight="medium" fontSize="sm">UserUserUser</Text>
                  </Flex>
                </Box>
                <Box>
                  <Text fontSize="sm">テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</Text>
                  <Text fontSize="xs" mt={3} color="blue.500">a min ago</Text>
                </Box>
              </Flex>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default AddPage;