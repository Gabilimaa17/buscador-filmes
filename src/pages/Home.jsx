import { useState, useEffect } from 'react';
import restMovieApi from '../api/tmdb';
import { MovieCard } from '../components/MovieCard';
import { useFavorites } from '../hooks/useFavorites';
import styles from './Home.module.css';

const GENRES = [
    { id: 'popular', name: 'Populares', endpoint: '/movie/popular' },
    { id: '28', name: 'Ação', endpoint: '/discover/movie', params: { with_genres: 28 } },
    { id: '35', name: 'Comédia', endpoint: '/discover/movie', params: { with_genres: 35 } },
    { id: '18', name: 'Drama', endpoint: '/discover/movie', params: { with_genres: 18 } },
    { id: '10749', name: 'Romance', endpoint: '/discover/movie', params: { with_genres: 10749 } },
    {
        id: '878',
        name: 'Ficção Científica',
        endpoint: '/discover/movie',
        params: { with_genres: 878 },
    },
    {
        id: '10751',
        name: 'Infantil',
        endpoint: '/discover/movie',
        params: { with_genres: '16,10751' },
    },
];

export function Home() {
    const [movies, setMovies] = useState([]); // Renomeado para o plural
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(GENRES[0]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Controla o limite total de páginas

    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                // Envia os params de gênero + página
                const response = await restMovieApi.get(activeTab.endpoint, {
                    params: {
                        ...activeTab.params,
                        page: page,
                    },
                });

                // O TMDB retorna a lista em 'results'
                setMovies(response.data.results || []);
                setTotalPages(response.data.total_pages || 1);
            } catch (error) {
                console.error('Erro ao buscar filmes', error);
                setMovies([]); // Garante que continue sendo um array em caso de erro
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [activeTab, page]); // Executa novamente se mudar a aba ou a página

    // Reseta a página para 1 quando trocar de aba
    const handleTabChange = (genre) => {
        setActiveTab(genre);
        setPage(1);
    };

    return (
        <div className="home-page">
            <div className={styles.tabsContainer}>
                {GENRES.map((genre) => (
                    <button
                        key={genre.id}
                        className={`${styles.tabBtn} ${activeTab.id === genre.id ? styles.active : ''}`}
                        onClick={() => handleTabChange(genre)}>
                        {genre.name}
                    </button>
                ))}
            </div>

            <h1 className={styles.title}>Catálogo: {activeTab.name}</h1>

            {loading ? (
                <p className={styles.loadingText}>Carregando filmes...</p>
            ) : (
                <>
                    <div className={styles.grid}>
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id} // Alterado de id para id (padrão TMDB)
                                movie={movie}
                                isFavorite={isFavorite(movie.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>

                    <div className={styles.pagination}>
                        <button
                            type="button"
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={page >= totalPages}
                            className={`${styles.pageButton} ${page >= totalPages ? styles.pageButtonDisabled : ''}`}>
                            Próxima
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
