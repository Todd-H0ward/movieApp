import { ArrowLeft, Edit } from 'lucide-react';
import Error from 'next/error';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/commons/Button';
import EditMovieModal from '@/components/commons/EditMovieModal';
import Layout from '@/components/commons/Layout';
import Rating from '@/components/commons/Rating';
import MovieInfoList from '@/components/pages/MoviePage/MovieInfoList';
import NotFoundPage from '@/components/pages/NotFoundPage';

import { selectMovies } from '@/store/selectors/movieSelectors.ts';
import { setEditMovie } from '@/store/slices/movieSlice.ts';

import { ROUTES } from '@/constants/routes.ts';

import s from './MoviePage.module.scss';

const MoviePage = () => {
  const router = useRouter();
  const movies = useSelector(selectMovies);
  const dispatch = useDispatch();

  const movieId = router.query.movieId as string;
  const movie = movies.find(({ id }) => id === movieId);

  if (!movie) {
    return <NotFoundPage />;
  }

  const { image, name, originalName } = movie;

  return (
    <Layout className={s.root}>
      <Link className={s.link} href={ROUTES.HOME}>
        <ArrowLeft /> Вернуться к фильмам
      </Link>
      <Image
        className={s.image}
        src={image}
        alt={movie.name}
        width={375}
        height={550}
        sizes="(max-width: 768px) 100vw, 375px"
      />
      <section className={s.info}>
        <header className={s.header}>
          <h1 className={s.name}>{name}</h1>
          <Button className={s.btn} variant="icon" onClick={() => dispatch(setEditMovie(movie))}>
            <Edit />
          </Button>
          <Rating className={s.rating} rating={movie.rating} />
        </header>
        <h2 className={s.originalName}>{originalName}</h2>

        <h3 className={s.title}>О фильме</h3>
        <MovieInfoList movie={movie} />

        <h3 className={s.title}>Описание</h3>
        <p className={s.description}>{movie.description}</p>
      </section>
      <EditMovieModal />
    </Layout>
  );
};

export default MoviePage;
