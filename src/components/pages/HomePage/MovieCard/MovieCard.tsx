import { clsx } from 'clsx';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';

import type { Movie } from '@/types/entities/Movie';

import Button from '@/components/commons/Button';

import { setQuickViewMovieId } from '@/store/slices/movieSlice.ts';

import type { MouseEvent } from 'react';

import s from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard = ({ movie, className }: MovieCardProps) => {
  const dispatch = useDispatch();

  const handleQuickViewClick = (e: MouseEvent) => {
    e.stopPropagation();

    dispatch(setQuickViewMovieId(movie.id));
  };

  const { name, originalName, year, countries, genres, director, image } = movie;

  return (
    <li className={clsx(s.root, className)}>
      <div className={s.wrapper}>
        <img className={s.image} src={image} alt={name} />
      </div>
      <div className={s.description}>
        <h2 className={s.title}>{name}</h2>
        <ul className={s.info}>
          <li>Оригинальное название: {originalName}</li>
          <li>Год выхода: {year}</li>
          <li>
            {countries[0]} - {genres[0]}
          </li>
          <li>Режиссёр: {director}</li>
        </ul>
        <Button onClick={handleQuickViewClick}>
          <Search />
          Быстрый просмотр
        </Button>
      </div>
    </li>
  );
};

export default MovieCard;
