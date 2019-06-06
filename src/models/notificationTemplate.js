/**
 * NotificationTemplate model
 */
import mongoose from 'mongoose';

const NotificationTemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    template: {
      type: String,
    },
    subject: {
      type: String,
    },
  },
  { timestamps: true, versionKey: 'version' },
);

NotificationTemplateSchema.pre('save', function preSave(next) {
  this.increment();
  next();
});

let model;

try {
  model = mongoose.model('NotificationTemplate');
} catch (error) {
  model = mongoose.model('NotificationTemplate', NotificationTemplateSchema);
}

const NotificationTemplateModel = model;

export default NotificationTemplateModel;
