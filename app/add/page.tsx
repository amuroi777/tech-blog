'use client'
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { Box, Button, Center, Flex, Input, Select, Stack, Text, Textarea } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import { Editor as DraftEditor, EditorState, RichUtils, Modifier, convertToRaw } from "draft-js";
import 'draft-js/dist/Draft.css';
import { getAuth } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderTop from "../components/HeaderTop";
import { AuthProvider } from "../context/AuthContext";
import { AuthGuard } from "../authguard/AuthGuard";

type FormTypes = {
  id: string;
  user_id: string;
  category_id: string;
  title: string;
  content: string;
  image_path: File[];
  category: string;
}

const AddPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editorEnable, setEditorEnable] = useState(false)
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  const [isCategorySelected, setIsCategorySelected] = useState(true);
  const auth = getAuth();
  const router = useRouter();
  const searchParams = useSearchParams();


  useEffect(() => {
    setEditorEnable(true);

    // Firestoreからカテゴリーを取得
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as { id: string, name: string }[];
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  // React Hook Form
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormTypes>();

  // 新しいカテゴリーが入力されたら、Selectを無効化
  const watchCategory = watch("category");
  useEffect(() => {
    setIsCategorySelected(!watchCategory);
  }, [watchCategory]);

  // 画像のアップロード
  const onDrop = (acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles[0]); // 最初のファイルを選択
    setValue("image_path", acceptedFiles); // React Hook Formに画像を設定
  };

  // フォームが送信されたときの処理
  const onSubmit: SubmitHandler<FormTypes> = async (data) => {
    setLoading(true);

    const toJapanTimeISO = () => {
      const date = new Date();
      const japanTime = new Date(date.getTime() + (9 * 60 * 60 * 1000));
      return japanTime.toISOString();
    };

    try {
      var downloadURL = "";

      const id = uuidv4();

      if (selectedImage) {
        const storageRef = ref(storage, `images/${selectedImage.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, selectedImage);
        downloadURL = await getDownloadURL(uploadTask.ref);
      }

      // EditorStateからコンテンツを取得してシリアライズ
      const contentState = editorState.getCurrentContent();
      const contentRaw = JSON.stringify(convertToRaw(contentState));

      // カテゴリーが新規入力された場合、Firestoreに追加
      let category_id = data.category_id;
      if (data.category) {
        // setDocを使って指定したIDでドキュメントを作成
        await setDoc(doc(db, "categories", id), {
          id: id,
          name: data.category,
          created_at: toJapanTimeISO(),
          updated_at: toJapanTimeISO(),
        });
        category_id = id; // 新しいカテゴリーのIDとして使用
      }

      const user = auth.currentUser; // 現在のユーザーを取得
      if (!user) {
        throw new Error("User is not logged in");
      }

      // ブログ投稿データの保存
      await setDoc(doc(db, "posts", id), {
        id: id,
        user_id: user.uid, // 現在のユーザーのuidを使用
        category_id: category_id, // カテゴリーIDをセット
        title: data.title,
        content: contentRaw, // コンテンツを文字列として保存
        image_path: downloadURL,
        created_at: toJapanTimeISO(),
        updated_at: toJapanTimeISO(),
      });

      // フォームをリセット
      reset();
      setSelectedImage(null);
      setEditorState(EditorState.createEmpty());

      // トップページに遷移
      router.push('/');
    } catch (error) {
      console.error("Error writing document: ", error);
    } finally {
      setLoading(false);
    }
  }

  //headerの「publish」クリック時の処理
  useEffect(() => {
    // クエリパラメータの処理
    const publish = searchParams.get('publish');
    if (publish === 'true') {
      // フォームを自動的に送信
      handleSubmit(onSubmit)();
    }
  }, [searchParams]);

  // エディター 太字
  const handleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  // エディター 斜体
  const handleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  // エディター 大文字
  const handleUppercase = () => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const currentText = currentContent.getBlockForKey(selection.getStartKey()).getText();
    const newText = currentText.toUpperCase();

    const contentState = Modifier.replaceText(
      currentContent,
      selection,
      newText
    );

    setEditorState(EditorState.push(editorState, contentState, "change-inline-style"));
  };

  // エディター 小文字
  const handleLowercase = () => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const currentText = currentContent.getBlockForKey(selection.getStartKey()).getText();
    const newText = currentText.toLowerCase();

    const contentState = Modifier.replaceText(
      currentContent,
      selection,
      newText
    );

    setEditorState(EditorState.push(editorState, contentState, "change-inline-style"));
  };

  // エディター 下線
  const handleUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  // エディター ハイライト
  const handleMarker = () => {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT");
    setEditorState(newEditorState);
  };

  // ハイライトのスタイル設定
  const styleMap = {
    HIGHLIGHT: {
      background: 'linear-gradient(transparent 50%, yellow 50%)',
    },
  };

  return (
    <AuthProvider>
      <AuthGuard>
        <HeaderTop />
        <Box pt={10} pb={20}>
          <Center fontWeight="bold" fontSize="4xl" mb={5}>Create Blog</Center>
          <Flex justify="center" gap={10} px={{ base: 5, md: 10 }}>
            <Stack
              bg='gray.100'
              rounded="md"
              py={{ base: 4, md: 8 }}
              px={5}
              spacing={6}
              h="fit-content"
              w={{ base: "100%", md: "fit-content" }}
              position={{ base: "fixed", md: "sticky" }}
              top={{ base: "auto", md: 30 }}
              bottom={{ base: 0, md: "auto" }}
              direction={{ base: "row", md: "column" }}
              justify="center"
              lineHeight={1}
            >
              <Text fontSize="2xl" display="flex" justifyContent="center" cursor="pointer" fontWeight="bold" onClick={handleBold}>B</Text>
              <Text fontSize="2xl" display="flex" justifyContent="center" cursor="pointer" fontStyle="italic" mr={1} onClick={handleItalic}>i</Text>
              <Text fontSize="2xl" display="flex" justifyContent="center" cursor="pointer" onClick={handleUppercase}>T</Text>
              <Text fontSize="2xl" display="flex" justifyContent="center" cursor="pointer" size="sm" onClick={handleLowercase}>t</Text>
              <Text fontSize="2xl" display="flex" justifyContent="center" cursor="pointer" borderBottom="1px solid #000" onClick={handleUnderline}>U</Text>
              <Text fontSize="2xl" display="flex" justifyContent="center" cursor="pointer" px={1} background="linear-gradient(transparent 50%, yellow 50%)" onClick={handleMarker}>A</Text>
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
                      <Flex {...getRootProps()} bg='gray.200' height={100} cursor="pointer" justify="center">
                        <input
                          {...getInputProps()}
                        />
                        {selectedImage ? (
                          <Text my="auto">{selectedImage.name}</Text>
                        ) : (
                          <Text my="auto">ここにファイルをドラッグ＆ドロップするか、クリックしてファイルを選択してください。</Text>
                        )}
                      </Flex>
                    )}
                  </Dropzone>
                </Box>
                <Box rounded="md" p={3} mt={4} bgColor="teal.100">
                  <Flex justifyContent="space-between">
                    <Box>
                      <Text fontSize="xs" fontWeight="bold" mb={1}>新しいカテゴリーを登録</Text>
                      <Input
                        bg="white"
                        placeholder="新しいカテゴリーを追加"
                        size="sm"
                        type="text"
                        {...register("category")}
                      />
                    </Box>
                    {categories.length > 0 && (
                      <Box w={300}>
                        <Text fontSize="xs" fontWeight="bold" mb={1}>登録済カテゴリーを選択</Text>
                        <Select
                          bg="white"
                          size="sm"
                          placeholder="カテゴリーを選択してください"
                          {...register("category_id")}
                          disabled={!isCategorySelected} // 新しいカテゴリーが入力されたらSelectを無効化
                        >
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </Select>
                      </Box>
                    )}
                  </Flex>
                </Box>
                <Box rounded="md" p={5} mt={4} bgColor="yellow.200">
                  {editorEnable && (
                    <Box bg='white' p={2} h={200}>
                      <DraftEditor placeholder="ここに内容を入力してください" editorKey="editor-key" editorState={editorState} customStyleMap={styleMap} onChange={setEditorState} />
                    </Box>
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
        </Box >
      </AuthGuard>
    </AuthProvider>
  )
}

export default AddPage;
