import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';

// Top menu. An item with `children` renders as a dropdown.
const MENU = [
    { path: '/team', label: 'TEAM' },
    { path: '/publications', label: 'PUBLICATIONS' },
    {
        label: 'RESEARCH',
        children: [
            { path: '/research-overview', label: 'Overview' },
            { path: '/research-highlights', label: 'Highlights' },
            { path: '/projects', label: 'Projects' },
        ],
    },
    {
        label: 'STORIES',
        children: [
            { path: '/news', label: 'News' },
            { path: '/gallery', label: 'Gallery' },
        ],
    },
    { path: '/courses', label: 'COURSES' },
    { path: '/contact', label: 'CONTACT' },
];

const NavBar = () => {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(null); // label of the open dropdown, if any
    const navRef = useRef(null);

    // Close any open dropdown on navigation or when clicking outside the navbar
    useEffect(() => {
        const close = () => setOpenMenu(null);
        const onDocClick = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) close();
        };
        router.events.on('routeChangeStart', close);
        document.addEventListener('click', onDocClick);
        return () => {
            router.events.off('routeChangeStart', close);
            document.removeEventListener('click', onDocClick);
        };
    }, [router.events]);

    // Close the mobile collapse menu whenever the user navigates to a new page.
    // Next.js does client-side navigation (no reload), so Bootstrap's menu
    // would otherwise stay open after a tap.
    useEffect(() => {
        const closeMenu = () => {
            const menu = document.getElementById('navbarResponsive');
            if (!menu || !menu.classList.contains('show')) return;
            const bs = typeof window !== 'undefined' ? window.bootstrap : null;
            if (bs && bs.Collapse) {
                // Use Bootstrap's API: animates and syncs the toggler state
                bs.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
            } else {
                // Fallback if the Bootstrap bundle hasn't loaded yet
                menu.classList.remove('show');
            }
        };
        router.events.on('routeChangeStart', closeMenu);
        return () => router.events.off('routeChangeStart', closeMenu);
    }, [router.events]);

    // Normalize: strip trailing slashes and .html so it works on GitHub Pages static export
    const normalize = (p) =>
        (p || '/').replace(/\.html$/, '').replace(/\/+$/, '') || '/';

    // router.pathname is the route pattern (e.g. '/publications'); asPath is the browser URL
    const currentPath = normalize(router.asPath ? router.asPath.split('?')[0].split('#')[0] : router.pathname);

    const isActive = (itemPath) =>
        currentPath === itemPath || currentPath.startsWith(itemPath + '/');

    return (
        <nav ref={navRef} className = "navbar navbar-expand-xl navbar-light px-3 fixed-top bg-white shadow-sm">

        <div className = "container">
                
                <Link href = '/' className = 'navbar-brand'>
                    <img alt = "logo" src = "/Logo_White.png" width = {240} height = {60} className = "d-none d-sm-block"/>
                    <img alt = "small" src="/Logo_White.png" width = {200} height = {50} className="small d-block d-sm-none" />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                   <ul className="navbar-nav ms-auto gap-3">
                    {MENU.map((item) => {
                        // Dropdown item (e.g. RESEARCH > Overview / Projects)
                        if (item.children) {
                            const isOpen = openMenu === item.label;
                            const parentActive = item.children.some((c) => isActive(c.path));
                            return (
                                <li className={`nav-item nav-dropdown ${isOpen ? 'open' : ''}`} key={item.label}>
                                    <button
                                        type="button"
                                        className={`nav-link nav-dropdown-toggle ${parentActive ? 'active' : ''}`}
                                        aria-expanded={isOpen}
                                        aria-haspopup="true"
                                        onClick={() => setOpenMenu(isOpen ? null : item.label)}
                                    >
                                        {item.label} <i className="bi bi-chevron-down" aria-hidden="true" />
                                    </button>
                                    <ul className="nav-dropdown-menu">
                                        {item.children.map((child) => (
                                            <li key={child.path}>
                                                <Link
                                                    href={child.path}
                                                    className={`nav-dropdown-item ${isActive(child.path) ? 'current' : ''}`}
                                                >
                                                    {child.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            );
                        }
                        return (
                            <li className="nav-item" key={item.path}>
                                <Link href={item.path} className={`nav-link ${isActive(item.path) ? "active" : ""}`}>{item.label}</Link>
                            </li>
                        );
                    })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;