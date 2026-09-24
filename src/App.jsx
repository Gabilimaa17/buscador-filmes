import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MovieDetails } from './pages/MovieDetails';
import { Favorites } from './pages/FavoriteS.jsx';
import { Navbar } from './components/Navbar.jsx';
import styles from './App.module.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className={styles.container}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/filmes/:id" element={<MovieDetails />} />
                    <Route path="/favoritos" element={<Favorites />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
