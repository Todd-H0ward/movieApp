import clsx from 'clsx';

import { Movie } from '@/types/Movie.ts';

import Badge from '@/components/commons/Badge';

import s from './MovieInfoList.module.scss';

interface MovieAboutListProps {
  movie: Movie;
  className?: string;
}

const MovieInfoList = ({ movie, className }: MovieAboutListProps) => {
  return (
    <ul className={clsx(s.root, className)}>
      <li className={s.item}>
        <span>Год выхода:</span> {movie.year}
      </li>
      <li className={s.item}>
        <span>Страна:</span>
        {movie.countries.map((country) => (
          <Badge key={country}>{country}</Badge>
        ))}
      </li>
      <li className={s.item}>
        <span>Жанры:</span>
        {movie.genres.map((genre) => (
          <Badge key={genre}>{genre}</Badge>
        ))}
      </li>
      <li className={s.item}>
        <span>Режиссёр:</span> {movie.director}
      </li>
    </ul>
  );
};

export default MovieInfoList;
