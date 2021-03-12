/**
 * @class AppConst
 * @description define common app constants
 */

export class AppConst {
  /**
   * @field SCHEMA_OPTIONS
   * @description define option schema
   * @type any
   */
  static SCHEMA_OPTIONS: any = {
    versionKey: false,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    },
    id: false,
    timestamps: {
      createdAt: 'dateCreated',
      updatedAt: 'dateUpdated'
    }
  };
  static readonly BOOLEAN: any = {
    TRUE: 'true',
    FALSE: 'false'
  };
  static readonly API_PREFIX: string = 'api';
  static readonly API_VERSION: string = 'v1';
  static readonly PAGE_SIZE: number = 20;
  static readonly COMMON_ID_IS_REQUIRED: string = 'Id is required.';
  static readonly COMMON_ID_INVALID: string = 'Id invalid.';
  static readonly COMMON_DELETE_SUCCESS: string = 'Common delete success.';

  //#region Order
  static readonly EXTERNAL_URL_PAYMENT: string = 'api/v1/payment/checkout';
  static readonly PRICE_INVALID: string = 'Price invalid.';
  static readonly PRICE_IS_REQUIRED: string = 'Order price is required.';
  static readonly QUANTITY_INVALID: string = 'Quantity invalid.';
  static readonly QUANTITY_IS_REQUIRED: string = 'Quantity is required.';
  static readonly PRODUCT_NAME_IS_REQUIRED: string = 'Product name is required.';
  static readonly ORDER_NOT_FOUND: string = 'Order not found.';
  static readonly ERROR_CANCEL: string = 'Order cannot be canceled. This order is currently delivered in status';
  static readonly ERROR_UNABLE_EXECUTE_PAYMENT: string = 'Unable to execute payment. Order is in processing or finished.';
  static readonly ERROR_PAYMENT_IS_REJECTED: string = 'Checkout failed. Payment has been rejected.';
  static readonly PAYMENT_COMPLETED: string = 'Checkout completed.';
  static readonly ORDER_START_TIME_INVALID: string = 'Start time invalid.';
  static readonly ORDER_END_TIME_INVALID: string = 'End time invalid.';
  static readonly ORDER_STATUS_IS_REQUIRED: string = 'Order status is required.';
  //#endregion
}
