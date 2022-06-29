import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  SimpleGrid,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { API } from "../../utils/api";
import { AuthContext } from "../../utils/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";

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
function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
function StudentRegistration() {
  const [avatarUrl, setAvatarUrl] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  const toast = useToast();

  const formSubmit = async (data: LoginFormInputs) => {
    const base64 = await getBase64(data.photo[0]);
    setAvatarUrl(base64);
    const studentDetails = { ...data, photo: avatarUrl };
    console.log(studentDetails, "my console data is coming here");
    await API.post("/api/student", {
      email: data.email,
      password: data.password,
    })
      .then(async (response: any) => {
        console.log(response, "api response");

        await API.post("http://localhost:5000/api/v1/student/create", {
          name: studentDetails.name,
          program: studentDetails.program,
          registrationNumber: studentDetails.registration_number,
          photo: avatarUrl,
          symbolNumber: studentDetails.symbol_number,
          phone: studentDetails.phone_number,
          email: studentDetails.email,
          firebase_id: response?.response?.uid,
        })
          .then((res) => {
            toast({
              title: "Account created successfully",
              status: "success",
              position: "top-right",
              isClosable: true,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err, "error from api");
        toast({
          title: `${err?.data?.error?.message}`,
          status: "error",
          position: "top-right",
          isClosable: true,
        });
      });
  };
  console.log(errors, "errors");

  const { user } = useContext(AuthContext);
  console.log(user, "user in reg page");
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  return (
    <Flex direction={"column"} bg={"gray.100"} h={"100vh"}>
      <Flex
        align={"center"}
        gap={{ base: "2", md: "10" }}
        bg={"gray.100"}
        w={"full"}
        px={{ base: "2", lg: 40 }}
        py={"3"}
      >
        <Image src={"/logo.png"} height={100} width={100} objectFit="contain" />
        <Heading
          color={"blue.500"}
          as="h2"
          size={{ base: "xl", md: "2xl" }}
          letterSpacing={"wider"}
        >
          Sign Up
        </Heading>
      </Flex>

      <VStack
        align={"stretch"}
        px={4}
        py={8}
        mx={{ base: 0, lg: "40" }}
        background={"#fff"}
        rounded="md"
        shadow={"md"}
      >
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
              <FormControl
                isInvalid={!!errors?.phone_number?.message}
                isRequired
              >
                <FormLabel>Phone Number</FormLabel>

                <Input
                  placeholder="Phone Number"
                  {...register("phone_number")}
                />

                <FormErrorMessage>
                  {errors?.phone_number?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.photo?.message} isRequired>
                <FormLabel>Upload your photo</FormLabel>
                <Input
                  type="file"
                  accept={"image/*"}
                  {...register("photo")}
                  htmlSize={120}
                  width="auto"
                  p={1}
                />
                <FormErrorMessage>{errors?.photo?.message}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
            <Button
              type="submit"
              colorScheme={"blue"}
              width={{ base: "full", sm: 400 }}
              mt={6}
              alignSelf={"center"}
              isLoading={isSubmitting}
              shadow="md"
            >
              Register
            </Button>
          </Flex>
        </form>
      </VStack>
    </Flex>
  );
}

export default StudentRegistration;
