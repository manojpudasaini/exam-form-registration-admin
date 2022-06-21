import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const Sidebar = () => {
  return (
    <Flex
      width={"sm"}
      bg={"gray.50"}
      shadow={"sm"}
      h={"auto"}
      px={4}
      py={2}
      align={"start"}
      justify={"space-evenly"}
    >
      <Flex borderBottom={"2px"} borderColor="white" w={"full"} pb={2}>
        <Flex flexShrink={0} align="center">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            objectFit="contain"
            alt="EEC-logo"
          />
        </Flex>
        <Heading
          pl={{ base: "4", md: "8" }}
          pt={4}
          lineHeight={1.6}
          color={"blue.500"}
          letterSpacing={"wide"}
        >
          EEMC
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
