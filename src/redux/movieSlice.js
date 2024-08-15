import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
  filteredMovies: [],
  categories: [],
  perPage: 4,
  currentPage: 1,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    fetchMovies(state, action) {
      state.movies = action.payload;
      state.filteredMovies = action.payload;
      state.categories = [...new Set(state.movies.map((movie) => movie.category))];
    },
    addLike(state, action) {
      const movie = state.movies.find((movie) => movie.id === action.payload);
      if (movie) {
        movie.likes += 1;
      }
      const filteredMovie = state.filteredMovies.find((movie) => movie.id === action.payload);
      if (filteredMovie) {
        filteredMovie.likes += 1;
      }
    },
    addDislike(state, action) {
      const movie = state.movies.find((movie) => movie.id === action.payload);
      if (movie) {
        movie.dislikes += 1;
      }
      const filteredMovie = state.filteredMovies.find((movie) => movie.id === action.payload);
      if (filteredMovie) {
        filteredMovie.dislikes += 1;
      }
    },
    deleteMovie(state, action) {
      state.movies = state.movies.filter((movie) => movie.id !== action.payload);
      state.filteredMovies = state.filteredMovies.filter((movie) => movie.id !== action.payload);
      state.categories = [...new Set(state.movies.map((movie) => movie.category))];
    },
    filterMovies(state, action) {
      const selectedCategories = action.payload;
      state.filteredMovies = state.movies.filter((movie) =>
        selectedCategories.length === 0 ? true : selectedCategories.includes(movie.category)
      );
    },
    setPerPage(state, action) {
      state.perPage = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  fetchMovies,
  addLike,
  addDislike,
  deleteMovie,
  filterMovies,
  setPerPage,
  setCurrentPage,
} = movieSlice.actions;

export default movieSlice.reducer;
