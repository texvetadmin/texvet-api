/**
 * EmailMessageLog model
 */
const mongoose = require('mongoose');
// import mongoose from 'mongoose';

const EmailMessageLogSchema = new mongoose.Schema(
  {
    // identifies the source of the message - ie. CHATBOT, CLOSE-THE-LOOP
    initialRequestType: {
      type: String,
    },
    // the date/time the initial request was submitted.
    initialRequestDate: {
      type: Date,
    },
    // serialized request from the chatbot if there was one.
    initialRequest: {
      type: String,
    },
    // the date/time the generate-email message was queued.
    generateEmailMessageDate: {
      type: Date,
    },
    // the serialized generate-email queue message.
    generateEmailMessage: {
      type: String,
    },
    // the date/time the deliver-email message was queued.
    deliverEmailMessageDate: {
      type: Date,
    },
    // the serialized generate-email queue message.
    deliverEmailMessage: {
      type: String,
    },
  },
  { timestamps: true, versionKey: 'version' },
);

// Increment the version number before we save to the datastore.
EmailMessageLogSchema.pre('save', function preSave(next) {
  this.increment();
  next();
});

let model;

// try to get schema, and if it doesn't exist, establish it.
try {
  model = mongoose.model('EmailMessageLog');
} catch (error) {
  model = mongoose.model('EmailMessageLog', EmailMessageLogSchema);
}

const EmailMessageLogModel = model;

module.exports = { EmailMessageLogModel };
// export default EmailMessageLogModel;
