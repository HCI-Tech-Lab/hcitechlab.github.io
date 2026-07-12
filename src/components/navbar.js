import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NavBar = () => {
    const router = useRouter();

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
        <nav className = "navbar navbar-expand-lg navbar-light px-3 fixed-top bg-white shadow-sm">

        <div className = "container">
                
                <Link href = '/' className = 'navbar-brand'>
                    <img alt = "logo" src = "/Logo_White.png" width = {240} height = {60} className = "d-none d-sm-block"/>
                    <img alt = "small" src="/Logo_White.png" width = {200} height = {50} className="small d-block d-sm-none" />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                   <ul className="navbar-nav gap-3" style={{ marginLeft: '4rem' }}>
                    {[
                        { path: '/news', label: 'NEWS' },
                        { path: '/team', label: 'TEAM' },
                        { path: '/publications', label: 'PUBLICATIONS' },
                        { path: '/projects', label: 'PROJECTS' },
                        { path: '/courses', label: 'COURSES' },
                        { path: '/gallery', label: 'GALLERY' },
                        { path: '/contact', label: 'CONTACT' },
                    ].map((item) => (
                    <li className="nav-item" key = {item.path}> <Link href={item.path} className={`nav-link ${isActive(item.path) ? "active" : ""}`}> {item.label} </Link> </li>
                    ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;