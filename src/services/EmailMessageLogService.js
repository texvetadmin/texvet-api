import EmailMessageLog from '../models/emailMessageLog';

class EmailMessageLogService {
  logEmailRequested = (type, data) => {
    const emailLog = new EmailMessageLog({
      initialRequestType: type,
      initialRequestDate: new Date(),
      initialRequest: JSON.stringify(data),
      generateEmailMessageDate: null,
      generateEmailMessage: null,
      deliverEmailMessageDate: null,
      deliverEmailMessage: null,
    });
    emailLog.save();

    return emailLog._id;
  };

  logEmailGeneration = async (id, message) => {
    const emailLog = await EmailMessageLog.findById(id).exec();
    emailLog.set({
      generateEmailMessageDate: new Date(),
      generateEmailMessage: JSON.stringify(message),
    });
    emailLog.save();
  }

  logEmailDelivery = async (id, message) => {
    const emailLog = await EmailMessageLog.findById(id).exec();
    emailLog.set({
      deliverEmailMessageDate: new Date(),
      deliverEmailMessage: JSON.stringify(message),
    });
    emailLog.save();
  }
}

export default new EmailMessageLogService();
