import { MovieCard } from '../components/MovieCard';
import { useFavorites } from '../hooks/useFavorites';
import styles from './Favorite.module.css';

export function Favorites() {
    const { favorites, isFavorite, toggleFavorite } = useFavorites();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Meus Filmes Favoritos</h1>

            {favorites.length === 0 ? (
                <div className={styles.emptyState}>
                    <h2 className={styles.emptyStateTitle}>
                        Você ainda não adicionou nenhum filme à sua lista.
                    </h2>
                    <p className={styles.emptyStateText}>
                        Clique na estrela (★) nos filmes da página inicial para salvá-los aqui.
                    </p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {favorites.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isFavorite={isFavorite(movie.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
