import { Flex, Heading, Text } from "@chakra-ui/react";

import React from "react";

const Header = () => {
  return (
    <Flex
      bg={"gray.50"}
      height={"10vh"}
      w={"full"}
      borderLeft={"2px"}
      borderColor={"white"}
      shadow="sm"
      align={"center"}
    >
      <Heading fontSize={"2xl"} textAlign="center" px={2}>
        Examination Form Registration
      </Heading>
    </Flex>
  );
};

export default Header;
