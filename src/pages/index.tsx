import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Golem Pay</title>
        <meta name="description" content="Golem Pay" />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
