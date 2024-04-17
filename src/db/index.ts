import { MONGO_URI, NODE_ENV } from '@config';
import { DB_NAME } from '@constants';
import logger from '@utils/logger';
import mongoose from 'mongoose';

const connect = async () => {
  try {
    if (NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }
    const connectionInstance = await mongoose.connect(
      `${MONGO_URI}/${DB_NAME}`,
    );
    logger.info('====== Connected to MongoDB ======');
    logger.info(`Host: ${connectionInstance.connection.host}`);
  } catch (error) {
    logger.error('⚠️ MONGODB connection failed !!!', error);
    process.exit(1);
  }
};

export default connect;
