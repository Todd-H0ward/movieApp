import { CircleAlert } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@/components/commons/Button';
import Modal from '@/components/commons/Modal';

import { selectDeleteMovie } from '@/store/selectors/movieSelectors.ts';
import { deleteMovie, setDeleteMovie } from '@/store/slices/movieSlice.ts';

import type { MouseEvent } from 'react';

import s from './DeleteMovieModal.module.scss';

interface DeleteMovieModal {
  onDelete?: () => void;
}

const DeleteMovieModal = ({ onDelete }: DeleteMovieModal) => {
  const movie = useSelector(selectDeleteMovie);
  const dispatch = useDispatch();

  const onModalClose = () => {
    dispatch(setDeleteMovie(null));
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();

    if (movie) {
      dispatch(deleteMovie(movie.id));
      onModalClose();
      onDelete?.();
    }
  };

  return (
    <Modal isOpen={!!movie} onClose={onModalClose} title="Удалить фильм">
      <div className={s.root}>
        <CircleAlert className={s.icon} size={100} />
        <h1 className={s.title}>
          Вы уверены что хотите удалить фильм <span className={s.name}>{movie && movie.name}</span>? Это действие нельзя
          отменить
        </h1>
        <div className={s.controls}>
          <Button onClick={handleDelete}>Удалить</Button>
          <Button variant="filled" onClick={onModalClose}>
            Отменить
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteMovieModal;
