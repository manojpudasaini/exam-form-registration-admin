import { Center, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Flex direction={"column"} align="center" justify={"center"}>
      <Text color="gray.500" opacity={0.7} fontWeight={"semibold"}>
        &copy; EEC 2022
      </Text>
    </Flex>
  );
};

export default Footer;
