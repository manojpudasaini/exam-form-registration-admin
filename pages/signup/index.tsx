import React, { useContext } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { API } from "../../utils/api";
import { AuthContext } from "../../utils/AuthContext";

const programOptions = [
  {
    option: "BE-Information Technlogy",
    value: "BE-IT",
  },
  {
    option: "BE-Computer",
    value: "BE-Com",
  },
  {
    option: "BE-Civil",
    value: "BE-Civil",
  },
];
const validationSchema = yup.object().shape({
  name: yup.string().required("This field is mandatory"),
  email: yup
    .string()
    .required("This field is mandatory")
    .email("invalid email"),
  program: yup.string().required("select your program"),
  symbol_number: yup
    .string()
    .required("This field is mandatory")
    .matches(/^[0-9]{8}$/, "symbol number consists of 8 digits"),
  registration_number: yup
    .string()
    .required("This field is mandatory")
    .matches(
      /([0-9]{4}[-][0-9]{1}[-][0-9]{2}[-][0-9]{4})$/,
      "please enter your registration number correctly"
    ),
  phone_number: yup
    .string()
    .required("This field is mandatory")
    .matches(/^[0-9]{10}$/, "phone number consist of 10 digits"),
  password: yup
    .string()
    .required("This field is mandatory")
    .min(8, "minimum 8 charatcter is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "password doesn't match"),
  photo: yup.mixed().required("You need to upload your photo"),
});
type LoginFormInputs = {
  name: string;
  program: string;
  email: string;
  symbol_number: string;
  registration_number: string;
  phone_number: string;
  password: string;
  passwordConfirmation: string;
  photo: any;
};
function StudentRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  const formSubmit = async (data: LoginFormInputs) => {
    await API.post("/api/student", {
      email: data.email,
      password: data.password,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(data, "my console data is coming here");
  };
  console.log(errors, "errors");

  const { user } = useContext(AuthContext);
  console.log(user, "user in reg page");

  return (
    <VStack align={"stretch"} p={4}>
      <form onSubmit={handleSubmit(formSubmit)} encType="multipart/form-data">
        <Flex direction={"column"} gap={6} w={"full"}>
          <SimpleGrid columns={[1, null, 2]} gap={6}>
            <FormControl isInvalid={!!errors?.name?.message} isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="name" placeholder="Name" {...register("name")} />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.program?.message} isRequired>
              <FormLabel>Program</FormLabel>

              <Select {...register("program")} defaultValue="">
                <option hidden disabled value="">
                  select your program...
                </option>
                {programOptions.map((item, key) => (
                  <option key={key} value={item.value}>
                    {item.option}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors?.program?.message}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={[1, null, 2]} minChildWidth={200} gap={6}>
            <FormControl
              isInvalid={!!errors?.symbol_number?.message}
              isRequired
            >
              <FormLabel>Symbol Number</FormLabel>

              <Input
                placeholder="Symbol Number"
                {...register("symbol_number")}
              />
              <FormErrorMessage>
                {errors?.symbol_number?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors?.registration_number?.message}
              isRequired
            >
              <FormLabel>PU Registration Number</FormLabel>

              <Input
                placeholder="PU Registration Number"
                {...register("registration_number")}
              />
              <FormErrorMessage>
                {errors?.registration_number?.message}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <FormControl isInvalid={!!errors?.email?.message} isRequired>
            <FormLabel>Email</FormLabel>

            <Input type="email" placeholder="Email" {...register("email")} />
            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>
          <SimpleGrid columns={[1, null, 2]} gap={6}>
            <FormControl isInvalid={!!errors?.password?.message} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="password"
                {...register("password")}
              />
              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors?.passwordConfirmation?.message}
              isRequired
            >
              <FormLabel>Re-Enter Password</FormLabel>
              <Input
                type="password"
                placeholder="confirm password"
                {...register("passwordConfirmation")}
              />
              <FormErrorMessage>
                {errors?.passwordConfirmation?.message}
              </FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <SimpleGrid gap={6} columns={[1, null, 2]}>
            <FormControl isInvalid={!!errors?.phone_number?.message} isRequired>
              <FormLabel>Phone Number</FormLabel>

              <Input placeholder="Phone Number" {...register("phone_number")} />

              <FormErrorMessage>
                {errors?.phone_number?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.photo?.message} isRequired>
              <FormLabel>Upload your photo</FormLabel>
              <input type="file" accept={"image/*"} {...register("photo")} />
              <FormErrorMessage>{errors?.photo?.message}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <Button type="submit" colorScheme={"blue"} width={200} mt={6}>
            Register
          </Button>
        </Flex>
      </form>
    </VStack>
  );
}

export default StudentRegistration;
