'use client';

import { useSelector } from 'react-redux';

import MovieCard from '@/components/pages/HomePage/MovieCard';

import { selectMovies } from '@/store/selectors/movieSelectors.ts';

import s from './MovieList.module.scss';

const MovieList = () => {
  const movies = useSelector(selectMovies);

  return (
    <ul className={s.root}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
