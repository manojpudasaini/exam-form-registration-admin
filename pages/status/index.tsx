import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Tag,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from "../../utils/api";
import { useFormData } from "../../utils/FormContext";
import PrivateRoute from "../../withPrivateRoute";
const Status = () => {
  const [status, setStatus] = useState<any>();
  const { data, setFormValues } = useFormData();
  const toast = useToast();
  const schema = yup.object().shape({
    semester: yup.string().required("required"),
    year: yup.number().required("required").typeError("invalid"),
    status: yup.boolean().required("required"),
  });
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const submitHandler = async (data: any) => {
    console.log(data);
    await setFormValues(data);
    try {
      const response: any = await API.put("/status/1", data);
      toast({
        status: "success",
        title: "Updated successfully",
      });
      fetchStatus();
    } catch (error) {
      toast({
        status: "error",
        title: "some error occurred",
      });
    }
  };

  const fetchStatus = async () => {
    const response: any = await API.get("/status/1");
    if (response) {
      setStatus(response);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);
  return (
    <VStack align="stretch" spacing="10">
      <Heading color="blue.500" mt="4">
        Current Status:
      </Heading>
      <HStack spacing={"10"} fontWeight="semibold" fontFamily={"mono"}>
        <Box bg="blue.50" boxShadow={"lg"} rounded="lg" p="4">
          <Text>Semester: {status?.semester}</Text>
        </Box>
        <Box bg="blue.50" boxShadow={"lg"} rounded="lg" p="4">
          <Text>Year: {status?.year}</Text>
        </Box>
        <Box bg="blue.50" boxShadow={"lg"} rounded="lg" p="4">
          <Text>
            Status:{" "}
            {status?.status ? (
              <Tag colorScheme={"green"}>Open</Tag>
            ) : (
              <Tag colorScheme={"red"}>Close</Tag>
            )}
          </Text>
        </Box>
      </HStack>
      <Divider />
      <Box>
        <Heading color={"gray.600"} mt="4" fontSize={"2xl"}>
          Update Examination Status
        </Heading>
        <form onSubmit={handleSubmit(submitHandler)}>
          <VStack
            mt="8"
            align={"stretch"}
            width={{ base: "full", md: "md" }}
            spacing={5}
          >
            <FormControl isInvalid={!!errors?.semester?.message} isRequired>
              <FormLabel>Semester</FormLabel>
              <Select {...register("semester")} defaultValue={status?.semester}>
                <option value="fall">Fall</option>
                <option value="spring">Spring</option>
              </Select>
              <FormErrorMessage>{errors?.semester?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.year?.message} isRequired>
              <FormLabel>Year</FormLabel>
              <Input
                type="number"
                {...register("year")}
                defaultValue={status?.year}
              ></Input>
              <FormErrorMessage>{errors?.semester?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.isOpen?.message} isRequired>
              <FormLabel>Examination Status</FormLabel>
              <Select {...register("status")} defaultValue={status?.status}>
                <option value="1">Open</option>
                <option value="0">Close</option>
              </Select>
              <FormErrorMessage>{errors?.status?.message}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme={"blue"}
              w="full"
            >
              Submit
            </Button>
          </VStack>
        </form>
      </Box>
    </VStack>
  );
};

export default PrivateRoute(Status);
