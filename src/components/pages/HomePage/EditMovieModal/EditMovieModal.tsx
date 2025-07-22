'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, type MouseEvent } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import type { AddMovieSchema } from '@/types/AddMovieSchema.ts';

import Button from '@/components/commons/Button';
import ImageInput from '@/components/commons/ImageInput';
import Input from '@/components/commons/Input';
import Modal from '@/components/commons/Modal';
import TagsInput from '@/components/commons/TagsInput';
import Textarea from '@/components/commons/Textarea';

import { selectEditMovie } from '@/store/selectors/movieSelectors.ts';
import { deleteMovie, editMovie, setEditMovie } from '@/store/slices/movieSlice.ts';

import { GENRES } from '@/constants/genres.ts';
import { MOVIE_VALIDATION } from '@/constants/movieValidation.ts';

import s from './EditMovieModal.module.scss';

const EditMovieModal = () => {
  const movie = useSelector(selectEditMovie);
  const dispatch = useDispatch();

  const methods = useForm<AddMovieSchema>({
    resolver: yupResolver(MOVIE_VALIDATION),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    reset({
      ...movie,
      genres: movie?.genres ?? [],
      countries: movie?.countries ?? [],
    });
  }, [movie, reset]);

  const onModalClose = () => {
    dispatch(setEditMovie(null));
    reset();
  };

  const onSubmit = (data: AddMovieSchema) => {
    if (methods.formState.errors.image || !movie) {
      return;
    }

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
    }
  };

  return (
    <Modal isOpen={!!movie} onClose={onModalClose} title="Редактировать фильм">
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
            <Button type="submit">Сохранить</Button>
            <Button onClick={handleDelete} type="button" variant="filled">
              Удалить
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default EditMovieModal;
