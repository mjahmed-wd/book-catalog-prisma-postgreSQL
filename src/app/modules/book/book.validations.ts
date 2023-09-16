import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).min(2).max(255),
    author: z.string({ required_error: 'Author is required' }).min(2).max(255),
    genre: z.string({ required_error: 'Genre is required' }).min(2).max(255),
    price: z.number({ required_error: 'Price is required' }).min(1),
    publicationDate: z.coerce.date({
      invalid_type_error: 'Invalid date',
      required_error: 'Publication date is required',
    }),
    categoryId: z.string({ required_error: 'Category id is required' }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).min(2).max(255),
    author: z.string({ required_error: 'Author is required' }).min(2).max(255),
    genre: z.string({ required_error: 'Genre is required' }).min(2).max(255),
    price: z.number({ required_error: 'Price is required' }).min(1),
    publicationDate: z.coerce.date({
      invalid_type_error: 'Invalid date',
      required_error: 'Publication date is required',
    }),
    categoryId: z.string({ required_error: 'Category id is required' }),
  }),
});

export const BookValidation = {
  create,
  update,
};
