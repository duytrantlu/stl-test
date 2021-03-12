export class AppObject {
  static readonly SCHEMA_OPTIONS = {
    versionKey: false,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    },
    id: false,
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    }
  };

  static readonly ORDER_CURRENCY = {
    USD: 'usd'
  };

  static readonly ORDER_STATUS = {
    CREATED: 'created',
    CONFIRMED: 'confirmed',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
  };

  static readonly SCHEDULE_OPTION = {
    MONTH: {
      START: 0,
      END: 11
    },
    DAY_OF_WEEK: {
      START: 0,
      END: 6,
    },
    HOUR: {
      START: 0,
      END: 23,
    },
    MINUTE: {
      START: 0,
      END: 59,
    },
    SECONDS: [0, 10, 20, 30, 40, 50]
  };
}
