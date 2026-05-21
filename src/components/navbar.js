import Link from 'next/link';
import { usePathname, userPathname } from 'next/navigation';

const NavBar = () => {
    const path = usePathname();

    return (
        <nav className = "navbar navbar-expand-lg navbar-light px-3 fixed-top bg-white shadow-sm">

        <div className = "container">
                
                <Link href = '/' className = 'navbar-brand'>
                    <img alt = "logo" src = "/Logo_White.png" width = {240} height = {60} className = "d-none d-sm-block"/>
                    <img alt = "small" src="/Logo_White.png" width = {200} height = {50} class="small d-block d-sm-none" />
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
                    <li className="nav-item" key = {item.path}> <Link href={item.path} className={`nav-link ${path == item.path ? "active" : ""}`}> {item.label} </Link> </li>
                    ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;