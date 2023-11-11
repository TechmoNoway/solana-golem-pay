<<<<<<< HEAD
import Products from 'components/Products/Products';
=======
>>>>>>> 4c141be9ac23a949c32808887b57bdda0b25a1cd
import SiteHeading from 'components/SiteHeading';
import { FC } from 'react';

export const ShopView: FC = ({}) => {
    return (
        <div className="m-auto flex max-w-4xl flex-col items-stretch gap-8 pt-24">
            <SiteHeading>Golem Shop</SiteHeading>

            {/* <Products submitTarget="/checkout" enabled={publicKey !== null} /> */}
<<<<<<< HEAD
            <Products submitTarget="/checkout" enabled={true} />
=======
>>>>>>> 4c141be9ac23a949c32808887b57bdda0b25a1cd
        </div>
    );
};
