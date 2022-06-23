import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/organisms/Layout";
import { AuthContext, AuthProvider } from "../utils/AuthContext";
import { useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase-config";

function MyApp({ Component, pageProps }: AppProps) {
  // const { user, setUser, authenticated } = useContext(AuthContext);
  const [user, setUser] = useState();
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
      <AuthProvider>
        <Layout user={user}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
