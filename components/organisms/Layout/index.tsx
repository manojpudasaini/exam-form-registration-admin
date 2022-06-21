import { Flex, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Header from "../../molecules/Header";
import Sidebar from "../../molecules/SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex w={"full"}>
      <Sidebar />
      <VStack w="full" align={"stretch"}>
        <Header />
        <div style={{ padding: "0 8px 0 8px" }}>{children}</div>
      </VStack>
    </Flex>
  );
};

export default Layout;
