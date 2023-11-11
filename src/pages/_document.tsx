import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

import { ThemeProvider } from '../components/theme-provider';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
                <Html>
                    <Head>
                        <link rel="shortcut icon" href="/favicon.ico" />
                    </Head>
                    <body>
                        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                            <Main />
                            <NextScript />
                        </ThemeProvider>
                    </body>
                </Html>
        );
    }
}

export default MyDocument;
