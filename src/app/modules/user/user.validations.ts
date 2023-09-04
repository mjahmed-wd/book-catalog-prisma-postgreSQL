import { z } from 'zod';

const create = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(2).max(255),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }).min(6),
    role: z.enum(['admin', 'customer']),
    contactNo: z
      .string({ required_error: 'Contact no is required' })
      .min(10)
      .max(20),
    address: z
      .string({ required_error: 'Address is required' })
      .min(5)
      .max(255),
    profileImg: z.string({ required_error: 'Profile Image is required' }).url(),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().min(2).max(255).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(['admin', 'customer']).optional(),
    contactNo: z.string().min(10).max(20).optional(),
    address: z.string().min(5).max(255).optional(),
    profileImg: z.string().url().optional(),
  }),
});

export const UserValidation = {
  create,
  update,
};
