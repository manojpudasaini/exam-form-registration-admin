import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "../../../utils/AuthContext";
import Sidebar from "../SideBar";
import { auth } from "../../../utils/firebase-config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const Header = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        console.log("signout success");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  return (
    <Flex
      bg={"gray.50"}
      height={"15vh"}
      w={"full"}
      borderLeft={"2px"}
      borderColor={"white"}
      shadow="sm"
      align={"center"}
      px={2}
      py={10}
      justify={"space-between"}
    >
      <Box display={{ base: "block", lg: "none" }}>
        <IconButton
          aria-label="show menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
        <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Examination form Registration
            </DrawerHeader>
            <DrawerBody>
              <Sidebar />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
      <Flex flexShrink={0} align="center" cursor={"pointer"}>
        <Image
          src="/logo.png"
          width={100}
          height={70}
          objectFit="contain"
          alt="EEC-logo"
          onClick={() => router.push("/")}
        />
        <Heading
          lineHeight={1.6}
          color={"blue.500"}
          letterSpacing={"wide"}
          display={{ base: "none", md: "flex" }}
        >
          EEC
        </Heading>
      </Flex>
      <Heading
        display={{ base: "none", md: "flex" }}
        fontSize={{ base: "xl", sm: "2xl" }}
        textAlign={{ base: "start", md: "center" }}
        lineHeight={1.6}
        color={"blue.500"}
      >
        Examination Form Registration
      </Heading>
      <Box>
        <Menu>
          <MenuButton
            p="2"
            shadow={"sm"}
            rounded={"lg"}
            _hover={{
              shadow: "md",
            }}
          >
            <HStack>
              <Avatar size={{ base: "xs", md: "sm" }} />
              <Text>{user?.email}</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleSignOut}>logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Header;
