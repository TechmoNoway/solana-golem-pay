'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '../../lib/utils';

import { MainNavItem } from '../../types';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '../../components/ui/navigation-menu';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface MainNavProps {
    mainNavItems?: MainNavItem[];
}

export function MainNav({ mainNavItems }: MainNavProps) {
    return (
        <div className="hidden gap-6 lg:flex">
            <Link href="/" rel="noopener noreferrer" passHref className="text-secondary hover:text-white">
                <img src="https://i.ibb.co/4fMX79w/golempaypinkpurplelogo.png" width={170} height={105} alt="logo" />
            </Link>

            <NavigationMenu>
                <NavigationMenuList>

                    {mainNavItems?.map(
                        (item) =>
                            item.href && (
                                <NavigationMenuItem key={item.title}>
                                    <Link href={item.href} legacyBehavior passHref>
                                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), 'text-sm')}>
                                            {item.title}
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            ),
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
