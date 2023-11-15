import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    total: string;
    each: string;
}

export default function Modal({ isOpen, onClose, total, each }: Props) {
    const [isAnimating, setIsAnimating] = useState(false);

    const [firstWeek, setFirstWeek] = useState('');
    const [secondWeek, setSecoundWeek] = useState('');
    const [thirtWeek, setThirtWeek] = useState('');

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            return;
        }

        const timeout = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timeout);
    }, [isOpen]);

    useEffect(() => {
        const today = new Date();
        const week1 = new Date();
        const week2 = new Date();
        const week3 = new Date();
        week1.setDate(today.getDate() + 14);
        week2.setDate(today.getDate() + 28);
        week3.setDate(today.getDate() + 42);

        setFirstWeek(week1.toLocaleDateString('en-GB'));
        setSecoundWeek(week2.toLocaleDateString('en-GB'));
        setThirtWeek(week3.toLocaleDateString('en-GB'));
    }, []);

    const router = useRouter();

    const handleConfirmPaying = () => {
        router.push('/confirmed');
    };

    return (
        <>
            {isOpen && (
                <div
                    className={`fixed z-50 flex items-center justify-center inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ${
                        isAnimating ? 'ease-out' : 'ease-in'
                    }`}
                    onClick={onClose}
                >
                    <div
                        className="p-6 mx-auto rounded-md bg-white"
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: '600px', height: '450px' }}
                    >
                        <h2 className="text-black font-semibold text-3xl mb-4 border-b-1 border-gray-200">
                            Complete Payment
                        </h2>
                        <div className="text-black flex justify-between items-center mt-5 p-3">
                            <h4 className="text-lg font-medium">Total price</h4>
                            <h3 className="text-lg text-blue-500 font-medium">{total}</h3>
                        </div>
                        <div className="text-black flex justify-between items-center mt-8 p-2">
                            <h4 className="text-lg font-medium">Initial payment</h4>
                            <p className="text-lg text-blue-500 font-medium">{each}</p>
                        </div>
                        <div className="text-black flex justify-between items-center p-2">
                            <h4 className="text-lg font-medium">{firstWeek}</h4>
                            <p>{each}</p>
                        </div>
                        <div className="text-black flex justify-between items-center p-2">
                            <h4 className="text-lg font-medium">{secondWeek}</h4>
                            <p>{each}</p>
                        </div>
                        <div className="text-black flex justify-between items-center p-2">
                            <h4 className="text-lg font-medium">{thirtWeek}</h4>
                            <p>{each}</p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="px-8 py-2 bg-orange-500 text-white font-semibold rounded-lg"
                                id="submitted"
                                onClick={handleConfirmPaying}
                            >
                                Pay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
