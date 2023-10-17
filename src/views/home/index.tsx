import { FC, useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import { createQR } from '@solana/pay';
import { useRouter } from 'next/router';
import calculatePrice from 'lib/calculatePrice';

const SOLANA_PAY_URL = 'solana:https://solana-golem-pay.vercel.app/api/hello';

export const HomeView: FC = ({}) => {
    const qrRef = useRef<HTMLDivElement>();
    useEffect(() => {
        const qr = createQR(SOLANA_PAY_URL, 360, 'white', 'black');

        // Set the generated QR code on the QR ref element
        if (qrRef.current) {
            qrRef.current.innerHTML = '';
            qr.append(qrRef.current);
            console.log('appended');
        }
    }, []);

    const router = useRouter();

    const amount = calculatePrice(router.query);

    return (
        <div className="md:hero mx-auto p-4">
            <div className="md:hero-content flex flex-col">
                <div className="mt-6">
                    <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
                        Checkout Scan: {amount.toString()} SOL
                    </h1>

                    <div ref={qrRef} className="flex justify-center" />
                </div>
            </div>
        </div>
    );
};
