import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Center, Flex, Heading } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import PersonalInfo from "../../components/molecules/Forms/PersonalInfo";
import SubjectSelection from "../../components/molecules/Forms/SubjectSelection";
import DownloadForm from "../../components/molecules/Forms/DownloadForm";
import PrivateRoute from "../../withPrivateRoute";
import { useEffect, useState } from "react";
import { API } from "../../utils/api";

const content1 = (
  <Flex py={4}>
    <PersonalInfo />
  </Flex>
);
const content2 = (
  <Flex py={4}>
    <SubjectSelection />
  </Flex>
);
const content3 = (
  <Flex py={4}>
    <DownloadForm />
  </Flex>
);

const steps = [
  { label: "Your Details", content: content1 },
  { label: "Select Subjects", content: content2 },
  { label: "Download Form", content: content3 },
];

const ApplyForm = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [status, setStatus] = useState<any>();
  const fetchStatus = async () => {
    const response: any = await API.get("/status/1");
    setStatus(response);
  };
  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <>
      {status?.status ? (
        <Flex flexDir="column" width="full" pt="4">
          <Steps activeStep={activeStep} colorScheme="blue">
            {steps.map(({ label, content }) => (
              <Step label={label} key={label}>
                {content}
              </Step>
            ))}
          </Steps>
          {activeStep === steps.length ? (
            <Flex p={4}>
              <Button mx="auto" size="sm" onClick={reset}>
                Reset
              </Button>
            </Flex>
          ) : (
            <Flex width="100%" justify="flex-end" mb="8">
              <Button
                isDisabled={activeStep === 0}
                mr={4}
                onClick={prevStep}
                size="sm"
                variant="ghost"
                leftIcon={<ArrowBackIcon />}
              >
                Prev
              </Button>
              <Button
                size="sm"
                onClick={nextStep}
                rightIcon={<ArrowForwardIcon />}
                colorScheme={"blue"}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Flex>
          )}
        </Flex>
      ) : (
        <>
          <Center>
            <Heading>
              Examination form registration is currently unavailable.
            </Heading>
          </Center>
        </>
      )}
    </>
  );
};

export default PrivateRoute(ApplyForm);
