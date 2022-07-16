import { extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
const theme = extendTheme({
  components: {
    Steps,
  },
  fonts: {
    heading: `"Lato", sans-serif`,
    body: `"Poppins", sans-serif`,
  },
});

export default theme;
