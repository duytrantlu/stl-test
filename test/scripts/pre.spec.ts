import * as mongoose from 'mongoose';
import helperConsts from '../helpers/consts';
import StaticValues from '../helpers/static-values';

before(async () => {
  try {
    StaticValues.TOKEN = helperConsts.TOKEN;
  } catch (exception) {
    // console.log(exception);
  }
});

after(async () => {
  try {
    return await Promise.all([
      mongoose.connection.dropDatabase()
    ]);
  } catch (exception) {
    console.log(exception);
  }
});

