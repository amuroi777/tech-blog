import React, { useState } from 'react';
import { storage } from '@/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, Input, Progress, useToast } from "@chakra-ui/react";

export default function ProfileFileUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "エラー",
        description: "ファイルを選択してください。",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        toast({
          title: "アップロードエラー",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onUpload(downloadURL); // 親コンポーネントにURLを渡す
        setProgress(0);
        toast({
          title: "アップロード成功",
          description: "画像がアップロードされました。",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    );
  };

  return (
    <>
      <Input type="file" onChange={handleFileChange} mb={4} />
      {progress > 0 && <Progress value={progress} size="xs" colorScheme="green" mb={4} />}
      <Button onClick={handleUpload} colorScheme="blue">
        アップロード
      </Button>
    </>
  );
}
