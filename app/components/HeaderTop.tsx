import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Link, Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Image, Text, useToast } from "@chakra-ui/react";
import { HamburgerIcon, EditIcon } from "@chakra-ui/icons";
import { storage } from "@/firebase";
import { getAuth, signOut } from "firebase/auth";
import { AuthProvider, useAuthContext } from "../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { CustomModal } from "./ProfileModal";

const HeaderTop = () => {
  const menuDisclosure = useDisclosure();
  const profileImageDisclosure = useDisclosure();
  const authContext = useAuthContext();
  const router = useRouter();
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isAddPage, setIsAddPage] = useState(false);
  const [uploadImageUrl, setUploadImageUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();

  const handlePublish = () => {
    router.push("/add?publish=true"); // クエリパラメータで 'publish' を設定
  };

  // 現在いるページのパスを取得
  const pathname = usePathname();

  // 現在ログインしているユーザーを取得する
  const currentUser = authContext ? authContext.user : null;
  console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [currentUser]);

  // ページ遷移時に/addページかどうか監視
  useEffect(() => {
    setIsAddPage(pathname === "/add");
  }, [pathname]);

  const logout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        setLogoutSuccess(true);
        setLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectFile = event.target.files?.[0] || null;
    setFile(selectFile);
  };

  useEffect(() => {
    const storageImageUrl = localStorage.getItem("userIconUrl");
    if (storageImageUrl) {
      setUploadImageUrl(storageImageUrl);
    }
  }, []);

  const handleFileUpload = (url: string) => {
    setUploadImageUrl(url);
    localStorage.setItem("userIconUrl", url);
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file",
        status: "error",
      });
      return;
    }

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadImageUrl(downloadURL);
          localStorage.setItem("userIconUrl", downloadURL); // urlを保存
          toast({
            title: "アップロード成功",
            description: "画像が正常にアップロードされました",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        });
      }
    );
  };

  return (
    <Box bg="gray.300" px={4}>
      <Flex h={20} alignItems="center" pl="20px" justifyContent="space-between">
        <Box fontSize="4xl" fontWeight="bold" color="blackAlpha.400" onClick={() => router.push("/")} cursor="pointer">
          Logo
        </Box>
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
            <Button mb={12} rounded="60px" padding="18px" mt="50px" bg={{ base: "blue.400", md: "blackAlpha.800" }} width={{ base: "60%", sm: "60%", md: "60%", lg: "40%" }} fontSize={{ base: "md", md: "md", lg: "md" }} color={{ base: "black", sm: "white" }} onClick={() => router.push("/")}>
              <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
                Home
              </Link>
            </Button>

            <Button
              mb={12}
              rounded="60px"
              padding="18px"
              mt="50px"
              bg={isAddPage ? "blue.400" : "blackAlpha.800"}
              width="60%"
              fontSize={{ base: "md", md: "md", lg: "md" }}
              color={isAddPage ? "#000" : "#fff"}
              onClick={() => {
                if (isAddPage) {
                  handlePublish();
                } else {
                  router.push("/add");
                }
              }}
            >
              <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
                {isAddPage ? null : <EditIcon mr={2} />}
                {isAddPage ? "Publish" : "Create"}
              </Link>
            </Button>

            {loggedIn ? (
              <>
                <IconButton aria-label="User Icon" mr={5} icon={<Image src={uploadImageUrl || "/user-icon.png"} alt="user-icon" width="120px" height="60px" objectFit="cover" borderRadius="full" />} onClick={() => setShowUserMenu(!showUserMenu)} bg="none" border="none" _hover={{ bg: "none" }} />
                {showUserMenu && (
                  <Box position="absolute" top="70px" right="20px" bg="gray.400" zIndex={1500} p={4} borderRadius="md" shadow="md">
                    <Flex direction="column" align="center">
                      <Text mb={4} color="#000">
                        {currentUser?.displayName || "User name"} {/* ユーザー名を表示 */}
                      </Text>
                      <Button bg="blue.400" size="sm" rounded="60px" padding="15px" mb={4} onClick={() => router.push("/profile")}>
                        Profile
                      </Button>

                      <Button bg="blue.400" size="sm" rounded="60px" padding="15px" mb={4} onClick={profileImageDisclosure.onOpen}>
                        Profile画像を編集
                      </Button>
                      <CustomModal isOpen={profileImageDisclosure.isOpen} onClose={profileImageDisclosure.onClose} onUpload={handleFileUpload} />

                      <Button bg="red.400" size="sm" rounded="60px" padding="15px" onClick={logout}>
                        Log out
                      </Button>
                    </Flex>
                  </Box>
                )}
              </>
            ) : (
              <Button mb={12} rounded="60px" padding="18px" mt="50px" bg="none" border="1px solid" borderColor="#000" width={{ base: "60%", sm: "60%", md: "60%", lg: "40%" }} fontSize={{ base: "md", md: "md", lg: "md" }} color={{ base: "black", sm: "#000" }}>
                <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="/signin">
                  Sign In
                </Link>
              </Button>
            )}
          </HStack>

          <Button
            mb={12}
            rounded="60px"
            padding="5px"
            mt="50px"
            bg={isAddPage ? "blue.400" : "blackAlpha.800"}
            width={{ base: "60%", sm: "60%", md: "60%", lg: "40%" }}
            fontSize={{ base: "md", md: "md", lg: "md" }}
            color="#fff"
            display={{ base: "block", md: "none" }}
            onClick={() => {
              if (isAddPage) {
                handlePublish();
              } else {
                router.push("/add");
              }
            }}
          >
            <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
              {isAddPage ? null : <EditIcon mr={2} />}
              {isAddPage ? "Publish" : "Create"}
            </Link>
          </Button>
          <IconButton size="lg" bg="none" color="#000" icon={<HamburgerIcon boxSize={8} />} aria-label="Open Menu" display={{ md: "none" }} onClick={menuDisclosure.onOpen} />
        </HStack>
      </Flex>

      <Drawer placement="right" onClose={menuDisclosure.onClose} isOpen={menuDisclosure.isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody bg="gray.300">
              <Stack as="nav" spacing={4} alignItems="center">
                {loggedIn ? (
                  <>
                    <IconButton aria-label="User Icon" mt="45px" icon={<Image src={uploadImageUrl || "/user-icon.png"} alt="user-icon" width="90px" height="90px" objectFit="cover" borderRadius="full" />} />
                    <Button mt="35px" pl="25px" rounded="60px" padding="5px" border="1px solid" borderColor="#000" bg="none" width="50%" fontSize="sm" display={{ base: "block", md: "none" }} onClick={() => router.push(`/profile`)}>
                      <Text color="#000">Profile</Text>
                    </Button>
                    <Button mt="15px" pl="25px" rounded="60px" padding="5px" border="1px solid" borderColor="#000" bg="none" width="50%" fontSize="sm" display={{ base: "block", md: "none" }} onClick={profileImageDisclosure.onOpen}>
                      <Text color="#000">Profile画像編集</Text>
                    </Button>
                    <CustomModal isOpen={profileImageDisclosure.isOpen} onClose={profileImageDisclosure.onClose} onUpload={handleFileUpload} />
                    <Button mt="15px" pl="25px" rounded="60px" padding="5px" border="1px solid" borderColor="#000" bg="none" width="50%" fontSize="sm" display={{ base: "block", md: "none" }} onClick={logout}>
                      <Text color="#000">Log Out</Text>
                    </Button>
                  </>
                ) : (
                  <Button mt="75px" pl="25px" rounded="60px" padding="5px" border="1px solid" borderColor="#000" bg="none" width="50%" fontSize="sm" display={{ base: "block", md: "none" }} onClick={() => router.push("/signin")}>
                    <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
                      Sign In
                    </Link>
                  </Button>
                )}
                <Button mb={12} rounded="60px" padding="5px" mt="15px" bg="blackAlpha.800" width="50%" fontSize="sm" color="#fff" display={{ base: "block", md: "none" }} onClick={() => router.push("/")}>
                  <Link px={2} py={1} rounded="md" href="#">
                    Home
                  </Link>
                </Button>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default HeaderTop;
