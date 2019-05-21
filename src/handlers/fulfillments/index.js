import FulfillmentController from '../../controllers/FulfillmentController';
import '../../mongoose';

const closeTheLoop = async (event, context, callback) => await FulfillmentController.closeTheLoop(event, context, callback);

// eslint-disable-next-line import/prefer-default-export
export { closeTheLoop };
