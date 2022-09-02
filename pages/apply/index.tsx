import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import PersonalInfo from "../../components/molecules/Forms/PersonalInfo";
import PrivateRoute from "../../withPrivateRoute";

const content1 = (
  <Flex py={4}>
    <PersonalInfo />
  </Flex>
);
const content2 = <Flex py={4}>step2</Flex>;
const content3 = <Flex py={4}>step3</Flex>;

const steps = [
  { label: "Step 1", content: content1 },
  { label: "Step 2", content: content2 },
  { label: "Step 3", content: content3 },
];

const ApplyForm = () => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <Flex flexDir="column" width="100%" pt="4">
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
        <Flex width="100%" justify="flex-end">
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
  );
};

export default PrivateRoute(ApplyForm);
