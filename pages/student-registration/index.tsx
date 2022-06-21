import * as React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";

const validationSchema = yup.object().shape({
  name: yup.string().required("This field is mandatory"),
  email: yup
    .string()
    .required("This field is mandatory")
    .email("invalid email"),
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
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <FormControl isInvalid={!!errors?.name?.message} p="4" isRequired>
          <FormLabel>Name</FormLabel>

          <Input type="name" placeholder="Name" {...register("name")} />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors?.email?.message} p="4" isRequired>
          <FormLabel>Email</FormLabel>

          <Input type="email" placeholder="Email" {...register("email")} />
          <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors?.password?.message} p="4" isRequired>
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
          p="4"
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
        <FormControl
          isInvalid={!!errors?.symbol_number?.message}
          p="4"
          isRequired
        >
          <FormLabel>Symbol Number</FormLabel>

          <Input placeholder="Symbol Number" {...register("symbol_number")} />
          <FormErrorMessage>{errors?.symbol_number?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={!!errors?.registration_number?.message}
          p="4"
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
        <FormControl
          isInvalid={!!errors?.phone_number?.message}
          p="4"
          isRequired
        >
          <FormLabel>Phone Number</FormLabel>

          <Input placeholder="Phone Number" {...register("phone_number")} />

          <FormErrorMessage>{errors?.phone_number?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit">submit</Button>
      </form>
    </div>
  );
}

export default StudentRegistration;
