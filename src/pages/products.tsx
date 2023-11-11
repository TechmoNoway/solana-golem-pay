import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header } from '../components/header';
import { Shell } from '../components/Shells/shell';
import { useEffect, useState } from 'react';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ProductCard } from '../components/product-card';
import { PaginationButton } from '../components/pagination-button';
import { usePathname, useSearchParams, useRouter as navigateRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Icons } from '../components/icons';
import { sortOptions } from '../config/site-config';
import { cn } from '../lib/utils';
import { setTransition } from '../lib/transition';

const ProductPage: NextPage = () => {
    const router = useRouter();
    const naviRouter = navigateRouter();
    
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(null);

    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Create query string
    const createQueryString = React.useCallback(
        (params: Record<string, string | number | null>) => {
            const newSearchParams = new URLSearchParams(searchParams?.toString());

            for (const [key, value] of Object.entries(params)) {
                if (value === null) {
                    newSearchParams.delete(key);
                } else {
                    newSearchParams.set(key, String(value));
                }
            }

            return newSearchParams.toString();
        },
        [searchParams],
    );

    // Search params
    const page = searchParams?.get('page') ?? '1';
    const per_page = searchParams?.get('per_page') ?? '8';
    const sort = searchParams?.get('sort') ?? '';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = `https://fakestoreapi.com/products?sort=${sort}`;

                const res = await fetch(apiUrl);

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();

                const limit = typeof per_page === 'string' ? parseInt(per_page) : 8;
                const offset = typeof page === 'string' ? (parseInt(page) - 1) * limit : 0;
                setProducts(data.slice(offset, offset + limit));
                setPageCount(Math.ceil(data.length / limit));
            } catch (error) {
                console.error('Error fetching product data:', error);
                throw error;
            }
        };

        fetchProducts();
    }, [page, per_page, sort]);

    return (
        <div>
            <Head>
                <title>Golem Pay</title>
                <meta name="description" content="Golem Pay" />
            </Head>
            <Shell>
                <Header
                    title="Products"
                    description="Find a wide selection of products that are attractive and according to your needs."
                    size="sm"
                />
                <AnimatePresence>
                    <motion.div
                        key={sort}
                        {...setTransition({
                            typeIn: 'spring',
                            duration: 0.5,
                            distanceY: -50,
                        })}
                        className="flex flex-col space-y-6"
                    >
                        <div className="flex items-center space-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-label="Sort products " size="sm">
                                        Sort <Icons.chevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-48">
                                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {sortOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={option.label}
                                            className={cn(option.value === sort && 'font-bold')}
                                            onClick={() => {
                                                router.push(
                                                    `${pathname}?${createQueryString({
                                                        sort: option.value,
                                                    })}`,
                                                );
                                            }}
                                        >
                                            {option.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {!products.length ? (
                            <div className="mx-auto flex max-w-xs flex-col space-y-1 5">
                                <h1 className="text-center text-2xl font-bold">No products found</h1>
                                <p className="text-center text-muted-foreground">
                                    Try changing your filters, or check back later for new products
                                </p>
                            </div>
                        ) : null}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        {products.length ? (
                            <PaginationButton
                                pageCount={pageCount}
                                page={page}
                                per_page={per_page}
                                sort={sort}
                                createQueryString={createQueryString}
                                router={naviRouter}
                                pathname={pathname}
                                isPending={false}
                            />
                        ) : null}
                    </motion.div>
                </AnimatePresence>
            </Shell>
        </div>
    );
};

export default ProductPage;
