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
  }, []);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "all" });
  const submitHandler = (values: any) => {
    const sub = new Object(values);
    console.log(values, "checked subjects");
    console.log(sub, "sub>>>>>>>>>>>>.....");
  };
  return (
    <div>
      <Box>
        <Heading my="2">Regular Courses</Heading>
        {/* <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Ongoing Subjects</Th>
                <Th>Code</Th>
                <Th>Credits</Th>
              </Tr>
            </Thead>
            <Tbody>
              {subjects?.length > 0 &&
                subjects?.map((sub: any, key: any) => (
                  <Tr key={key}>
                    <Td>{sub?.name}</Td>
                    <Td>{sub?.code}</Td>
                    <Td isNumeric>{sub?.credits}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer> */}
        <form onSubmit={handleSubmit(submitHandler)}>
          <VStack>
            {subjects?.map((sub: any, key: any) => (
              <FormControl key={key}>
                <Checkbox value={sub?.code} {...register(`${sub}`)}>
                  {sub?.name}
                </Checkbox>
              </FormControl>
            ))}
          </VStack>
          <Button type="submit">submit</Button>
        </form>
      </Box>
    </div>
  );
};

export default SubjectSelection;
