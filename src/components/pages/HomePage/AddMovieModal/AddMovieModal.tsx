'use client';

import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import type { AddMovieSchema } from '@/types/AddMovieSchema.ts';

import Button from '@/components/commons/Button';
import Modal from '@/components/commons/Modal';
import MovieForm from '@/components/commons/MovieForm';

import { createMovieRequest } from '@/store/slices/movieSlice.ts';

import s from './AddMovieModal.module.scss';

const AddMovieModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const onModalOpen = () => setIsModalOpen(true);
  const onModalClose = () => setIsModalOpen(false);

  const onSubmit = (data: AddMovieSchema) => {
    const newMovie = {
      id: uuidv4(),
      ...data,
      image: data.image || '',
    };

    dispatch(createMovieRequest(newMovie));
    onModalClose();
  };

  return (
    <>
      <Button onClick={onModalOpen}>
        <CirclePlus /> Добавить фильм
      </Button>
      <Modal isOpen={isModalOpen} onClose={onModalClose} title="Добавить фильм">
        <MovieForm
          onSubmit={onSubmit}
          footer={
            <div className={s.controls}>
              <Button type="submit">Добавить</Button>
              <Button onClick={onModalClose} type="button" variant="filled">
                Отменить
              </Button>
            </div>
          }
        />
      </Modal>
    </>
  );
};

export default AddMovieModal;
