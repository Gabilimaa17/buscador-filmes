import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import restMovieApi from '../api/tmdb';
import styles from './MovieDetails.module.css';

export function MovieDetails() {
    // ATENÇÃO: Garanta que o parâmetro na rota seja ":id" (ex: /movie/:id)
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            // Evita disparar a requisição caso o ID seja undefined/nulo
            if (!id) return;

            setLoading(true);
            try {
                // Correção do endpoint da TMDB para filmes: /movie/{id}
                const response = await restMovieApi.get(`/movie/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do filme', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) return <p className={styles.loadingText}>Carregando dados do filme...</p>;
    if (!movie) return <p className={styles.loadingText}>Filme não encontrado.</p>;

    // Formatação de dados reais do TMDB
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/300x450';

    const genres = movie.genres?.map((g) => g.name).join(', ') || 'N/A';
    const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
    const releaseDate = movie.release_date
        ? new Date(movie.release_date).toLocaleDateString('pt-BR')
        : 'N/A';
    const voteAverage = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Link to="/" className={styles.backLink}>
                    &larr; Voltar para Explorar
                </Link>

                <div className={styles.content}>
                    <div className={styles.imagesContainer}>
                        <img
                            src={posterUrl}
                            alt={`Cartaz do filme ${movie.title}`}
                            className={styles.flag}
                        />
                    </div>

                    <div className={styles.infoContainer}>
                        <h1 className={styles.movieName}>{movie.title}</h1>
                        {movie.tagline && <p className={styles.officialName}>"{movie.tagline}"</p>}

                        <div className={styles.badges}>
                            <span className={styles.genresBadge}>📍 {genres}</span>
                            <span className={styles.categoriaBadge}>⭐ {voteAverage} / 10</span>
                        </div>

                        <div className={styles.detailsList}>
                            <div className={styles.detailItem}>
                                <strong className={styles.detailLabel}>📝 Sinopse:</strong>
                                <span className={styles.detailValue}>
                                    {movie.overview || 'Sem sinopse disponível.'}
                                </span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong className={styles.detailLabel}>📅 Lançamento:</strong>
                                <span className={styles.detailValue}>{releaseDate}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <strong className={styles.detailLabel}>⏱️ Duração:</strong>
                                <span className={styles.detailValue}>{runtime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
