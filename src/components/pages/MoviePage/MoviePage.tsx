import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import Layout from '@/components/commons/Layout';
import Rating from '@/components/commons/Rating';
import MovieInfoList from '@/components/pages/MoviePage/MovieInfoList';

import { selectMovies } from '@/store/selectors/movieSelectors.ts';

import { ROUTES } from '@/constants/routes.ts';

import s from './MoviePage.module.scss';

const MoviePage = () => {
  const movieId = useRouter().query.movieId as string;
  const movies = useSelector(selectMovies);

  const movie = movies.find(({ id }) => id === movieId);

  if (!movie) {
    return null;
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
          <Rating className={s.rating} rating={movie.rating} />
        </header>
        <h2 className={s.originalName}>{originalName}</h2>

        <h3 className={s.title}>О фильме</h3>
        <MovieInfoList movie={movie} />

        <h3 className={s.title}>Описание</h3>
        <p className={s.description}>{movie.description}</p>
      </section>
    </Layout>
  );
};

export default MoviePage;
