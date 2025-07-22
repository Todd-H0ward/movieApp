'use client';

import { clsx } from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import Badge from '@/components/commons/Badge';
import Modal from '@/components/commons/Modal';
import Rating from '@/components/commons/Rating';

import { selectQuickViewMovie } from '@/store/selectors/movieSelectors.ts';
import { setQuickViewMovieId } from '@/store/slices/movieSlice.ts';

import s from './ViewMovieModal.module.scss';

const ViewMovieModal = () => {
  const movie = useSelector(selectQuickViewMovie);
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(setQuickViewMovieId(null));
  };

  return (
    <Modal isOpen={!!movie} onClose={onClose} title="О фильме">
      {movie && (
        <div className={s.root}>
          <ul className={s.info}>
            <li className={s.item}>
              <span className={s.name}>Название:</span> {movie.name}
            </li>
            <li className={s.item}>
              <span className={s.name}>Оригинальное название:</span> {movie.originalName}
            </li>
            <li className={s.item}>
              <span className={s.name}>Год выхода:</span> {movie.year}
            </li>
            <li className={s.item}>
              <span className={s.name}>Страна:</span>
              {movie.countries.map((country) => (
                <Badge key={country}>{country}</Badge>
              ))}
            </li>
            <li className={s.item}>
              <span className={s.name}>Жанры:</span>
              {movie.genres.map((genre) => (
                <Badge key={genre}>{genre}</Badge>
              ))}
            </li>
            <li className={s.item}>
              <span className={s.name}>Режиссёр:</span> {movie.director}
            </li>
            <li className={clsx(s.item, s.rating)}>
              <span className={s.name}>Рейтинг:</span> <Rating className={s.ratingValue} rating={movie.rating} />
            </li>
            <li className={s.item}>
              <span className={s.name}>Описание:</span> {movie.description}
            </li>
          </ul>
        </div>
      )}
    </Modal>
  );
};

export default ViewMovieModal;
