import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useFormData } from "../../../../utils/FormContext";
import PrivateRoute from "../../../../withPrivateRoute";

const PersonalInfo = () => {
  const { data, setFormValues } = useFormData();
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is mandatory"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "all", resolver: yupResolver(validationSchema) });

  const onSubmit = (data: any) => {
    setFormValues(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors?.name?.message} isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="name"
            placeholder="Name"
            {...register("name")}
            defaultValue={data?.name}
          />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" isLoading={isSubmitting}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PrivateRoute(PersonalInfo);
