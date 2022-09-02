import {
  Box,
  Flex,
  VStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Tag,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import AvatarCard from "../components/molecules/AvatarCard";
import { API } from "../utils/api";
import { AuthContext } from "../utils/AuthContext";
import PrivateRoute from "../withPrivateRoute";

const Home: NextPage = () => {
  const { user } = useContext(AuthContext);
  const [fetchUser, setFetchUser] = useState<any>();
  const [subject, setSubjects] = useState<any>();
  const fetchUserFromDB = async () => {
    await API.get(
      `http://localhost:5000/api/v1/student/getByfirebase/` + user?.uid
    ).then((res) => {
      console.log(res, ">>>>>>>>>>>>response after fetch in index");
      setFetchUser(res);
    });
  };
  const fetchSubjects = async () => {
    await API.get("http://localhost:5000/api/v1/subject/getall").then((res) => {
      console.log(res, "fetched subject<<<<<<<");
      setSubjects(res?.data);
    });
  };
  useEffect(() => {
    fetchUserFromDB();
    fetchSubjects();
  }, []);
  return (
    <Box width={"full"}>
      <Head>
        <title>Exam Form Registration 🔥</title>
        <meta
          name="description"
          content="exam form registration for Everest Engineering College"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack
        align={"center"}
        mx="auto"
        p="2"
        width="full"
        justifyContent={"center"}
        spacing="4"
      >
        <AvatarCard
          name={fetchUser?.name}
          image={fetchUser?.photo}
          email={fetchUser?.email}
          phone={fetchUser?.phone}
          program={fetchUser?.program}
        />
        <Flex w="full">
          <Accordion
            allowToggle
            width="full"
            bg="blue.50"
            shadow="sm"
            rounded="md"
          >
            <AccordionItem>
              <h2>
                <AccordionButton gap="4">
                  <Box
                    flex="1"
                    textAlign="left"
                    color="gray.600"
                    fontWeight={"semibold"}
                  >
                    Click here to see the courses
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <TableContainer
                  border="1px"
                  borderColor={"gray.200"}
                  p="1"
                  w="full"
                >
                  <Table size="sm" colorScheme={"blue"} variant="simple">
                    <TableCaption placement="top">
                      Course Syllabus for BEIT
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Code</Th>
                        <Th>Name</Th>
                        <Th>Semester</Th>
                        <Th>Credits</Th>
                        <Th>Barrier</Th>
                        <Th>Concurrent</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {subject?.length > 0 &&
                        subject?.map((sub: any, key: any) => (
                          <Tr key={key}>
                            <Td>{sub.code}</Td>
                            <Td>{sub.name}</Td>
                            <Td isNumeric>{sub.semester}</Td>
                            <Td isNumeric>{sub.credits}</Td>
                            <Td>{sub?.barriers?.barrier}</Td>
                            <Td>{sub?.concurrents?.concurrent}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
        <Flex
          bg="blue.50"
          w={{ base: "full", md: "500px" }}
          rounded="lg"
          align="center"
          justify={"center"}
          direction="column"
          gap="4"
          p="10"
          shadow={"md"}
        >
          <Text fontSize={"lg"} fontWeight="semibold" color="gray.600">
            University Exam Form Registration Status:
          </Text>
          <Tag variant="solid" colorScheme={"green"} size="lg">
            Currently Open
          </Tag>
        </Flex>
      </VStack>
    </Box>
  );
};

export default PrivateRoute(Home);
