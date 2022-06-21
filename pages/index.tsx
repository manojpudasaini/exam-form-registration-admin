import { Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";

import Layout from "../components/organisms/Layout";

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
    </div>
  );
};

export default Home;
