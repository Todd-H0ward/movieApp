import { yupResolver } from '@hookform/resolvers/yup';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import type { AddMovieSchema } from '@/types/entities/AddMovieSchema.ts';

import Button from '@/components/commons/Button';
import CountrySelector from '@/components/commons/CountrySelector';
import GenreSelector from '@/components/commons/GenreSelector';
import ImageInput from '@/components/commons/ImageInput';
import Input from '@/components/commons/Input';
import Modal from '@/components/commons/Modal';

import { addMovie } from '@/store/slices/movieSlice.ts';

import { addMovieValidation } from '@/constants/addMovieValidation.ts';

import s from './AddMovieModal.module.scss';

const AddMovieModal = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddMovieSchema>({
    defaultValues: {
      countries: [],
      genres: [],
    },
    resolver: yupResolver(addMovieValidation),
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
          <Input label="Название" {...register('name', { required: true })} error={errors.name?.message} />
          <Input label="Оригинальное название" {...register('originalName')} error={errors.originalName?.message} />
          <Input
            label="Год выхода"
            type="number"
            step={1}
            {...register('year', { required: true, valueAsNumber: true })}
            error={errors.year?.message}
          />
          <Controller
            name="genres"
            control={control}
            render={({ field, fieldState }) => (
              <GenreSelector
                genres={field.value}
                onChange={(genres) => {
                  field.onChange(genres);
                }}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="countries"
            control={control}
            render={({ field, fieldState }) => (
              <CountrySelector
                countries={field.value}
                onChange={(countries) => {
                  field.onChange(countries);
                }}
                error={fieldState.error?.message}
              />
            )}
          />
          <Input label="Режиссёр" {...register('director')} error={errors.director?.message} />
          <Input
            label="Рейтинг"
            type="number"
            step={0.1}
            {...register('rating', { valueAsNumber: true })}
            error={errors.rating?.message}
          />
          <Controller
            name="image"
            control={control}
            render={({ field, fieldState }) => (
              <ImageInput
                image={field.value}
                onChange={(image) => {
                  field.onChange(image);
                }}
                error={fieldState.error?.message}
              />
            )}
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
