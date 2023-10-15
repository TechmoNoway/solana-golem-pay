import type { NextPage } from "next";
import Head from "next/head";
import { LoginPage } from "../views";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Golem Pay</title>
        <meta name="description" content="Login" />
      </Head>
      <LoginPage />
    </div>
  );
};

export default Login;
