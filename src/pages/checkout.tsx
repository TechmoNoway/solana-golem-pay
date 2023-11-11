import type { NextPage } from 'next';
import Head from 'next/head';
import { HomeView } from '../views';
import { useRouter } from 'next/router';

const Checkout: NextPage = (props) => {
    const router = useRouter();

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

export default Checkout;
