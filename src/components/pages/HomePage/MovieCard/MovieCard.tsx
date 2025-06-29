import { clsx } from 'clsx';

import type { Movie } from '@/types/entities/Movie';
import Badge from '@/components/commons/Badge';

import s from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard = ({ movie, className }: MovieCardProps) => {
  return (
    <li className={clsx(s.root, className)}>
      <div className={s.wrapper}>
        <img className={s.image} src={movie.image} alt={movie.name} />
      </div>
      <div className={s.description}>
        <h2 className={s.title}>{movie.name}</h2>
        <ul className={s.info}>
          <li>Оригинальное название: {movie.originalName}</li>
          <li>Год выхода: {movie.year}</li>
          <li>
            Страна:
            {movie.countries.map((country) => (
              <Badge key={country}>{country}</Badge>
            ))}
          </li>
          <li>
            Жанры:
            {movie.genres.map((genre) => (
              <Badge key={genre}>{genre}</Badge>
            ))}
          </li>
          <li>Режиссёр: {movie.director}</li>
        </ul>
      </div>
    </li>
  );
};

export default MovieCard;
