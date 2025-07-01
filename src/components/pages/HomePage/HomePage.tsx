import AddMovieModal from '@/components/pages/HomePage/AddMovieModal';
import MovieList from '@/components/pages/HomePage/MovieList';

import s from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={s.root}>
      <div className={s.header}>
        <h1 className={s.title}>Movie list</h1>
        <AddMovieModal />
      </div>
      <MovieList />
    </div>
  );
};

export default HomePage;
