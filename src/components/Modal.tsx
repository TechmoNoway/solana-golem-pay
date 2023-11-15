import { useState, useEffect } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ isOpen, onClose }: Props) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            return;
        }

        const timeout = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timeout);
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div
                    className={`fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ${
                        isAnimating ? 'ease-out' : 'ease-in'
                    }`}
                    onClick={onClose}
                >
                    <div className="p-6 max-w-sm mx-auto rounded-xl bg-white" onClick={(e) => e.stopPropagation()}>
                        Modal content
                    </div>
                </div>
            )}
        </>
    );
}
