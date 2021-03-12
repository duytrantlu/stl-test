export interface IParamRequestPaymentCheckout {
  customer: string;
  orderId: string;
  currency: string;
  totalAmount: number;
}

export interface IResponsePaymentCheckout {
  _id: string;
  customer: string;
  totalAmount: number;
  currency: string;
  status: string;
  deleted: boolean;
  createdDate: Date;
  updatedDate: Date;
}

