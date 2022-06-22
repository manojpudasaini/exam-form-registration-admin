import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/organisms/Layout";
import { AuthContext, AuthProvider } from "../utils/AuthContext";
import { useContext, useState } from "react";
import Login from "./login";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = useContext(AuthContext);

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
