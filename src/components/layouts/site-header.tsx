'use client';

import React from 'react';

import { siteConfig } from '../../config/site-config';
import dynamic from 'next/dynamic';

import { MainNav } from '../../components/layouts/main-nav';
import { MobileNav } from '../../components/layouts/mobile-nav';
import { CartSheet } from '../cart/cart-sheet';
import { Combobox } from '../combobox';
import { useAutoConnect } from 'contexts/AutoConnectProvider';
const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false },
);

const SiteHeader = () => {
    const { autoConnect, setAutoConnect } = useAutoConnect();

    return (
        <>
            <div className="fixed z-40 navbar top-0 w-full bg-black border-b border-zinc-600 bg-opacity-66">
                <div className="navbar container flex h-16 flex-row shadow-lg bg-black text-neutral-content ">
                    <MainNav mainNavItems={siteConfig.mainNav} />
                    <MobileNav mainNavItems={siteConfig.mainNav} />

                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <nav className="flex items-center space-x-2">
                            <Combobox />
                            <CartSheet />
                        </nav>
                    </div>

                    <WalletMultiButtonDynamic className="btn-ghost flex ml-2 border-gray-100 text-lg " />
                </div>
            </div>
        </>
    );
};

export default SiteHeader;
