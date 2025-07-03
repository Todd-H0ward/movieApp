import { clsx } from 'clsx';
import { Star } from 'lucide-react';

import type { CSSProperties } from 'react';

import s from './Rating.module.scss';

interface RatingProps {
  rating: number;
  className?: string;
}

const getRatingColor = (rating: number) => {
  if (rating >= 8) return '#ffd25e';
  if (rating >= 7) return '#3bb33b';
  if (rating >= 6) return '#777777';
  return '#EF476F';
};

const Rating = ({ rating, className }: RatingProps) => {
  const ratingColor = getRatingColor(rating);

  return (
    <div
      className={clsx(s.root, className)}
      style={
        {
          '--rating-color': ratingColor,
        } as CSSProperties
      }
    >
      <Star className={s.star} />
      <span className={s.rating}>{rating.toFixed(1)}</span>
    </div>
  );
};

export default Rating;
