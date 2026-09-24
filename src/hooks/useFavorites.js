import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'RESTMOVIE_FAVORITES_SAVE';

export function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem(FAVORITES_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (movie) => {
        // A API usa 'id' como código identificador único (ex: BRA, USA)
        const isFav = favorites.find((c) => c.id === movie.id);
        if (isFav) {
            setFavorites(favorites.filter((c) => c.id !== movie.id));
        } else {
            setFavorites([...favorites, movie]);
        }
    };

    const isFavorite = (movieCode) => {
        return favorites.some((c) => c.id === movieCode);
    };

    return { favorites, toggleFavorite, isFavorite };
}
