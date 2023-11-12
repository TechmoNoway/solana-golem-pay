import { Product } from '../../types';
import { FC } from 'react';

interface CategoryPageProps {
    params: {
        category: Product['category'];
    };
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

export const CategoryView: FC = ({ params, searchParams }: CategoryPageProps) => {
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
