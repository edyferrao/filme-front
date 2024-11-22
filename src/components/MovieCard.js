import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="MovieCard">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'}
          alt={movie.Title}
        />
      </Link>
      <h3>{movie.Title}</h3>
    </div>
  );
};

export default MovieCard;
