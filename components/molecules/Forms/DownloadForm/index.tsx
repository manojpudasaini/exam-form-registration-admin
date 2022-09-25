import { Button, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { FiDownloadCloud } from "react-icons/fi";
import { useFormData } from "../../../../utils/FormContext";
import { saveAs } from "file-saver";
import axios from "axios";
const DownlodForm = () => {
  const { data } = useFormData();
  const downloadHandler = async () => {
    try {
      const response: any = await axios.get(
        `http://localhost:5000/api/v1/form/download-form/${data?.id}`,
        {
          responseType: "blob",
        }
      );
      if (response) {
        console.log(response, "response");
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        await saveAs(pdfBlob, "form.pdf");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

    

  return (
    <VStack p="4" align="center" w="full" spacing={"10"}>
      <Heading color="blue.500">Download your form</Heading>
      <Button
        rightIcon={<FiDownloadCloud />}
        onClick={() => downloadHandler()}
        colorScheme="blue"
        size="lg"
      >
        Download
      </Button>
    </VStack>
  );
};

export default DownlodForm;
