import { FC } from 'react';
import Link from 'next/link';
import Text from './Text';
import NavElement from './nav-element';
interface Props {
    children: React.ReactNode;
}

export const ContentContainer: FC<Props> = ({ children }) => {
    return (
        <div className="flex-1 mt-28 bg-black">
            <div className="items-center drawer-content">{children}</div>
        </div>
    );
};
