import { Product } from '../../types';
import { Shell } from '../../components/Shells/shell';
import { Header } from '../../components/header';
import { Products } from '../../components/products';
import { toTitleCase } from '../../lib/utils';
import { FC, useEffect, useState } from 'react';

interface CategoryPageProps {
    params: {
        category: Product['category'];
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

// async function getCategory(category: string, sort?: string) {
//     try {
//         const apiUrl = `https://fakestoreapi.com/products/category/${category}?sort=${sort}`;
//         const res = await fetch(apiUrl);

//         if (!res.ok) {
//             throw new Error('Failed to fetch data');
//         }

//         const data = await res.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching category data:', error);
//         throw error;
//     }
// }

export const CategoryView: FC = ({ params, searchParams }: CategoryPageProps) => {
    // const [products, setProducts] = useState([]);
    // const [paginatedProducts, setPagiatedProducts] = useState([]);
    // const [pageCount, setPageCount] = useState(null);
    // const [formattedName, setFormattedName] = useState(null);
    // const { category } = params;
    // const { page, per_page, sort } = searchParams;
    // useEffect(() => {
    //     const fetchCategory = async () => {
    //         const data = await getCategory(category, sort as string);
    //         setProducts(data.slice(0, 4));

    //         const limit = typeof per_page === 'string' ? parseInt(per_page) : 8;
    //         const offset = typeof page === 'string' ? (parseInt(page) - 1) * limit : 0;

    //         setPagiatedProducts(products.slice(offset, offset + limit));
    //         setPageCount(Math.ceil(products.length / limit));
    //         setFormattedName(category.replace(/%20/g, ' '));
    //     };

    //     fetchCategory();
    // }, []);

    return (
        <div>
            {/* <Shell>
                <Header
                    title={toTitleCase(formattedName)}
                    description={`Buy ${formattedName} from our best store`}
                    size="sm"
                />
                <Products
                    products={paginatedProducts}
                    pageCount={pageCount}
                    page={typeof page === 'string' ? page : undefined}
                    per_page={typeof per_page === 'string' ? per_page : undefined}
                    sort={typeof sort === 'string' ? sort : undefined}
                />
            </Shell> */}
        </div>
    );
};
