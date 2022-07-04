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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../utils/AuthContext";
import Sidebar from "../SideBar";
import { auth } from "../../../utils/firebase-config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { API } from "../../../utils/api";

const Header = () => {
  const { setUser } = useContext(AuthContext);
  const { onClose, isOpen, onOpen } = useDisclosure();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  console.log(user, "user in header");
  const [fetchUser, setFetchUser] = useState<any>();
  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        console.log("signout success");
        setUser(null);
        router.push("/login");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };
  const fetchUserFromDB = async () => {
    await API.get(
      `http://localhost:5000/api/v1/student/getByfirebase/` + user?.uid
    ).then((res) => {
      console.log(res, ">>>>>>>>>>>>response after fetch");
      setFetchUser(res);
    });
  };
  useEffect(() => {
    fetchUserFromDB();
  }, []);
  console.log(fetchUser, "fetcheduser >>>>>>>>>>>>>...");
  return (
    <Flex
      bg={"blue.50"}
      height={"12vh"}
      w={"full"}
      borderLeft={"2px"}
      borderColor={"white"}
      shadow="md"
      align={"center"}
      px={2}
      py={10}
      justify={"space-between"}
    >
      <Box display={{ base: "block", lg: "none" }} px={2}>
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
      <Flex align="center" gap={2}>
        <Flex flexShrink={0} cursor="pointer">
          <Image
            src="/logo.png"
            width={100}
            height={70}
            objectFit="contain"
            alt="EEC-logo"
            onClick={() => router.push("/")}
          />
        </Flex>
        {/* <Heading
          lineHeight={1.6}
          color={"blue.500"}
          letterSpacing={"wide"}
          display={{ base: "none", md: "flex" }}
        >
          EEC
        </Heading> */}
        <Heading
          display={{ base: "none", md: "flex" }}
          fontSize={{ base: "xl", md: "3xl" }}
          textAlign={{ base: "start", md: "center" }}
          lineHeight={1.6}
          color={"blue.500"}
        >
          Examination Form Registration
        </Heading>
      </Flex>

      <Box>
        <Menu>
          <MenuButton
            p="2"
            shadow={"sm"}
            rounded={"lg"}
            _hover={{
              shadow: "md",
            }}
            _active={{
              bg: "blue.100",
            }}
          >
            <HStack>
              <Box>
                <Avatar
                  src={fetchUser?.photo}
                  name={fetchUser?.name}
                  size={{ base: "xs", md: "sm" }}
                />
              </Box>
              <Text>{fetchUser?.name}</Text>
            </HStack>
          </MenuButton>
          <MenuList p="1" rounded="md">
            <MenuItem
              onClick={handleSignOut}
              rounded="lg"
              _hover={{
                bg: "blue.400",
                color: "white",
              }}
            >
              logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Header;
