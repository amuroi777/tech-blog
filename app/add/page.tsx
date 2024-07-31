'use client'
import { Box, Center, Container, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React from 'react'
import Dropzone from "react-dropzone";

const AddPage = () => {
  return (
    <Box pt={10} pb={20}>
      <Center fontWeight="bold" fontSize="4xl" mb={5}>Create Blog</Center>
      <Flex justify="center" gap={10} px={{ base: 5, md: 10 }}>
        <Stack
          bg='yellow.100'
          rounded="md"
          py={{ base: 4, md: 8 }}
          px={5}
          spacing={3}
          h="fit-content"
          w={{ base: "100%", md: "fit-content" }}
          position={{ base: "fixed", md: "sticky" }}
          top={{ base: "auto", md: 30 }}
          bottom={{ base: 0, md: "auto" }}
          direction={{ base: "row", md: "column" }}
          justify="center"
        >
          <Text fontSize="xl" display="flex" justifyContent="center">a</Text>
          <Text fontSize="xl" display="flex" justifyContent="center">a</Text>
          <Text fontSize="xl" display="flex" justifyContent="center">a</Text>
          <Text fontSize="xl" display="flex" justifyContent="center">a</Text>
          <Text fontSize="xl" display="flex" justifyContent="center">a</Text>
          <Text fontSize="xl" display="flex" justifyContent="center">a</Text>
          <Text fontSize="xl" display="flex" justifyContent="center">a</Text>
          <Text fontSize="xl" display="flex" justifyContent="center">a</Text>
          <Text fontSize="xl" display="flex" justifyContent="center">a</Text>
        </Stack>

        <Box w={720}>
          <Text fontSize="3xl" fontWeight="bold" mb={3}>Title</Text>
          <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <Flex {...getRootProps()} bg='yellow.200' height={100} cursor="pointer" justify="center">
                <input {...getInputProps()} />
                <Center fontWeight="bold">Upload Image</Center>
              </Flex>
            )}
          </Dropzone>

          <Box rounded="md" border="1px solid #ccc" p={5} mt={6}>
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
      </Flex>
    </Box>
  )
}

export default AddPage;