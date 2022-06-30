import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Footer from "../../molecules/Footer";
import Header from "../../molecules/Header";
import Sidebar from "../../molecules/SideBar";

interface LayoutProps {
  children: React.ReactNode;
  user?: any;
}

const Layout = ({ children, user }: LayoutProps) => {
  console.log(user, "layout user");
  return (
    <VStack w={"full"} spacing={1} position={"relative"} h={"100%"}>
      {user && <Header />}

      <HStack w={"full"} align={"stretch"}>
        {user && (
          <Flex w={"sm"} display={{ base: "none", lg: "flex" }}>
            <Sidebar />
          </Flex>
        )}

        <div style={{ width: "100%", padding: "0 8px 0 8px" }}>{children}</div>
      </HStack>
      {/* <Box position={"absolute"} bottom={0} w={"full"}>
        <Footer />
      </Box> */}
    </VStack>
  );
};

export default Layout;
