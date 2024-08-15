// MovieCard.js
import React from 'react';
import deleteIcon from '../assets/images/delete.png';

function MovieCard({ movie, onLike, onDislike, onDelete }) {
  return (
    <div className="movie-card">
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-category">{movie.category}</p>
      <div className="like-dislike">
        <button className="like-button" onClick={() => onLike(movie.id)}>👍 {movie.likes}</button>
        <button className="dislike-button" onClick={() => onDislike(movie.id)}>👎 {movie.dislikes}</button>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${(movie.likes / (movie.likes + movie.dislikes)) * 100}%`,
          }}
        ></div>
      </div>
      <button  className="delete-icon" onClick={() => onDelete(movie.id)}>
                <img src={deleteIcon} alt="Delete" />
      </button>
    </div>
  );
}

export default MovieCard;
