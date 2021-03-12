import { omit } from 'lodash';
import { Document } from 'mongoose';
import { Utils } from '../../common/utils';
import { Pagination } from '../../common/models';

export class MongooseLib {
  constructor() {
  }

  public static toModel<T>(tModel: Document & T) {
    return !tModel ? tModel : Utils.objects.snakeCase(Object.assign(tModel.toObject(), { _id: tModel._id.toString() }));
  }

  public static toModels<T>(tModels: Pagination<T[]>) {
    return {
      data: tModels.data.map(MongooseLib.toModel),
      ...Utils.objects.snakeCase(omit(tModels, ['data']))
    };
  }
}
