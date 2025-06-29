import MovieList from '@/components/pages/HomePage/MovieList';

import s from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={s.root}>
      <h1 className={s.title}>Movie list</h1>
      <MovieList />
    </div>
  );
};

export default HomePage;
