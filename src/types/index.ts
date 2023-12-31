export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    label?: string;
    description?: string;
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type StoredFile = {
    id: number;
    title: string;
    image: string;
};

export type Option = {
    label: string;
    value: string;
};

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export interface CartItemType {
    product: Product;
    quantity: number;
}
