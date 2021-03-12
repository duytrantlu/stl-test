import {
  IParamRequestPaymentCheckout,
  IResponsePaymentCheckout
} from './payment.model';

import { Request } from '../../configs/common/reqCore/request.lib';
import { OptionRequest, ServiceOption } from '../../configs/common/models';
import { AppConst } from '../../common/consts/app.const';


export const paymentService = {
  checkoutOrder: async (params: IParamRequestPaymentCheckout): Promise<IResponsePaymentCheckout> => {
    const options: OptionRequest = {
      service: ServiceOption.PAYMENT,
      url: AppConst.EXTERNAL_URL_PAYMENT,
      body: params
    };
    const paymentReq = new Request();
    return paymentReq.post(options)
      .then(data => {
        return data;
      })
      .catch(err => {
        throw err.error ? err.error : err;
      });
  }
};
