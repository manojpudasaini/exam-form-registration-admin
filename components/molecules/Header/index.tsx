import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
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
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import Sidebar from "../SideBar";

const Header = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
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
      <Box display={{ base: "block", md: "none" }}>
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
      <Flex flexShrink={0} align="center">
        <Image
          src="/logo.png"
          width={100}
          height={70}
          objectFit="contain"
          alt="EEC-logo"
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
          <MenuButton as={Button} gap={2} rightIcon={<ChevronDownIcon />}>
            <Avatar size={{ base: "xs", md: "sm" }} variant={""} />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => console.log("logged out")}>
              logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Header;
