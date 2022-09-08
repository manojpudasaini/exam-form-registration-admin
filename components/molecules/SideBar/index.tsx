import { Flex } from "@chakra-ui/react";

import React from "react";
import { IconType } from "react-icons";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from "react-icons/fi";
import NavItem from "../NavItem";
interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", link: "/", icon: FiHome },
  {
    name: "Apply for Examination",
    link: "/apply",
    icon: FiTrendingUp,
  },
  // { name: "", icon: FiCompass },
  // { name: "Favourites", icon: FiStar },
  // { name: "Settings", icon: FiSettings },
];
const Sidebar = () => {
  return (
    <Flex
      width={"full"}
      bg={"gray.50"}
      shadow={"sm"}
      height={"88vh"}
      minHeight={"100%"}
      px={4}
      py={2}
      align={"start"}
      justify={"space-evenly"}
    >
      <Flex
        borderBottom={"2px"}
        borderColor="white"
        w={"full"}
        pb={2}
        direction={"column"}
      >
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            link={link.link}
            fontWeight="semibold"
            color="blue.500"
          >
            {link.name}
          </NavItem>
        ))}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
