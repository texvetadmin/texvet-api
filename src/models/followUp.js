/**
 * FollowUp model
 */
import mongoose from 'mongoose';

const FollowUpSchema = new mongoose.Schema(
  {
    recipients: [
      {
        name: {
          type: String,
        },
        email: {
          type: String,
        },
      },
    ],
    notification_type: {
      type: String,
    },
    data: {},
    delivery_date: {
      type: Date,
    },
    date_delivered: {
      type: Date,
    },
  },
  { timestamps: true, versionKey: 'version' },
);

// Increment the version number before we save to the datastore.
FollowUpSchema.pre('save', function preSave(next) {
  this.increment();
  next();
});

let model;

// try to get schema, and if it doesn't exist, establish it.
try {
  model = mongoose.model('FollowUp');
} catch (error) {
  model = mongoose.model('FollowUp', FollowUpSchema, 'followUps');
}

const FollowUpModel = model;

export default FollowUpModel;
