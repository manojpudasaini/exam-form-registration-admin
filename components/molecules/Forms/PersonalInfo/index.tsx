import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { API } from "../../../../utils/api";
import { AuthContext } from "../../../../utils/AuthContext";
import { useFormData } from "../../../../utils/FormContext";
import PrivateRoute from "../../../../withPrivateRoute";

const PersonalInfo = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { user } = useContext(AuthContext);
  const { data, setFormValues } = useFormData();
  const [fetchedUser, setFetchedUser] = useState<any>();
  const validationSchema = yup.object().shape({
    // name: yup.string(),
    semester: yup.string().typeError("invalid"),
    // program: yup.string(),
    // symbol_number: yup
    //   .string()
    //   .matches(/^[0-9]{8}$/, "symbol number consists of 8 digits"),
    // registration_number: yup
    //   .string()
    //   .matches(
    //     /([0-9]{4}[-][0-9]{1}[-][0-9]{2}[-][0-9]{4})$/,
    //     "please enter your registration number correctly"
    //   ),
    // photo: yup.mixed(),
  });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (value: any) => {
    setFormValues(value);
    console.log(value, "valuessssss>>>>>>>>>>>.....");
  };
  const FetchUserFromDB = async () => {
    try {
      const response: any = await API.get(
        `/student/getByfirebase/` + user?.uid
      );
      console.log(response, "response from db");
      setFetchedUser(response);
      setFormValues({
        firstName: response?.firstName,
        middleName: response?.middleName,
        lastName: response?.lastName,
        registrationNumber: response?.registrationNumber,
        symbolNumber: response?.symbolNumber,
        firebase_id: response?.firebase_id,
        photo: response?.photo,
        id: response?.firebase_id,
      });
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    FetchUserFromDB();
  }, []);
  console.log(errors, "errors>>>>>>>>>>>>>>>>>>>>>>>..");
  const ImageUploadHandler = () => {
    onToggle();
  };
  const semesterOptions = [
    {
      option: "1",
      value: 1,
    },
    {
      option: "2",
      value: 2,
    },
    {
      option: "3",
      value: 3,
    },
    {
      option: "4",
      value: 4,
    },
    {
      option: "5",
      value: 5,
    },
    {
      option: "6",
      value: 6,
    },
    {
      option: "7",
      value: 7,
    },
    {
      option: "8",
      value: 8,
    },
  ];
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box width={{ base: "full", md: "xl" }}>
          <SimpleGrid
            gap={"16px"}
            minChildWidth={"280px"}
            columns={{ base: 1, md: 2 }}
          >
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                isDisabled
                defaultValue={data?.firstName || fetchedUser?.firstName}
              />
              <FormErrorMessage>{errors?.firstname?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Middle Name</FormLabel>
              <Input
                isDisabled
                defaultValue={data?.middleName || fetchedUser?.middleName}
              />
              <FormErrorMessage>{errors?.middleName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                isDisabled
                defaultValue={data?.lastName || fetchedUser?.lastName}
              />
              <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.semester?.message} isRequired>
              <FormLabel>Semester</FormLabel>
              <Select
                {...register("semester")}
                defaultValue={data?.semester || fetchedUser?.semester}
              >
                <option hidden disabled value="">
                  select current semester
                </option>
                {semesterOptions?.map((item, key) => (
                  <option key={key} value={item?.value}>
                    {item?.option}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>
                {errors?.symbol_number?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors?.symbol_number?.message}
              isRequired
            >
              <FormLabel>Exam Roll Number</FormLabel>
              <Input
                id="symbol_number"
                type="text"
                placeholder="exam roll number"
                // {...register("symbol_number")}
                defaultValue={data?.symbol_number || fetchedUser?.symbolNumber}
                disabled
              />
              <FormErrorMessage>
                {errors?.symbol_number?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors?.registration_number?.message}
              isRequired
            >
              <FormLabel>Registration Number</FormLabel>
              <Input
                id="registration_number"
                type="text"
                // {...register("registration_number")}
                isDisabled
                defaultValue={
                  fetchedUser?.registrationNumber || data?.registration_number
                }
              />
            </FormControl>
            <FormControl isInvalid={!!errors?.program?.message} isRequired>
              <FormLabel>Program</FormLabel>
              <Input
                id="program"
                type="text"
                placeholder="program"
                // {...register("program")}
                defaultValue={data?.program || fetchedUser?.program}
                disabled
              />
              <FormErrorMessage>
                {errors?.symbol_number?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors?.photo?.message} isRequired>
              <FormLabel>Photo</FormLabel>
              <VStack align={"start"}>
                {fetchedUser?.photo && (
                  <Image
                    src={fetchedUser?.photo}
                    height={140}
                    width={140}
                    alt="user-photo"
                  />
                )}
                <Button
                  onClick={ImageUploadHandler}
                  variant="link"
                  colorScheme={"blue"}
                  size="sm"
                  mt="1"
                >
                  Change photo
                </Button>
              </VStack>
              <FormErrorMessage>{errors?.photo?.message}</FormErrorMessage>
            </FormControl>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Upload Photo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    type="file"
                    // {...register("photo")}
                    accept="image/*"
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme={"blue"}
              variant="solid"
            >
              Submit
            </Button>
          </SimpleGrid>
        </Box>
      </form>
    </Box>
  );
};

export default PrivateRoute(PersonalInfo);
