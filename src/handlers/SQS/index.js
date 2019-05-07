import SQSController from '../../controllers/SQSController';

const deliverEmail = async (event, context, callback) => await SQSController.deliverEmail(event, context, callback);

const generateEmail = async (event, context, callback) => await SQSController.generateEmail(event, context, callback);

// eslint-disable-next-line import/prefer-default-export
export { deliverEmail, generateEmail };
