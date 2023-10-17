import { AppProps } from 'next/app';
import { HelmetProvider } from 'react-helmet-async';

import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification';
import { useRouter } from 'next/router';
import { LoginContainer } from 'components/LoginContainer';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();

    console.log(router.pathname);

    return (
        <>
            <Head>
                <title>Solana Golem Payment</title>
            </Head>

            <HelmetProvider>
                <ContextProvider>
                    {/* <ThemeProvider theme={Theme}>

        </ThemeProvider> */}
                    <div className="flex flex-col h-screen">
                        {router.pathname === '/login' ? (
                            <LoginContainer>
                                <Component {...pageProps} />
                            </LoginContainer>
                        ) : (
                            <>
                                <Notifications />
                                <AppBar />
                                <ContentContainer>
                                    <Component {...pageProps} />
                                    <Footer />
                                </ContentContainer>
                            </>
                        )}
                    </div>
                </ContextProvider>
            </HelmetProvider>
        </>
    );
};

export default App;
