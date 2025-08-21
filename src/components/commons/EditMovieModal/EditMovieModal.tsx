'use client';

import { type MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AddMovieSchema } from '@/types/AddMovieSchema.ts';

import Button from '@/components/commons/Button';
import Modal from '@/components/commons/Modal';
import MovieForm from '@/components/commons/MovieForm';

import { selectEditMovie } from '@/store/selectors/movieSelectors.ts';
import { deleteMovie, editMovie, setEditMovie } from '@/store/slices/movieSlice.ts';

import s from './EditMovieModal.module.scss';

interface EditMovieModalProps {
  onDelete?: () => void;
}

const EditMovieModal = ({ onDelete }: EditMovieModalProps) => {
  const movie = useSelector(selectEditMovie);
  const dispatch = useDispatch();

  const onModalClose = () => {
    dispatch(setEditMovie(null));
  };

  const onSubmit = (data: AddMovieSchema) => {
    if (!movie) return;

    dispatch(
      editMovie({
        id: movie.id,
        ...data,
      }),
    );
    onModalClose();
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
    <Modal isOpen={!!movie} onClose={onModalClose} title="Редактировать фильм">
      <MovieForm
        movie={movie}
        onSubmit={onSubmit}
        footer={
          <div className={s.controls}>
            <Button type="submit">Сохранить</Button>
            <Button onClick={handleDelete} type="button" variant="filled">
              Удалить
            </Button>
          </div>
        }
      />
    </Modal>
  );
};

export default EditMovieModal;
