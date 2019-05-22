/**
 * ChatbotHistory model
 */

import mongoose from 'mongoose';

const ChatbotHistorySchema = new mongoose.Schema(
  {
    data: {
      type: String,
    },
  },
  { timestamps: true, versionKey: 'version' },
);

// Increment the version number before we save to the datastore.
ChatbotHistorySchema.pre('save', function preSave(next) {
  this.increment();
  next();
});

let model;

// try to get schema, and if it doesn't exist, establish it.
try {
  model = mongoose.model('ChatbotHistory');
} catch (error) {
  model = mongoose.model('ChatbotHistory', ChatbotHistorySchema);
}

const ChatbotHistoryModel = model;

export default ChatbotHistoryModel;
