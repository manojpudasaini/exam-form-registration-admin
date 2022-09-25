import { PhoneIcon } from "@chakra-ui/icons";
import { Avatar, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import React from "react";

interface AvatarCardProps {
  image?: any;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  program?: string;
}

const AvatarCard = ({
  image,
  firstName,
  middleName,
  lastName,
  phone,
  email,
  program,
}: AvatarCardProps) => {
  return (
    <Flex
      align="center"
      w="full"
      justify={"space-between"}
      direction={{ base: "column", md: "row" }}
      shadow="sm"
      p={4}
      rounded="md"
      bg="blue.50"
    >
      <Flex
        align="center"
        justify="center"
        gap={{ base: "4", md: "8" }}
        direction={{ base: "column", md: "row" }}
      >
        <Avatar size={{ base: "xl", md: "2xl" }} name={firstName} src={image} />
        <VStack
          align={{ base: "center", md: "start" }}
          spacing={{ base: "1", md: "2" }}
        >
          <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight={"semibold"}>
            {firstName} {middleName} {lastName}
          </Text>
          <Text color="gray.600">{email}</Text>
          <Text color="gray.600" fontWeight={"bold"}>
            {program}
          </Text>
        </VStack>
      </Flex>
      <Flex align="center" gap="2">
        <PhoneIcon color="blue.500" />
        <Text color="gray.600">{phone}</Text>
      </Flex>
    </Flex>
  );
};

export default AvatarCard;
