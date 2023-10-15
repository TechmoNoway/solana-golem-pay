import type { NextPage } from "next";
import Head from "next/head";
import { ShopView } from "../views";
import { useRouter } from "next/router";

const Shop: NextPage = (props) => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Golem Pay</title>
        <meta name="description" content="Golem Shop" />
      </Head>
      <ShopView />
    </div>
  );
};

export default Shop;
