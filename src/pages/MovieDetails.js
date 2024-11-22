import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=48aa722f&i=${id}`);
        const data = await response.json();
        setMovie(data);
        document.title = data.Title || 'Detalhes do filme';
      } catch (error) {
        console.error('Erro encontrando detalhes do filme:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
    return () => {
        document.title = 'Filmes IMDb';
      };
  }, [id]);

  if (loading) return <p>Lendo...</p>;
  if (!movie) return <p>Filme não encontrado</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
        ← Voltar para o inicio
      </Link>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h1>{movie.Title}</h1>
        <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'} alt={movie.Title} />
        <p><strong>Ano:</strong> {movie.Year}</p>
        <p><strong>Genero:</strong> {movie.Genre}</p>
        <p><strong>Diretor:</strong> {movie.Director}</p>
        <p><strong>Trama:</strong> {movie.Plot}</p>
        <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
