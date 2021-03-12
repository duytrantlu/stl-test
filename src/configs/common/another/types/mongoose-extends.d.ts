/// <reference types="mongoose" />
import * as Bluebird from 'bluebird';
import * as mongoose from 'mongoose';
import {
  Pagination,
  PaginateParams,
} from '../../models';
import {Document, ModelProperties} from 'mongoose';

/**
 * @interface QueryHelper
 */
interface QueryHelper<T> {
  /**
   * @method paginate
   * @description Extension method helps us paginate the documents in a query
   * @param params
   * @param callback
   */
  paginate(params?: PaginateParams, callback?: (err: any, data: Pagination<T>) => void): Bluebird<Pagination<T>>;
}

interface MongooseDocumentHelper {
  validateSync(): mongoose.Error;
}

declare module 'mongoose' {

  interface Query<T> extends QueryHelper<T> {
  }

  interface DocumentQuery<T, DocType extends Document> extends QueryHelper<T> {
  }

  interface Model<T extends Document, QueryHelpers = {}> extends NodeJS.EventEmitter, ModelProperties {
  }

  interface MongooseDocument extends MongooseDocumentHelper {
    validateSync(): mongoose.Error;
  }

  interface Document {
    save(options: { validateBeforeSave: boolean }, fn?: (err: any, product: this, numAffected: number) => void): Promise<this>;

    dateCreated: string;
    dateUpdated?: string;
  }

  type Promise<T> = Bluebird<T>;
}
