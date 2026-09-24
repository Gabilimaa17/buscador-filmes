import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

export function Navbar() {
    const location = useLocation();

    return (
        <nav className={styles['menu-nav']}>
            <div className={styles.logo}>
                <Link to="/" className={styles['titulo-principal']}>
                    Streamia 🎥
                </Link>
            </div>
            <ul className={styles['nav-links']}>
                <li>
                    <Link
                        to="/"
                        style={{
                            color: location.pathname === '/' ? '#fff' : '#aaa',
                            textDecoration: 'none',
                            fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                            transition: 'color 0.2s',
                        }}>
                        Catálogo
                    </Link>
                </li>
                <li>
                    <Link
                        to="/favoritos"
                        style={{
                            color: location.pathname === '/favoritos' ? '#fff' : '#aaa',
                            textDecoration: 'none',
                            fontWeight: location.pathname === '/favoritos' ? 'bold' : 'normal',
                            transition: 'color 0.2s',
                        }}>
                        Minha Lista
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
