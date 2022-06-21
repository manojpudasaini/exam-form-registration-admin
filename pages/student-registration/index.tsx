import * as React from "react";
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
import axios from "axios";

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
      /[0-9]{4}[-][0-9]{1}[-][0-9]{2}[-][0-9]{4}/,
      "please enter your registration number correctly"
    )
    .max(14),
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
    await axios
      .post("/api/student", {
        email: data.email,
        password: data.password,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(data, "my console data is coming here");
  };
  console.log(errors);

  return (
    <VStack align={"stretch"} p={4}>
      <form onSubmit={handleSubmit(formSubmit)}>
        <Flex direction={"column"} gap={4} w={"full"}>
          <SimpleGrid columns={[1, null, 2]} gap={4}>
            <FormControl isInvalid={!!errors?.name?.message} isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="name" placeholder="Name" {...register("name")} />
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.program?.message} isRequired>
              <FormLabel>Program</FormLabel>

              <Select
                variant={"filled"}
                {...register("program")}
                defaultValue=""
              >
                <option hidden disabled value="">
                  select your program...
                </option>
                {programOptions.map((item, key) => (
                  <option key={key} value={item.value}>
                    {item.option}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={[1, null, 2]} minChildWidth={200} gap={4}>
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
          <SimpleGrid columns={[1, null, 2]} gap={4}>
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

          <FormControl isInvalid={!!errors?.phone_number?.message} isRequired>
            <FormLabel>Phone Number</FormLabel>

            <Input placeholder="Phone Number" {...register("phone_number")} />

            <FormErrorMessage>{errors?.phone_number?.message}</FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme={"blue"}
            width={"sm"}
            mt={4}
            alignSelf={"center"}
          >
            Register
          </Button>
        </Flex>
      </form>
    </VStack>
  );
}

export default StudentRegistration;
