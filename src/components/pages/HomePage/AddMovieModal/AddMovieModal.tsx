import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import type { AddMovieSchema } from '@/types/entities/AddMovieSchema.ts';

import Button from '@/components/commons/Button';
import CountrySelector from '@/components/commons/CountrySelector';
import GenreSelector from '@/components/commons/GenreSelector';
import Input from '@/components/commons/Input';
import Modal from '@/components/commons/Modal';

import { addMovie } from '@/store/slices/movieSlice.ts';

import s from './AddMovieModal.module.scss';

const AddMovieModal = () => {
  const { register, handleSubmit, control, reset } = useForm<AddMovieSchema>({
    defaultValues: {
      countries: [],
      genres: [],
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const onModalOpen = () => setIsModalOpen(true);
  const onModalClose = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data: AddMovieSchema) => {
    const newMovie = {
      id: uuidv4(),
      ...data,
      image: data.image || '',
    };

    dispatch(addMovie(newMovie));
    onModalClose();
  };

  return (
    <>
      <Button onClick={onModalOpen}>
        <CirclePlus /> Добавить фильм
      </Button>
      <Modal isOpen={isModalOpen} onClose={onModalClose} title="Добавить фильм">
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <Input label="Название" {...register('name', { required: true })} />
          <Input label="Оригинальное название" {...register('originalName')} />
          <Input
            label="Год выхода"
            type="number"
            min={1900}
            max={2099}
            step={1}
            {...register('year', { required: true, valueAsNumber: true })}
          />
          <Controller
            name="genres"
            control={control}
            render={({ field }) => (
              <GenreSelector
                genres={field.value}
                onChange={(genres) => {
                  field.onChange(genres);
                }}
              />
            )}
          />
          <Controller
            name="countries"
            control={control}
            render={({ field }) => (
              <CountrySelector
                countries={field.value}
                onChange={(countries) => {
                  field.onChange(countries);
                }}
              />
            )}
          />
          <Input label="Режиссёр" {...register('director')} />
          <Input
            label="Рейтинг"
            type="number"
            min={0}
            max={10}
            step={0.1}
            {...register('rating', { valueAsNumber: true })}
          />
          <div className={s.controls}>
            <Button type="submit">Добавить</Button>
            <Button onClick={onModalClose} type="button" variant="filled">
              Отменить
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddMovieModal;
