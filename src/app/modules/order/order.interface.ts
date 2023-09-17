import { Order } from '@prisma/client';

export interface OrderPayload {
  userId: string;
  orderedBooks: Order[];
}
