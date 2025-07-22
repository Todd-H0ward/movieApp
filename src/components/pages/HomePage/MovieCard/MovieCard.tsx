'use client';

import { clsx } from 'clsx';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

import type { Movie } from '@/types/Movie';

import Button from '@/components/commons/Button';
import Rating from '@/components/commons/Rating';

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

  const { name, originalName, year, countries, genres, director, rating, image } = movie;

  return (
    <li className={clsx(s.root, className)}>
      <Rating className={s.rating} rating={rating} />
      <div className={s.wrapper}>
        <Image className={s.image} src={image} width={380} height={450} alt={name} />
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
        <Button className={s.btn} onClick={handleQuickViewClick}>
          <Search className={s.icon} />
          <span className={s.btnText}>Быстрый просмотр</span>
        </Button>
      </div>
    </li>
  );
};

export default MovieCard;
