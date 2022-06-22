import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/organisms/Layout";
import { AuthProvider } from "../utils/AuthContext";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <ChakraProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
