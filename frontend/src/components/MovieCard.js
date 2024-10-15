import React from 'react';

const MovieCard = ({ movie }) => (
  <div className="movie">
    <h3>{movie.title}</h3>
    {movie.poster && <img src={movie.poster} alt={movie.title} />}
  </div>
);

export default MovieCard;
