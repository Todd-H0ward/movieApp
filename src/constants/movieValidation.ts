import { array, number, object, string } from 'yup';

export const MOVIE_VALIDATION = object({
  name: string().required('Укажите название фильма').max(50, 'Название не может превышать 50 символов'),
  originalName: string()
    .required('Укажите оригинальное название фильма')
    .max(50, 'Оригинальное название не может превышать 50 символов'),
  year: number()
    .typeError('Год должен быть числом')
    .required('Год выхода обязателен')
    .min(1900, 'Год должен быть не ранее 1900')
    .max(2099, 'Год должен быть не позднее 2099'),
  countries: array()
    .of(string().required())
    .min(1, 'Выберите хотя бы одну страну')
    .max(15, 'Выберите не более 15 стран')
    .required(),
  genres: array()
    .of(string().required())
    .min(1, 'Выберите хотя бы один жанр')
    .max(15, 'Выберите не более 15 жанров')
    .required(),
  director: string().required('Укажите режиссёра'),
  rating: number()
    .typeError('Рейтинг должен быть числом')
    .min(0, 'Рейтинг должен быть не менее нуля')
    .max(10, 'Рейтинг должен быть не более десяти')
    .required('Укажите рейтинг'),
  image: string().required('Укажите ссылку на изображение').url('Введите корректный URL'),
  description: string().required('Добавьте описание фильма').max(500, 'Описание не должно превышать 500 символов'),
});
