// MovieList.js
import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, onLike, onDislike, onDelete }) {
  return (
    <div className="movies-container">
      {/* // eslint-disable-next-line */}
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onLike={onLike}
          onDislike={onDislike}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MovieList;
