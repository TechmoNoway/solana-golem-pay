import { FC, Key, useState, useEffect } from 'react';

export const ShopScene: FC = () => {
    const [paymentPlan, setPaymentPlan] = useState('full');

    const products = [
        { name: 'Product 1', price: 100 },
        { name: 'Product 2', price: 200 },
        { name: 'Product 3', price: 300 },
        { name: 'Product 4', price: 400 },
    ];

    const total = products.reduce((sum, p) => sum + p.price, 0);

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            <div className="mb-4">
                <label className="inline-radio">
                    <input
                        type="radio"
                        name="plan"
                        checked={paymentPlan === 'full'}
                        onChange={() => setPaymentPlan('full')}
                    />
                    <span className="ml-2">Pay full amount (${total})</span>
                </label>

                <label className="inline-radio">
                    <input
                        type="radio"
                        name="plan"
                        checked={paymentPlan === 'split'}
                        onChange={() => setPaymentPlan('split')}
                    />
                    <span className="ml-2">Split payment into 4 installments</span>
                </label>
            </div>

            {paymentPlan === 'full' ? (
                <div className="border p-4">
                    <p>Full amount: ${total}</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => alert('Processing full payment...')}
                    >
                        Pay Now
                    </button>
                </div>
            ) : (
                <div className="border p-4 space-y-4">
                    {products.map((p) => (
                        <div key={p.name}>
                            <p>
                                {p.name}: ${p.price}
                            </p>
                            <button
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                onClick={() => alert(`Processing payment for ${p.name}`)}
                            >
                                Pay Installment
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
