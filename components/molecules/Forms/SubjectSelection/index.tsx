import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../../../utils/api";
import { useFormData } from "../../../../utils/FormContext";
// import { subjectWithCredits } from "../../../../utils/subject";

const SubjectSelection = () => {
  const [disabledCheck, setDisabledCheck] = useState(false);
  const [subupto, setSubupto] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [regular, setRegular] = useState<any>([]);
  const [back, setBack] = useState<any>([]);
  const [subjectWithCredits, setSubjectWithCredits] = useState<any>();
  const { data, setFormValues } = useFormData();
  const [totalCredit, setTotalCredit] = useState(0);
  const [codeName, setCodeName] = useState<any>();
  const GetSubjectsUptoCurrentSem = async () => {
    const response: any = await API.get("/subject/getuptosem/" + data.semester);
    const subject: any = await API.get(
      `/subject/getcurrentsem/${data.semester} `
    );
    setSubupto(response?.data);
    setSubjects(subject?.data);
  };
  const getCodeCredits = async () => {
    const response: any = await API.get("/subject/getcodecredit");
    setSubjectWithCredits(response);
  };

  const getCodeName = async () => {
    const response: any = await API.get("/subject/getbycode");
    setCodeName(response);
  };
  const giveMeCredit = (subject: any) => {
    const credit = subjectWithCredits?.find(
      (item: any) => item.code == subject
    )?.credits;
    return credit;
  };
  const reducer = (accumulator: any, curr: any) => accumulator + curr;
  const countCredits = () => {
    let finalCredit = [];
    let finalSubjects = regular.concat(back);
    if (finalSubjects?.length > 0) {
      finalCredit = finalSubjects.map((item: any) => giveMeCredit(item));
    }

    if (finalCredit.length > 0) {
      setTotalCredit(finalCredit.reduce(reducer));
    }
  };

  useEffect(() => {
    GetSubjectsUptoCurrentSem();
    getCodeCredits();
    getCodeName();
  }, []);

  const getMeName = (subject: any) => {
    const name = codeName?.find((item: any) => item.code == subject);
    return name;
  };
  const List = () => {
    let regList = [];
    let backList = [];
    if (regular?.length > 0) {
      regList = regular?.map((item: any) => ({
        ...getMeName(item),
        remarks: "regular",
      }));
    }
    if (back?.length > 0) {
      backList = back?.map((item: any) => ({
        ...getMeName(item),
        remarks: "re-registered",
      }));
    }
    console.log("finalList>>>.", regList, backList);
    setFormValues({ regular: regList, back: backList });
  };

  const submitHandler = async () => {
    try {
      var today = new Date().toLocaleDateString("en-us");
      setFormValues({ date: today });
      await List();
      const response: any = await API.post("/form/create-form", data);
      console.log(response, "response");
    } catch (e) {
      console.log(e);
    }
    // countCredits();
  };
  console.log(regular, "regular>>>");
  console.log(back, "back>>>");
  console.log(totalCredit, "totalCredits>>>");
  useEffect(() => {
    countCredits();
  }, [regular, back]);
  return (
    <Box w="full" position={"relative"}>
      <Flex
        shadow={"md"}
        zIndex={"2"}
        position={{ lg: "fixed" }}
        bg={totalCredit <= 24 ? "green.400" : "red.500"}
        rounded="xl"
        right="10"
        top={{ base: "20", sm: "160" }}
        align="center"
        justify={"center"}
        p="2"
      >
        <VStack>
          <Text color="white">Total Credits</Text>
          <Divider />
          <Heading color="white">{totalCredit}</Heading>
        </VStack>
      </Flex>
      <Heading my="2">Regular Courses</Heading>
      <VStack align="start" gap={4} my={6}>
        <TableContainer w="full">
          <Table>
            <Thead>
              <Tr>
                <Th>Subject</Th>
                <Th>Code</Th>
                <Th isNumeric>Credits</Th>
                <Th>Barrier Subject</Th>
                <Th>Concurrent Subject</Th>
              </Tr>
            </Thead>

            <Tbody>
              <CheckboxGroup
                onChange={(data: any) => setRegular(data)}
                defaultValue={data?.regular}
              >
                {subjects?.map((sub: any, key: any) => (
                  <Tr key={key}>
                    <Td>
                      <Checkbox
                        key={key}
                        value={sub?.code}
                        size="lg"
                        disabled={disabledCheck}
                      >
                        <Text fontSize={"sm"} px="2">
                          {sub?.name}
                        </Text>
                      </Checkbox>
                    </Td>
                    <Td fontSize={"sm"}>
                      <Tag colorScheme="cyan">{sub?.code}</Tag>
                    </Td>
                    <Td>
                      <Flex
                        boxSize="4"
                        justify={"center"}
                        align="center"
                        rounded={"full"}
                        p="3"
                        color="white"
                        backgroundColor={"blue.400"}
                      >
                        <Text fontWeight={"semibold"}>{sub?.credits}</Text>
                      </Flex>
                    </Td>
                    <Td fontSize={"sm"}>
                      {sub?.barrier && (
                        <Tag colorScheme={"red"}>{sub?.barrier}</Tag>
                      )}
                    </Td>
                    <Td fontSize={"sm"}>
                      {sub?.concurrent && (
                        <Tag colorScheme={"yellow"}>{sub?.concurrent}</Tag>
                      )}
                    </Td>
                  </Tr>
                ))}
              </CheckboxGroup>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
      <Divider w="full" />
      <Heading mt={6}>Re-registered Courses</Heading>
      <VStack align="start" gap={4} my={6}>
        <TableContainer w="full">
          <Table>
            <Thead>
              <Tr>
                <Th>Subject</Th>
                <Th>Code</Th>
                <Th isNumeric>Credits</Th>
                <Th>Barrier Subject</Th>
                <Th>Concurrent Subject</Th>
              </Tr>
            </Thead>

            <Tbody>
              <CheckboxGroup
                onChange={(data: any) => setBack(data)}
                defaultValue={data?.back}
              >
                {subupto?.map((sub: any, key: any) => (
                  <Tr key={key}>
                    <Td>
                      <Checkbox
                        key={key}
                        value={sub?.code}
                        size="lg"
                        isDisabled={disabledCheck}
                      >
                        <Text fontSize={"sm"} px="2">
                          {sub?.name}
                        </Text>
                      </Checkbox>
                    </Td>
                    <Td fontSize={"sm"}>
                      <Tag colorScheme="cyan">{sub?.code}</Tag>
                    </Td>
                    <Td>
                      <Flex
                        boxSize="4"
                        justify={"center"}
                        align="center"
                        rounded={"full"}
                        p="3"
                        color="white"
                        backgroundColor={"blue.400"}
                      >
                        <Text fontWeight={"semibold"}>{sub?.credits}</Text>
                      </Flex>
                    </Td>
                    <Td fontSize={"sm"}>
                      {sub?.barrier && (
                        <Tag colorScheme={"red"}>{sub?.barrier}</Tag>
                      )}
                    </Td>
                    <Td fontSize={"sm"}>
                      {sub?.concurrent && (
                        <Tag colorScheme={"yellow"}>{sub?.concurrent}</Tag>
                      )}
                    </Td>
                  </Tr>
                ))}
              </CheckboxGroup>
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>

      <Button
        disabled={totalCredit > 24}
        colorScheme={"blue"}
        size="lg"
        width="300px"
        onClick={submitHandler}
      >
        submit
      </Button>
    </Box>
  );
};

export default SubjectSelection;
