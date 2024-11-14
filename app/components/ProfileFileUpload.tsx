import React, { useState } from 'react';
import { storage } from './firebase'; // Firebase設定をインポート
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button, Input, Progress, useToast } from "@chakra-ui/react";

export default function ProfileFileUpload() {
  const [file, setFile ] = useState<File | null>(null);
	const [upload, setUpload] = useState(0);
	const toast = useToast;

	// ファイル選択時の処理
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
			setFile(event.target.files[0]);
		}
	};

	// ファイルアップロード処理
	const handleUpload = () => {
		if (!file) {
			toast({
        title: "Error",
        description: "Please select a file",
        status: "error",
      });
      return;
		}

		// アップロードするため参照の作成
		const storageRef = ref(storage, 'uploads/${file.name}');
		const uploadTask = uploadBytesResumable(storageRef, file);

		// アップロードの進行状況を監視
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setUpload(progress);
			},
			(error) => {
				toast({
        title: "Error",
        description: error.message,
        status: "error",
				duration: 5000,
        isClosable: true,
      });
			},
			() => {
				// アップロードが完了した時の処理
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					toast({
            title: "アップロード成功",
            description: "ファイルが正常にアップロードされました",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
				})
			}
		)
	}
}
