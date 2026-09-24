import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

export function MovieCard({ movie, isFavorite, onToggleFavorite }) {
    const title = movie.title || movie.name || 'Título Desconhecido';
    const voteAverage = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    return (
        <div className={styles['movie-card']}>
            <div className={styles['image-container']}>
                {movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`Cartaz do filme ${title}`}
                    />
                ) : (
                    <div className={styles.noImagePlaceholder}>
                        <span>🎬</span>
                        <p>Sem capa</p>
                    </div>
                )}

                <button
                    className={styles['favorite-btn']}
                    onClick={(e) => {
                        e.preventDefault();
                        onToggleFavorite(movie);
                    }}
                    title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}>
                    {isFavorite ? '★' : '☆'}
                </button>

                <div className={styles.overlay}>
                    <h3>{title}</h3>
                    <p>⭐ {voteAverage} / 10</p>
                    <Link to={`/filmes/${movie.id}`} className={styles['details-btn']}>
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
}
