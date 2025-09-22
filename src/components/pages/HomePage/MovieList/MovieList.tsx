import { motion, AnimatePresence } from 'framer-motion';
import { Inbox, SearchX } from 'lucide-react';
import { useSelector } from 'react-redux';

import Loader from '@/components/commons/Loader';
import MovieCard from '@/components/pages/HomePage/MovieCard';

import { selectIsLoading, selectSearch, selectSearchedMovies } from '@/store/selectors/movieSelectors.ts';

import s from './MovieList.module.scss';

const MovieList = () => {
  const movies = useSelector(selectSearchedMovies);
  const search = useSelector(selectSearch);
  const isLoading = useSelector(selectIsLoading);

  const hintAnimation = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (isLoading) {
    return (
      <div className={s.loader}>
        <Loader />
      </div>
    );
  }

  if (!movies.length && search) {
    return (
      <motion.div className={s.hint} initial="hidden" animate="visible" variants={hintAnimation}>
        <SearchX size={64} />
        <p>Фильмы по Вашему запросу не найдены</p>
      </motion.div>
    );
  }

  if (!movies.length) {
    return (
      <motion.div className={s.hint} initial="hidden" animate="visible" variants={hintAnimation}>
        <Inbox size={64} />
        <p>Здесь пока что ничего нет</p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.ul
        className={s.root}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              when: 'beforeChildren',
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default MovieList;
