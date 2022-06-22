import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../utils/firebase-config";
import { useRouter } from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../utils/AuthContext";

const Login = () => {
  const toast = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setUser } = useContext(AuthContext);
  const loginHandler = async (data: any) => {
    try {
      await signInWithEmailAndPassword(auth, data?.email, data?.password);
      onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser);
      });
      router.push("/");
      toast({
        title: "logged in successfully",
        status: "success",
        isClosable: true,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: `${error.message
          .split("/")[1]
          .split(")")[0]
          .replaceAll("-", " ")}`,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      align={"center"}
      justify={"center"}
      direction={"column"}
      gap={10}
      px={6}
    >
      <Heading color={"blue.400"} as="h2" size={"lg"} p="2">
        Welcome to Examination Form Registration
      </Heading>
      <Box
        shadow={"2xl"}
        p={{ base: "2", sm: "5" }}
        rounded={"lg"}
        w={{ base: "full", sm: "md" }}
      >
        <form onSubmit={handleSubmit(loginHandler)}>
          <VStack
            justify={"center"}
            marginX={{ base: 0, md: "auto" }}
            spacing={4}
          >
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "email is required",
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "password is required",
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              rightIcon={<ArrowForwardIcon />}
              width={"full"}
              colorScheme={"blue"}
              type="submit"
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </VStack>
        </form>
        <Button
          mt={4}
          w="full"
          variant={"link"}
          onClick={() => router.push("/signup")}
        >
          Not registered? Create an account
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
