import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

import Layout from "../components/organisms/Layout";
import PrivateRoute from "../withPrivateRoute";
import Login from "./login";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Exam Form Registration 🔥</title>
        <meta
          name="description"
          content="exam form registration for Everest Engineering College"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      abcd
    </div>
  );
};

export default PrivateRoute(Home);
