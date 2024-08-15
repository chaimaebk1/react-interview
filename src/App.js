// App.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchMovies,
  addLike,
  addDislike,
  deleteMovie,
  filterMovies,
  setPerPage,
  setCurrentPage,
} from './redux/movieSlice';
import MovieList from './Components/MovieList';
import Pagination from './Components/Pagination';
import Filter from './Components/MovieFilter';
import './App.css';
import movies$ from './movies'; // Import the promise from movies.js

function App() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.filteredMovies);
  const categories = useSelector((state) => state.movies.categories);
  const perPage = useSelector((state) => state.movies.perPage);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    movies$.then((moviesData) => {
      dispatch(fetchMovies(moviesData));
    });
  }, [dispatch]);

  const handleLike = (id) => {
    dispatch(addLike(id));
  };

  const handleDislike = (id) => {
    dispatch(addDislike(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    let updatedCategories;
  
    if (e.target.checked) {
      updatedCategories = [...selectedCategories, value];
    } else {
      updatedCategories = selectedCategories.filter((cat) => cat !== value);
    }
  
    setSelectedCategories(updatedCategories);
    dispatch(filterMovies(updatedCategories));
  };

  const handlePerPageChange = (e) => {
    dispatch(setPerPage(parseInt(e.target.value, 10)));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const totalPages = Math.ceil(movies.length / perPage);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Movie List</h1>
        <h2>Your favorite movies at a glance</h2>
      </header>
      <Filter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />
      <div className="per-page-container">
        <label htmlFor="perPage">Items per page:</label>
        <select id="perPage" onChange={handlePerPageChange}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </div>
      <MovieList
        movies={movies.slice((currentPage - 1) * perPage, currentPage * perPage)}
        onLike={handleLike}
        onDislike={handleDislike}
        onDelete={handleDelete}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
