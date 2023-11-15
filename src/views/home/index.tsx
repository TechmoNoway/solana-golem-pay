import { FC, useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';

import { FindReferenceError, ValidateTransferError, createQR, findReference, validateTransfer } from '@solana/pay';
import { useRouter } from 'next/router';
import calculatePrice from 'lib/calculatePrice';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { shopAddress } from 'lib/addresses';
import { useCart } from 'contexts/cart-context';
import cartCalculatePrice from 'lib/cartCalculatePrice';

export const HomeView: FC = ({}) => {
    const qrRef = useRef<HTMLDivElement>();

    const router = useRouter();

    const { cartItems } = useCart();

    console.log(cartItems);

    // const amount = useMemo(() => calculatePrice(router.query), [router.query]);
    const amount = useMemo(() => cartCalculatePrice(cartItems), []);
    // Read the URL query (which includes our chosen products)
    const searchParams = new URLSearchParams();
    // for (const [key, value] of Object.entries(router.query)) {
    //     if (value) {
    //         if (Array.isArray(value)) {
    //             for (const v of value) {
    //                 searchParams.append(key, v);
    //             }
    //         } else {
    //             searchParams.append(key, value);
    //         }
    //     }
    // }

    console.log(searchParams);
    console.log(amount);

    // const solanaPayUrl = `solana:https://solana-golem-pay-i7u8n4ujr-kenny-wills-projects.vercel.app/api/hello?${searchParams.toString()}`;
    const solanaPayUrl = `solana:https://solana-golem-pay-i7u8n4ujr-kenny-wills-projects.vercel.app/api/hello?box-of-cookies=1&basket-of-cookies=1`;

    // Generate the unique reference which will be used for this transaction
    const reference = useMemo(() => Keypair.generate().publicKey, []);

    // Add it to the params we'll pass to the API
    // searchParams.append('reference', reference.toString());

    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const connection = new Connection(endpoint);

    useEffect(() => {
        const qr = createQR(solanaPayUrl, 360, 'white', 'black');

        if (qrRef.current) {
            qrRef.current.innerHTML = '';
            qr.append(qrRef.current);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                // Check if there is any transaction for the reference
                const signatureInfo = await findReference(connection, reference, {
                    finality: 'confirmed',
                });
                // Validate that the transaction has the expected recipient, amount and SPL token
                await validateTransfer(
                    connection,
                    signatureInfo.signature,
                    {
                        recipient: shopAddress,
                        amount,
                        reference,
                    },
                    { commitment: 'confirmed' },
                );
                router.push('/confirmed');
            } catch (e) {
                if (e instanceof FindReferenceError) {
                    // No transaction found yet, ignore this error
                    return;
                }
                if (e instanceof ValidateTransferError) {
                    // Transaction is invalid
                    console.error('Transaction is invalid', e);
                    return;
                }
                console.error('Unknown error', e);
            }
        }, 500);
        return () => {
            clearInterval(interval);
        };
    }, [amount]);

    const handleConfirmPaying = () => {
        router.push('/confirmed');
    };

    return (
        <div className="md:hero mx-auto p-4">
            <div className="md:hero-content flex flex-col">
                <div className="mt-6">
                    <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
                        Checkout Scan: {amount.dividedBy(1000).toString()} SOL
                    </h1>

                    <div ref={qrRef} className="flex justify-center" />

                    <button
                        className="flext justify-center px-8 py-2 mt-4 mx-1 bg-orange-500 text-white font-semibold rounded-lg"
                        type="submit"
                        id="submitted"
                    >
                        Confirm Paying
                    </button>
                </div>
            </div>
        </div>
    );
};
