import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/commons/Button';
import Layout from '@/components/commons/Layout';

import { ROUTES } from '@/constants/routes.ts';

import s from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <Layout className={s.root}>
      <h1 className={s.title}>Здесь ничего нет</h1>
      <div className={s.content}>
        <p className={s.error}>404</p>
        <Image className={s.image} width={225} height={125} src="/not-found-bg.png" alt="not-found" />
      </div>
      <Link href={ROUTES.HOME}>
        <Button>Вернуться назад</Button>
      </Link>
    </Layout>
  );
};

export default NotFoundPage;
