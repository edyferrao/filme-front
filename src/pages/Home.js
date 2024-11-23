import React, { useState } from 'react';
import MovieList from '../components/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const searchMovies = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=48aa722f&s=${query}`);
      const data = await response.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error('Erro pegando dados:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Filmes IMDb</h1>
      <form onSubmit={searchMovies} className="search-bar">
        <input
          type="text"
          placeholder="Pesquise por filmes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </form>
      {loading ? <p>Lendo...</p> : <MovieList movies={movies} />}
    </div>
  );
};

export default Home;
