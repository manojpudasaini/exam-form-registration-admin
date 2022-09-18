import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
const Uploads = () => {
  const toast = useToast();
  const schema = yup.object().shape({
    program: yup.string().required("program is required"),
    file: yup.mixed().required("upload a file"),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const submitHandler = async (data: any) => {
    const formData = new FormData();
    formData.append("file", data?.file[0]);
    try {
      const res: any = await axios.post(
        "http://localhost:5000/api/v1/subject/upload",
        formData
      );
      toast({
        title: "successfully uploaded",
        status: "success",
      });
      reset();
    } catch (error) {
      toast({
        title: "some error occurred",
        status: "error",
      });
    }

    console.log(data);
  };
  return (
    <Box>
      <Heading color={"blue.400"} textDecoration="underline" mt="4">
        Upload the subject list
      </Heading>
      <form onSubmit={handleSubmit(submitHandler)}>
        <VStack
          mt="4"
          width={{ base: "full", md: "md" }}
          align="stretch"
          spacing={"4"}
        >
          <FormControl isInvalid={!!errors?.program} isRequired>
            <FormLabel>Program</FormLabel>
            <Select defaultValue={""} {...register("program")}>
              <option hidden disabled value="">
                select your program...
              </option>
              <option value={"BE-IT"}>BE-IT</option>
              <option value={"BE-Comp"}>BE-Computer</option>
              <option value={"BE-Civil"}>BE-Civil</option>
            </Select>
            <FormErrorMessage>{errors?.program?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors?.file} isRequired>
            <FormLabel>Choose file</FormLabel>

            <Input
              type="file"
              {...register("file")}
              accept=".xlsx"
              variant={"filled"}
              p="1"
            />
            <FormHelperText>
              (selected file must be in xlsx format)
            </FormHelperText>
            <FormErrorMessage>{errors?.file?.message}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            colorScheme={"blue"}
            isLoading={isSubmitting}
            rightIcon={<FiUpload />}
            gap={4}
            width={{ base: "full" }}
          >
            Upload
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Uploads;
