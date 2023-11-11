import BigNumber from 'bignumber.js';
import { CartItemType } from 'types';

export default function cartCalculatePrice(query: CartItemType[]): BigNumber {
    let amount = new BigNumber(0);
    for (let item of query) {
        const price = item.product.price;
        const productQuantity = new BigNumber(item.quantity);
        amount = amount.plus(productQuantity.multipliedBy(price));
    }

    return amount;
}
