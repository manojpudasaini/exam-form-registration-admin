import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/organisms/Layout";
import { AuthProvider } from "../utils/AuthContext";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase-config";
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";

const TopProgressBar = dynamic(
  () => {
    return import("../components/molecules/TopProgressBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>();
  const initialLoad = () => {
    auth.onAuthStateChanged(async (user: any) => {
      try {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {}
    });
  };
  useEffect(() => {
    initialLoad();
  }, []);
  console.log(user, "user in app ");
  return (
    <ChakraProvider>
      <TopProgressBar />
      <AuthProvider>
        <Layout user={user}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
