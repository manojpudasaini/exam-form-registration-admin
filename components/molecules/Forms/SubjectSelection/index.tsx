import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API } from "../../../../utils/api";
import { useFormData } from "../../../../utils/FormContext";

const SubjectSelection = () => {
  const [subupto, setSubupto] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [regular, setRegular] = useState<any>([]);
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
  console.log(subupto, "sub upto now");
  console.log(subjects, "sub>>>>...");
  console.log(data, "daata from context>>>>>>>>>>>...");

  useEffect(() => {
    GetSubjectsUptoCurrentSem();
    getSubjectCredit();
  }, [regular]);

  const submitHandler = () => {};
  console.log(regular, "regular");
  let credit = 0;
  const getSubjectCredit = async () => {
    regular?.map((sub: any) =>
      API.get("http://localhost:5000/api/v1/subject/getByCode/" + sub).then(
        (credit = credit + sub.credits)
      )
    );
  };
  console.log(credit, "credit>>>");
  return (
    <div>
      <Box>
        <Heading my="2">Regular Courses</Heading>

        <VStack>
          <CheckboxGroup onChange={(data: any) => setRegular(data)}>
            {subjects?.map((sub: any, key: any) => (
              <Checkbox key={key} value={sub?.code}>
                {sub?.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </VStack>
        <Button onClick={submitHandler}>submit</Button>
      </Box>
    </div>
  );
};

export default SubjectSelection;
