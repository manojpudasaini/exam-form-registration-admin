import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../../../utils/api";
import { useFormData } from "../../../../utils/FormContext";
// import { subjectWithCredits } from "../../../../utils/subject";

const SubjectSelection = () => {
  const [subupto, setSubupto] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [regular, setRegular] = useState<any>([]);
  const [back, setBack] = useState<any>([]);
  const [subjectWithCredits, setSubjectWithCredits] = useState<any>();
  const { data } = useFormData();
  const GetSubjectsUptoCurrentSem = async () => {
    const response: any = await API.get(
      "http://localhost:5000/api/v1/subject/getuptosem/" + data.semester
    );
    const subject: any = await API.get(
      "http://localhost:5000/api/v1/subject/getbysem/" + data.semester
    );
    setSubupto(response?.data);
    setSubjects(subject?.data);
  };
  const getCodeCredits = async () => {
    const response: any = await API.get(
      "http://localhost:5000/api/v1/subject/getcodecredit"
    );
    setSubjectWithCredits(response);
  };
  console.log(subupto, "sub upto now");
  console.log(subjects, "sub>>>>...");
  console.log(data, "daata from context>>>>>>>>>>>...");
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

    console.log(finalCredit.reduce(reducer), "finalCredit>>>>>>>>>");
  };

  useEffect(() => {
    GetSubjectsUptoCurrentSem();
    getCodeCredits();
  }, []);

  const submitHandler = () => {
    countCredits();
    console.log(giveMeCredit("CMP 115"), "cred>>>");
  };
  console.log(regular, "regular");
  console.log(back, "back>>>");
  return (
    <Box w="full">
      <Heading my="2">Regular Courses</Heading>
      <VStack align="start" gap={4} my={6}>
        <CheckboxGroup onChange={(data: any) => setRegular(data)}>
          {subjects?.map((sub: any, key: any) => (
            <Checkbox key={key} value={sub?.code} size="lg">
              {sub?.name}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </VStack>
      <Divider w="full" />
      <Heading mt={6}>Re-registered Courses</Heading>
      <VStack align="start" gap={4} my={6}>
        <CheckboxGroup onChange={(data: any) => setBack(data)}>
          {subupto?.map((sub: any, key: any) => (
            <Checkbox key={key} value={sub?.code} size="lg">
              {sub?.name}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </VStack>

      <Button
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
