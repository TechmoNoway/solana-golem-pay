import Modal from 'components/Modal';
import { useCart } from 'contexts/cart-context';
import cartCalculatePrice from 'lib/cartCalculatePrice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

export default function PaymentPage() {
    const router = useRouter();

    const { cartItems } = useCart();

    const [showModal, setShowModal] = useState(false);

    const amount = useMemo(() => cartCalculatePrice(cartItems), []);

    const handleConfirmPaying = () => {
        router.push('/confirmed');
    };

    const handlePushCheckout = () => {
        router.push('/checkout');
    };

    const handleToggleShowModal = () => {
        setShowModal(!showModal);
    };

    console.log(cartItems);

    return (
        <div className="min-h-full">
            <div className="container mx-auto relative px-6 pt-8 sm:px-16 sm:pt-10 lg:px-32 lg:pt-12">
                <h1 className="text-4xl font-bold mb-6">Checkout</h1>
                <div className="block md:flex mb-3 justify-between">
                    <div className="order-last mb-10 p-4 border-l-white">
                        {cartItems.map((item) => (
                            <div className="flex my-2" key={item.product.id}>
                                <div className="flex items-center justify-between">
                                    <Image
                                        className="rounded-md overflow-hidden mx-4 w-24 h-24"
                                        src={item.product.image}
                                        alt=""
                                    />

                                    <h4 className="text-xl mx-4 text-white">{item.product.title}</h4>
                                    <p className="mx-4">
                                        <span className="text-lg text-white">${item.product.price}</span>
                                    </p>
                                </div>
                            </div>
                        ))}

                        <div className="mt-20">
                            <div className="flex items-center justify-between border-t-2 py-2">
                                <span className="font-bold text-white text-2xl">Shipping</span>
                                <span className="font-bold text-white text-lg">$19</span>
                            </div>
                            <div className="flex items-center justify-between border-t-2 py-2">
                                <span className="font-bold text-white text-2xl">Total</span>
                                <span className="font-bold text-white text-lg">
                                    {amount.dividedBy(1000).toString()} SOL
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-4xl mr-5 lg:mr-10">
                        <form name="checkoutForm">
                            <h3 className="text-lg font-bold mb-3">Contact information</h3>
                            <div className="relative mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-white leading-tight border-gray-800 focus:outline-none focus:shadow-outline font-semibold"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email..."
                                    required
                                />
                            </div>
                            <div className="relative mb-10">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                    Phone
                                </label>
                                <input
                                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-white leading-tight border-gray-800 focus:outline-none focus:shadow-outline font-semibold"
                                    id="phone"
                                    type="number"
                                    placeholder="Enter your phone..."
                                    required
                                />
                            </div>

                            <h3 className="text-lg font-bold mt-2 mb-3">Shipping address</h3>
                            <div className="relative mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                                    Full name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-white leading-tight border-gray-800 focus:outline-none focus:shadow-outline font-semibold"
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="relative mb-4">
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="address">
                                    Address
                                </label>
                                <input
                                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-white leading-tight border-gray-800 focus:outline-none focus:shadow-outline font-semibold"
                                    id="address"
                                    type="text"
                                    placeholder="Your address..."
                                    required
                                />
                            </div>

                            <div className="flex mb-4">
                                <div className="relative flex-1">
                                    <label className="block text-white text-sm font-semibold mb-2" htmlFor="country">
                                        Country
                                    </label>
                                    <select
                                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-white leading-tight border-gray-800 focus:outline-none focus:shadow-outline font-semibold"
                                        id="country"
                                        required
                                    >
                                        <option>Vietnam</option>
                                        <option>USA</option>
                                        <option>Singapore</option>
                                    </select>
                                </div>
                                <div className="relative ml-6 flex-1">
                                    <label
                                        className="block text-gray-700 text-sm font-semibold mb-2"
                                        htmlFor="postal-code"
                                    >
                                        Postal Code
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-white leading-tight border-gray-800 focus:outline-none focus:shadow-outline placeholder-gray-500 font-semibold"
                                        type="text"
                                        id="postal-code"
                                        placeholder="Your postal code..."
                                        required
                                    />
                                </div>
                            </div>
                        </form>

                        <div className="flex justify-end">
                            <button
                                onClick={handlePushCheckout}
                                className="px-8 py-2 mx-1 bg-orange-500 text-white font-semibold rounded-lg"
                                id="submitted"
                            >
                                Pay full by QR {amount.dividedBy(23).toFixed(2).toString()} Sol
                            </button>
                            <button
                                onClick={handleConfirmPaying}
                                className="px-8 py-2 mx-1 bg-orange-500 text-white font-semibold rounded-lg"
                                id="submitted"
                            >
                                Pay full {amount.dividedBy(23).toFixed(2).toString()} Sol
                            </button>
                            <button
                                dataModal-target="progress-modal"
                                data-modal-toggle="progress-modal"
                                className="px-6 py-2 mx-1 bg-orange-500 text-white font-semibold rounded-lg"
                                type="button"
                                onClick={handleToggleShowModal}
                            >
                                Pay in 4
                                {amount
                                    .dividedBy(23 * 4)
                                    .toFixed(2)
                                    .toString()}
                                Sol
                            </button>
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={showModal}
                    onClose={handleToggleShowModal}
                    total={`${amount.dividedBy(23).toFixed(2).toString()}` + ' Sol'}
                    each={
                        `${amount
                            .dividedBy(23 * 4)
                            .toFixed(2)
                            .toString()}` + ' Sol'
                    }
                />
            </div>
        </div>
    );
}
