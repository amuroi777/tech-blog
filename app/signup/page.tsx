	"use client"

import { Box, Text, Flex, Heading, Button, Input, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon, Alert, AlertIcon } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useState } from 'react';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from "firebase/auth";
import {useRouter} from 'next/navigation'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSignUpSuccessMessage, setIsSignUpMessage] = useState(false);
  const router = useRouter();

  //パスワードのバリデーション
  const validatePassword = (password: string): boolean => {
    const hasMinLength = password.length >= 5;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar =/[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasMinLength && hasNumber && hasSpecialChar;
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements as typeof event.currentTarget.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    const nameValue = formElements.name.value;
    const emailValue = formElements.email.value;
    const passwordValue = formElements.password.value;

    //バリデーションチェック
    if (!validatePassword(passwordValue)) {
      setError("パスワードは5文字以上で、数字と記号を含む必要があります");
      setIsSignUpMessage(false);
      return;
    }

    try{
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );

      //登録後にユーザープロファイルを更新
      await updateProfile(userCredential.user,{
        displayName: nameValue,
      })

      console.log("会員登録が成功しました:", userCredential.user);
      setIsSignUpMessage(true);
      setError(null);
      router.push('./signin');//登録が成功するとログインページへ遷移
    } catch (error) {
      console.log("Error creating user:", error);
      setError("会員登録に失敗しました");
      setIsSignUpMessage(false);
    }
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" rounded={6} padding={[6, 0, 0, 12]} w={["90%", "80%", "60%", "40%"]}>
        <Box>
          <Box display={{ base: "block", md: "none" }} mb={50} fontWeight="bold">
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <Flex align="center">
                    <Icon as={ChevronLeftIcon} boxSize={6} />
                    Home
                  </Flex>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>
          <Heading mb={2} textAlign="center" fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            Sign Up
          </Heading>
          <Box height="4px" backgroundColor="black" margin="0 auto" mt={1} width={{ base: "30px", sm: "40px", md: "50px", lg: "60px" }} />
        </Box>

        {isSignUpSuccessMessage && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            会員登録が成功しました
            </Alert>
        )}

        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
             )}

        <Text mb={3} fontSize={["sm", "md", "lg", "xl"]}>
          Name
        </Text>
        <form onSubmit={handleSubmit}>
        <Input 
          name="name"
          type="name"
          placeholder="Enter your name"
          variant="filled"
          mb={5} rounded={13}
          borderColor="black.100"
          background="gray.200"
          width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }} 
          />

        <Text mb={3} fontSize={["sm", "md", "lg", "xl"]}>
          Email
        </Text>
        <Input
          name="email" 
          type="email"
          placeholder="Enter your email" 
          onChange={handleChangeEmail}
          variant="filled"
          mb={5}
          rounded={13}
          borderColor="black.100"
          background="gray.200"
          width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
          />
          
        <Text mb={3} fontSize={["sm", "md", "lg", "xl"]}>
          Password
        </Text>
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChangePassword}
          variant="filled"
          mb={0}
          rounded={13}
          borderColor="black.100"
          background="gray.200" 
          width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
          />

        <Flex justifyContent="center">
          <Button
            type="submit"
            mb={6}
            rounded="60px"
            padding="35px"
            mt="50px"
            bg={{ base: "blue.400", md: "blue.300" }}
            width={{ base: "60%", sm: "60%", md: "60%", lg: "40%" }}
            fontSize={{ base: "xl", md: "2xl", lg: "2xl" }}
            color={{ base: "black", sm: "white" }}>
            Sign Up
          </Button>
        </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default SignUp;

