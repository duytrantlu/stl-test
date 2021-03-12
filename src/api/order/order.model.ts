import { Document } from 'mongoose';

export type OrderModel = Document & {
  customer: string;
  productName: string;
  price: number;
  quantity: number;
  currency?: string;
  totalAmount: number;
  paymentId?: string;
  status?: string;
};