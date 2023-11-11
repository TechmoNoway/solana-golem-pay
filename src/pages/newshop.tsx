import type { NextPage } from 'next';
import Head from 'next/head';
import { ShopScene } from 'views/newshop';
import { useRouter } from 'next/router';

const NewShopPage: NextPage = (props) => {
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>Golem Pay</title>
                <meta name="description" content="Golem Pay" />
            </Head>
            <ShopScene />
        </div>
    );
};

export default NewShopPage;
