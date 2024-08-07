import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Link, Button, Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, Image, Text } from "@chakra-ui/react";
import { HamburgerIcon, EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const HeaderProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target instanceof Element) || !event.target.closest("#user-menu")) {
      setShowUserMenu(false);
    }
  };

  useEffect(() => {
    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

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
            <Button mb={12} rounded="60px" padding="18px" mt="50px" bg={{ base: "blue.400", md: "blackAlpha.800" }} width="60%" fontSize={{ base: "md", md: "md", lg: "md" }} color={{ base: "black", sm: "white" }}>
              <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
                <EditIcon mr={2} />
                Create
              </Link>
            </Button>
          </HStack>
          <Image src="/user-icon.png" alt="User Icon" mr="35px" display={{ base: "none", md: "block" }} boxSize="50px" borderRadius="full" cursor="pointer" onClick={handleUserMenuToggle} />

          {showUserMenu && (
            <Box position="absolute" top="70px" right="20px" bg="gray.400" p={4} borderRadius="md" shadow="md">
              <Text mb={2} color="#000">
                User name
              </Text>
              <Button bg="red.400" size="sm" rounded="60px" padding="15px">
                Log out
              </Button>
            </Box>
          )}

          <Button mb={12} rounded="60px" padding="5px" mt="50px" bg="blackAlpha.800" width={{ base: "60%", sm: "60%", md: "60%", lg: "40%" }} fontSize={{ base: "md", md: "md", lg: "md" }} color="#fff" display={{ base: "block", md: "none" }}>
            <Link px={2} py={1} rounded="md" _hover={{ textDecoration: "none" }} href="#">
              <EditIcon mr={2} />
              Create
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
                <Button mt="75px" pl="25px" rounded="60px" padding="5px" border="1px solid" bg="none" borderColor="#000" width="50%" fontSize="sm" display={{ base: "block", md: "none" }}>
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

export default HeaderProfile;
