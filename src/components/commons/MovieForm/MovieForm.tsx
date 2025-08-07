import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import type { AddMovieSchema } from '@/types/AddMovieSchema.ts';
import { Movie } from '@/types/Movie.ts';

import ImageInput from '@/components/commons/ImageInput';
import Input from '@/components/commons/Input';
import TagsInput from '@/components/commons/TagsInput';
import Textarea from '@/components/commons/Textarea';

import { GENRES } from '@/constants/genres.ts';
import { MOVIE_VALIDATION } from '@/constants/movieValidation.ts';

import s from './MovieForm.module.scss';

interface MovieFormProps {
  movie?: Movie | null;
  onSubmit: (data: AddMovieSchema) => void;
  footer?: ReactNode;
}

const MovieForm = ({ movie, onSubmit, footer }: MovieFormProps) => {
  const methods = useForm<AddMovieSchema>({
    defaultValues: {
      countries: [],
      genres: [],
    },
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

  const onFormSubmit = (data: AddMovieSchema) => {
    if (methods.formState.errors.image) {
      return;
    }

    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form className={s.form} onSubmit={handleSubmit(onFormSubmit)}>
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
        {footer}
      </form>
    </FormProvider>
  );
};

export default MovieForm;
