import { Header } from '../../components/header';
import { Shell } from '../../components/Shells/shell';
import { Products } from '../../components/productlist';

import { Product } from '../../types';
import { useEffect, useState, FC } from 'react';

export async function getProducts(sort?: string): Promise<Product[]> {
    try {
        const apiUrl = `https://fakestoreapi.com/products?sort=${sort}`;

        const res = await fetch(apiUrl);

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.error('Error fetching product data:', error);
        throw error;
    }
}

interface ProductsViewProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

export const ProductsView: FC = ({ searchParams }: ProductsViewProps) => {
    
    const { page, per_page, sort } = searchParams;

    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const data = (await getProducts(sort as string)) as Product[];
            const limit = typeof per_page === 'string' ? parseInt(per_page) : 8;
            const offset = typeof page === 'string' ? (parseInt(page) - 1) * limit : 0;
            setProducts(data.slice(offset, offset + limit));
            setPageCount(Math.ceil(data.length / limit));
        };

        fetchProduct();
    }, [page, per_page, sort]);

    return (
        <div>
            <Shell>
                <Header
                    title="Products"
                    description="Find a wide selection of products that are attractive and according to your needs."
                    size="sm"
                />
                <Products
                    products={products}
                    pageCount={pageCount}
                    page={typeof page === 'string' ? page : undefined}
                    per_page={typeof per_page === 'string' ? per_page : undefined}
                    sort={typeof sort === 'string' ? sort : undefined}
                />
            </Shell>
        </div>
    );
};
