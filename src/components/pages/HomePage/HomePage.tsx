import Layout from '@/components/commons/Layout';
import AddMovieModal from '@/components/pages/HomePage/AddMovieModal';
import EditMovieModal from '@/components/pages/HomePage/EditMovieModal';
import MovieList from '@/components/pages/HomePage/MovieList';
import ViewMovieModal from '@/components/pages/HomePage/ViewMovieModal';

import s from './HomePage.module.scss';

const HomePage = () => {
  return (
    <Layout className={s.root}>
      <div className={s.header}>
        <h1 className={s.title}>Movie list</h1>
        <AddMovieModal />
      </div>
      <MovieList />
      <ViewMovieModal />
      <EditMovieModal />
    </Layout>
  );
};

export default HomePage;
