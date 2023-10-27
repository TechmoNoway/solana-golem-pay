import Products from "components/Products";
import SiteHeading from "components/SiteHeading";
import { FC } from "react";

export const ShopView: FC = ({}) => {
  return (
    <div className="m-auto flex max-w-4xl flex-col items-stretch gap-8 pt-24">
      <SiteHeading>Golem Shop</SiteHeading>

      {/* <Products submitTarget="/checkout" enabled={publicKey !== null} /> */}
      <Products submitTarget="/checkout" enabled={true} />
    </div>
  );
};
