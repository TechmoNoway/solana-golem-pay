import { AppProps } from 'next/app';
import { HelmetProvider } from 'react-helmet-async';

import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { CartProvider } from '../contexts/cart-context';

import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer/Footer';
import Notifications from '../components/Notification';
import { useRouter } from 'next/router';
import { LoginContainer } from 'components/LoginContainer';
import SiteHeader from 'components/layouts/site-header';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Solana Golem Payment</title>
            </Head>
            <CartProvider>
                <HelmetProvider>
                    <ContextProvider>
                        <div className="flex flex-col h-screen">
                            {router.pathname === '/login' ? (
                                <LoginContainer>
                                    <Component {...pageProps} />
                                </LoginContainer>
                            ) : (
                                <>
                                    <Notifications />
                                    <SiteHeader />
                                    <ContentContainer>
                                        <Component {...pageProps} />
                                        <Footer />
                                    </ContentContainer>
                                </>
                            )}
                        </div>
                    </ContextProvider>
                </HelmetProvider>
            </CartProvider>
        </>
    );
};

export default App;
