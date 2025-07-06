import { yupResolver } from '@hookform/resolvers/yup';
import { CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import type { AddMovieSchema } from '@/types/entities/AddMovieSchema.ts';

import Button from '@/components/commons/Button';
import ImageInput from '@/components/commons/ImageInput';
import Input from '@/components/commons/Input';
import Modal from '@/components/commons/Modal';
import TagsInput from '@/components/commons/TagsInput';
import Textarea from '@/components/commons/Textarea';

import { addMovie } from '@/store/slices/movieSlice.ts';

import { addMovieValidation } from '@/constants/addMovieValidation.ts';
import { GENRES } from '@/constants/genres.ts';

import s from './AddMovieModal.module.scss';

const AddMovieModal = () => {
  const methods = useForm<AddMovieSchema>({
    defaultValues: {
      countries: [],
      genres: [],
    },
    resolver: yupResolver(addMovieValidation),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  const onModalOpen = () => setIsModalOpen(true);
  const onModalClose = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data: AddMovieSchema) => {
    if (methods.formState.errors.image) {
      return;
    }

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
        <FormProvider {...methods}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Название"
              placeholder="Например: Властелин колец"
              autoFocus
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="Оригинальное название"
              placeholder="Например: The Lord of the Rings"
              {...register('originalName')}
              error={errors.originalName?.message}
            />
            <Input
              label="Год выхода"
              type="number"
              placeholder="Например: 2001"
              step={1}
              {...register('year')}
              error={errors.year?.message}
            />
            <Controller
              name="genres"
              control={control}
              render={({ field, fieldState }) => (
                <TagsInput
                  label="Жанр"
                  placeholder="Выберите жанры"
                  tags={field.value}
                  hints={GENRES}
                  changeTags={(genres) => {
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
                <TagsInput
                  label="Страна"
                  placeholder="Выберите страны"
                  tags={field.value}
                  changeTags={(countries) => {
                    field.onChange(countries);
                  }}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Input
              label="Режиссёр"
              placeholder="Например: Питер Джексон"
              {...register('director')}
              error={errors.director?.message}
            />
            <Input
              label="Рейтинг"
              type="number"
              step={0.1}
              placeholder="От 0.0 до 10.0"
              {...register('rating')}
              error={errors.rating?.message}
            />
            <Controller
              name="image"
              control={control}
              render={({ field, fieldState }) => (
                <ImageInput
                  name="image"
                  image={field.value}
                  onChange={(image) => {
                    field.onChange(image);
                  }}
                  error={fieldState.error?.message}
                />
              )}
            />
            <Textarea
              label="Описание фильма"
              placeholder="Например: Давным-давно в далёкой-далёкой галактике..."
              {...register('description')}
              error={errors.description?.message}
            />
            <div className={s.controls}>
              <Button type="submit">Добавить</Button>
              <Button onClick={onModalClose} type="button" variant="filled">
                Отменить
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default AddMovieModal;
