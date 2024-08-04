import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Link, Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const HeaderWriteBlog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.300" px={4}>
      <Flex h={20} alignItems="center" pl="20px" justifyContent="space-between">
        <Box fontSize="4xl" fontWeight="bold" color="blackAlpha.400">
          Logo
        </Box>
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={8} display={{ base: "none", md: "flex" }}>
            <Button mb={12} rounded="60px" padding="18px" mt="50px" bg={{ base: "blue.400", md: "blackAlpha.800" }} width={{ base: "60%", sm: "60%", md: "60%", lg: "40%" }} fontSize={{ base: "md", md: "md", lg: "md" }} color={{ base: "black", sm: "white" }}>
              <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
                Home
              </Link>
            </Button>
            <Button mb={12} rounded="60px" padding="18px" mt="50px" bg="blue.400" width="60%" fontSize="md" color="#ooo">
              <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
                Publish
              </Link>
            </Button>
            <Button mb={12} rounded="60px" padding="18px" mt="50px" bg="none" border="1px solid" borderColor="#000" width={{ base: "60%", sm: "60%", md: "60%", lg: "40%" }} fontSize={{ base: "md", md: "md", lg: "md" }} color={{ base: "black", sm: "#000" }}>
              <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
                Sign In
              </Link>
            </Button>
          </HStack>

          <Button mb={12} rounded="60px" padding="5px" mt="50px" bg="blue.400" width={{ base: "60%", sm: "60%", md: "60%", lg: "40%" }} fontSize="md" color="#fff" display={{ base: "block", md: "none" }}>
            <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
              Publish
            </Link>
          </Button>
          <IconButton size="lg" bg="none" color="#000" icon={<HamburgerIcon boxSize={8} />} aria-label="Open Menu" display={{ md: "none" }} onClick={onOpen} />
        </HStack>
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody bg="gray.300">
              <Stack as="nav" spacing={4} alignItems="center">
                <Button mt="75px" pl="25px" rounded="60px" padding="5px" border="1px solid" borderColor="#000" bg="none" width="50%" fontSize="sm" display={{ base: "block", md: "none" }}>
                  <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
                    Sign In
                  </Link>
                </Button>
                <Button mb={12} rounded="60px" padding="5px" mt="15px" bg="blackAlpha.800" width="50%" fontSize="sm" color="#fff" display={{ base: "block", md: "none" }}>
                  <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
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

export default HeaderWriteBlog;
