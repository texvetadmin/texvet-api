/**
 * ChatbotHistory model
 */
import mongoose from 'mongoose';

const ChatbotHistorySchema = new mongoose.Schema(
  {
    responseId: String,
    session: String,
    queryResult: {
      queryText: String,
      parameters: [
        {
          param: String,
        },
      ],
      allRequiredParamsPresent: Boolean,
      fulfillmentText: String,
      fulfillmentMessages: [
        {
          text: {
            text: [String],
          },
        },
      ],
      outputContexts: [
        {
          name: String,
          lifespanCount: Number,
          parameters: [
            {
              param: String,
            },
          ],
        },
      ],
      intent: {
        name: String,
        displayName: String,
      },
      intentDetectionConfidence: Number,
      diagnosticInfo: Object,
      languageCode: String,
    },
    originalDetectIntentRequest: Object,
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
  model = mongoose.model('ChatbotHistory', ChatbotHistorySchema, 'chatbotHistory');
}

const ChatbotHistoryModel = model;

export default ChatbotHistoryModel;
