import type { MainNavItem } from '../types';

export type SiteConfig = typeof siteConfig;

const links = {
    twitter: 'https://twitter.com/ioriya3',
    github: 'https://github.com/iorise',
    discord: 'https://discord.com/users/iori',
    facebook: 'https://www.facebook.com/profile.php?id=100025999413205',
    rickroll: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
};

export const sortOptions = [
    {
        label: 'Date: Old to new',
        value: 'asc',
    },
    {
        label: 'Date: New to old',
        value: 'desc',
    },
];

export const siteConfig = {
    name: 'Golem Pay',
    mainNav: [
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: 'Jewelery',
            href: '/categories/jewelery',
        },
        {
            title: 'Electronics',
            href: '/categories/electronics',
        },
        {
            title: "Women's clothing",
            href: "/categories/women's clothing",
        },
        {
            title: "Men's clothing",
            href: "/categories/men's clothing",
        },
    ] as MainNavItem[],

    footer: [
        {
            title: 'Twitter',
            href: links.twitter,
            external: true,
        },
        {
            title: 'Github',
            href: links.github,
            external: true,
        },
        {
            title: 'Facebook',
            href: links.facebook,
            external: true,
        },
        {
            title: 'Youtube',
            href: links.rickroll,
            external: true,
        },
    ],
};
