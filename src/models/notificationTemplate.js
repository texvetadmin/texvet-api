/**
 * NotificationTemplate model
 */

import mongoose from 'mongoose';

const NotificationTemplateSchema = new mongoose.Schema(
  {
    template: {
      type: String,
    },
    subject: {
      type: String,
    },
  },
  { timestamps: true, versionKey: 'version' },
);

// Increment the version number before we save to the datastore.
NotificationTemplateSchema.pre('save', function preSave(next) {
  this.increment();
  next();
});

let model;

// try to get schema, and if it doesn't exist, establish it.
try {
  model = mongoose.model('NotificationTemplate');
} catch (error) {
  model = mongoose.model('NotificationTemplate', NotificationTemplateSchema);
}

const NotificationTemplateModel = model;

export default NotificationTemplateModel;
