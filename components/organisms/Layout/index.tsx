import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Header from "../../molecules/Header";
import Sidebar from "../../molecules/SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <VStack w={"full"} spacing={0}>
      <Header />

      <HStack w={"full"} align={"stretch"}>
        <Flex w={"sm"} display={{ base: "none", md: "flex" }}>
          <Sidebar />
        </Flex>

        <div style={{ width: "100%", padding: "0 8px 0 8px" }}>{children}</div>
      </HStack>
    </VStack>
  );
};

export default Layout;
