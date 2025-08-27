import DeleteMovieModal from '@/components/commons/DeleteMovieModal';
import EditMovieModal from '@/components/commons/EditMovieModal';
import Layout from '@/components/commons/Layout';
import AddMovieModal from '@/components/pages/HomePage/AddMovieModal';
import MovieList from '@/components/pages/HomePage/MovieList';
import MovieSearch from '@/components/pages/HomePage/MovieSearch';
import ViewMovieModal from '@/components/pages/HomePage/ViewMovieModal';

import s from './HomePage.module.scss';

const HomePage = () => {
  return (
    <Layout className={s.root}>
      <div className={s.header}>
        <h1 className={s.title}>Movie list</h1>
        <AddMovieModal />
      </div>
      <MovieSearch />
      <MovieList />
      <ViewMovieModal />
      <EditMovieModal />
      <DeleteMovieModal />
    </Layout>
  );
};

export default HomePage;
