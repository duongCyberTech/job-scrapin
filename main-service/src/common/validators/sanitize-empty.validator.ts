import { Transform } from 'class-transformer';

export const SanitizeEmpty = () => Transform(({ value}) => {
  if (typeof value === 'string' && value.trim() === '' || value === null || value === undefined || value === '') {
    return undefined;
  }

  return value;
})