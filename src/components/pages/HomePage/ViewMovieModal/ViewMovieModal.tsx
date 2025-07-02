import { useDispatch, useSelector } from 'react-redux';

import Badge from '@/components/commons/Badge';
import Modal from '@/components/commons/Modal';

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
            <li>Название: {movie.name}</li>
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
      )}
    </Modal>
  );
};

export default ViewMovieModal;
