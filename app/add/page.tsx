'use client'
import React, { useState } from 'react'
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { Box, Button, Center, Flex, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

type FormTypes = {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  content: string;
  image_path: File[];
}

const AddPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // React Hook Form
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormTypes>();

  // 画像のアップロード
  const onDrop = (acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles[0]); // 最初のファイルを選択
    setValue("image_path", acceptedFiles); // React Hook Formに画像を設定
  };

  // フォームが送信されたときの処理
  const onSubmit: SubmitHandler<FormTypes> = async (data) => {
    setLoading(true);

    try {
      var downloadURL = "";

      const id = uuidv4();

      if (selectedImage) {
        const storageRef = ref(storage, `images/${selectedImage.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, selectedImage);
        downloadURL = await getDownloadURL(uploadTask.ref);
      }

      await addDoc(collection(db, "posts"), {
        id: id,
        user_id: '0', // 仮ID
        category_id: '0', // 仮ID
        title: data.title,
        content: data.content,
        image_path: downloadURL,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error writing document: ", error);
    } finally {
      setLoading(false);
    }
  }

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={4}>
              <Input
                placeholder="タイトルを入力してください"
                size="lg"
                type="text"
                {...register("title", {
                  required: {
                    value: true,
                    message: "タイトルを入力してください",
                  }
                })}
              />
              {errors.title && (
                <Text mt={1} color="red" fontWeight="bold">{errors.title.message}</Text>
              )}
            </Box>
            <Box>
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <Flex {...getRootProps()} bg='yellow.200' height={100} cursor="pointer" justify="center">
                    <input
                      {...getInputProps()}
                    // {...register("image_path", {
                    //   required: {
                    //     value: true,
                    //     message: "画像をアップロードしてください",
                    //   }
                    // })}
                    />
                    <Center fontWeight="bold">Upload Image</Center>
                  </Flex>
                )}
              </Dropzone>
              {errors.image_path && (
                <Text mt={1} color="red" fontWeight="bold">{errors.image_path.message}</Text>
              )}
            </Box>
            <Box rounded="md" border="1px solid #ccc" p={5} mt={6}>
              <Textarea
                placeholder="内容を入力してください"
                {...register("content", {
                  required: {
                    value: true,
                    message: "内容を入力してください",
                  }
                })}
              />
              {errors.content && (
                <Text mt={1} color="red" fontWeight="bold">{errors.content.message}</Text>
              )}
            </Box>
            <Box textAlign="right" mt={3}>
              <Button type="submit" colorScheme="blue" disabled={loading}>
                {loading ? "投稿中..." : "投稿する"}
              </Button>
            </Box>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AddPage;