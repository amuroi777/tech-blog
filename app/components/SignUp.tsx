import { Box, Text, Flex, Heading, Button, Input, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const SignUp = () => {
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
            Sign In
          </Heading>
          <Box height="4px" backgroundColor="black" margin="0 auto" mt={1} width={{ base: "30px", sm: "40px", md: "50px", lg: "60px" }} />
        </Box>
        <Text mb={3} fontSize={["sm", "md", "lg", "xl"]}>
          Name
        </Text>
        <Input placeholder="Enter your name" variant="filled" mb={5} rounded={13} borderColor="black.100" background="gray.200" type="email" width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }} />
        <Text mb={3} fontSize={["sm", "md", "lg", "xl"]}>
          Email
        </Text>
        <Input placeholder="Enter your email" variant="filled" mb={5} rounded={13} borderColor="black.100" background="gray.200" type="email" width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }} />
        <Text mb={3} fontSize={["sm", "md", "lg", "xl"]}>
          Password
        </Text>
        <Input placeholder="Enter your password" variant="filled" mb={0} rounded={13} borderColor="black.100" background="gray.200" type="password" width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }} />
        <Flex justifyContent="center">
          <Button mb={6} rounded="60px" padding="35px" mt="50px" bg={{ base: "blue.400", md: "blue.300" }} width={{ base: "60%", sm: "60%", md: "60%", lg: "40%" }} fontSize={{ base: "xl", md: "2xl", lg: "2xl" }} color={{ base: "black", sm: "white" }}>
            Sign In
          </Button>
        </Flex>
        <Text textAlign="center" fontWeight="bold">
          Don't have an account ?
          <Box as="span" color="blue.300" fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}>
            Sign Up
          </Box>
        </Text>
      </Flex>
    </Flex>
  );
};

export default SignUp;
