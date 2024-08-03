'use client'
import { Box, Card, CardBody, Center, Heading, Image, Input, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import styles from "./page.module.css";
import React from 'react'



export default function Home() {
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

          <Card border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
            <CardBody p="0" borderTopRadius="md" maxH="inherit">

              <Image
                borderTopRadius="md"
                objectFit='cover'
                src="https://placehold.jp/467x304.png"
                alt="dummy"
                maxH="inherit"
              />

              <Box>
                <Stack mx='5' spacing='2' my='4'>
                  <Text mt={1} color="gray.500" textAlign="right">Categroy</Text>

                  <Heading size='md'>Post Title</Heading>

                  <Box display='flex' alignItems='center' >

                    <Text mt={1} color="gray.500">Author</Text>
                    <Text mt={1} color="gray.500" marginLeft='5'>a min ago</Text>
                  </Box>

                  <Text fontSize={["sm", "md", "lg", "xl"]} mb={2}>この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</Text>

                </Stack>


              </Box>

            </CardBody>

          </Card>


          <Card border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
            <CardBody p="0" borderTopRadius="md" maxH="inherit">
              <Image
                borderTopRadius="md"
                objectFit='cover'
                src="https://placehold.jp/467x304.png"
                alt="dummy"
                maxH="inherit"
              />

              <Box>
                <Stack mx='5' spacing='2' my='4'>
                  <Text mt={1} color="gray.500" textAlign="right">Categroy</Text>

                  <Heading size='md'>Post Title</Heading>

                  <Box display='flex' alignItems='center' >

                    <Text mt={1} color="gray.500">Author</Text>
                    <Text mt={1} color="gray.500" marginLeft='5'>a min ago</Text>
                  </Box>

                  <Text fontSize={["sm", "md", "lg", "xl"]} mt={1} >この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</Text>

                </Stack>


              </Box>

            </CardBody>

          </Card>

          <Card border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
            <CardBody p="0" borderTopRadius="md" maxH="inherit">
              <Image
                borderTopRadius="md"
                objectFit='cover'
                src="https://placehold.jp/467x304.png"
                alt="dummy"
                maxH="inherit"
              />
              <Box>
                <Stack mx='5' spacing='2' my='4'>
                  <Text mt={1} color="gray.500" textAlign="right">Categroy</Text>

                  <Heading size='md'>Post Title</Heading>

                  <Box display='flex' alignItems='center' >

                    <Text mt={1} color="gray.500">Author</Text>
                    <Text mt={1} color="gray.500" marginLeft='5'>a min ago</Text>
                  </Box>

                  <Text fontSize={["sm", "md", "lg", "xl"]} mt={1} >この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</Text>

                </Stack>


              </Box>

            </CardBody>

          </Card>

        </SimpleGrid>



      </Box>

      <Box display='flex' alignItems='center' justifyContent="center" p={4}>

        <SimpleGrid columns={[1, 1, 2, 3]} spacing={3}>

          <Card border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
            <CardBody p="0" borderTopRadius="md" maxH="inherit">

              <Image
                borderTopRadius="md"
                objectFit='cover'
                src="https://placehold.jp/467x304.png"
                alt="dummy"
                maxH="inherit"
              />

              <Box>
                <Stack mx='5' spacing='2' my='4'>
                  <Text mt={1} color="gray.500" textAlign="right">Categroy</Text>

                  <Heading size='md'>Post Title</Heading>

                  <Box display='flex' alignItems='center' >

                    <Text mt={1} color="gray.500">Author</Text>
                    <Text mt={1} color="gray.500" marginLeft='5'>a min ago</Text>
                  </Box>

                  <Text fontSize={["sm", "md", "lg", "xl"]} mb={2}>この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</Text>

                </Stack>


              </Box>

            </CardBody>

          </Card>


          <Card border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
            <CardBody p="0" borderTopRadius="md" maxH="inherit">
              <Image
                borderTopRadius="md"
                objectFit='cover'
                src="https://placehold.jp/467x304.png"
                alt="dummy"
                maxH="inherit"
              />

              <Box>
                <Stack mx='5' spacing='2' my='4'>
                  <Text mt={1} color="gray.500" textAlign="right">Categroy</Text>

                  <Heading size='md'>Post Title</Heading>

                  <Box display='flex' alignItems='center' >

                    <Text mt={1} color="gray.500">Author</Text>
                    <Text mt={1} color="gray.500" marginLeft='5'>a min ago</Text>
                  </Box>

                  <Text fontSize={["sm", "md", "lg", "xl"]} mt={1} >この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</Text>

                </Stack>


              </Box>

            </CardBody>

          </Card>

          <Card border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
            <CardBody p="0" borderTopRadius="md" maxH="inherit">
              <Image
                borderTopRadius="md"
                objectFit='cover'
                src="https://placehold.jp/467x304.png"
                alt="dummy"
                maxH="inherit"
              />
              <Box>
                <Stack mx='5' spacing='2' my='4'>
                  <Text mt={1} color="gray.500" textAlign="right">Categroy</Text>

                  <Heading size='md'>Post Title</Heading>

                  <Box display='flex' alignItems='center' >

                    <Text mt={1} color="gray.500">Author</Text>
                    <Text mt={1} color="gray.500" marginLeft='5'>a min ago</Text>
                  </Box>

                  <Text fontSize={["sm", "md", "lg", "xl"]} mt={1} >この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</Text>

                </Stack>


              </Box>

            </CardBody>

          </Card>

        </SimpleGrid>

      </Box>

      <Box display='flex' alignItems='center' justifyContent="center" p={4}>

        <SimpleGrid columns={[1, 1, 2, 3]} spacing={3}>

          <Card border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
            <CardBody p="0" borderTopRadius="md" maxH="inherit">

              <Image
                borderTopRadius="md"
                objectFit='cover'
                src="https://placehold.jp/467x304.png"
                alt="dummy"
                maxH="inherit"
              />

              <Box>
                <Stack mx='5' spacing='2' my='4'>
                  <Text mt={1} color="gray.500" textAlign="right">Categroy</Text>

                  <Heading size='md'>Post Title</Heading>

                  <Box display='flex' alignItems='center' >

                    <Text mt={1} color="gray.500">Author</Text>
                    <Text mt={1} color="gray.500" marginLeft='5'>a min ago</Text>
                  </Box>

                  <Text fontSize={["sm", "md", "lg", "xl"]} mb={2}>この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</Text>

                </Stack>


              </Box>

            </CardBody>

          </Card>


          <Card border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
            <CardBody p="0" borderTopRadius="md" maxH="inherit">
              <Image
                borderTopRadius="md"
                objectFit='cover'
                src="https://placehold.jp/467x304.png"
                alt="dummy"
                maxH="inherit"
              />

              <Box>
                <Stack mx='5' spacing='2' my='4'>
                  <Text mt={1} color="gray.500" textAlign="right">Categroy</Text>

                  <Heading size='md'>Post Title</Heading>

                  <Box display='flex' alignItems='center' >

                    <Text mt={1} color="gray.500">Author</Text>
                    <Text mt={1} color="gray.500" marginLeft='5'>a min ago</Text>
                  </Box>

                  <Text fontSize={["sm", "md", "lg", "xl"]} mt={1} >この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</Text>

                </Stack>


              </Box>

            </CardBody>

          </Card>

          <Card border="1" borderRadius="md" maxW="467px" maxH="498px" mx="3" my="5">
            <CardBody p="0" borderTopRadius="md" maxH="inherit">
              <Image
                borderTopRadius="md"
                objectFit='cover'
                src="https://placehold.jp/467x304.png"
                alt="dummy"
                maxH="inherit"
              />
              <Box>
                <Stack mx='5' spacing='2' my='4'>
                  <Text mt={1} color="gray.500" textAlign="right">Categroy</Text>

                  <Heading size='md'>Post Title</Heading>

                  <Box display='flex' alignItems='center' >

                    <Text mt={1} color="gray.500">Author</Text>
                    <Text mt={1} color="gray.500" marginLeft='5'>a min ago</Text>
                  </Box>

                  <Text fontSize={["sm", "md", "lg", "xl"]} mt={1} >この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。</Text>

                </Stack>
              </Box>
            </CardBody>
          </Card>
        </SimpleGrid>

      </Box>

    </Box>


  );
}
