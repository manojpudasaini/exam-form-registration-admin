import { Center, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Center bg={"gray.50"} p={2}>
      <Text color={"gray.600"} fontWeight={"semibold"}>
        &#169; Everest Engineering College 2022{" "}
      </Text>
    </Center>
  );
};

export default Footer;
