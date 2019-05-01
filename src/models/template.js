/**
 * Template model
 */

import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema(
  {
    template: {
      type: String,
    },
  },
  { timestamps: true, versionKey: 'version' },
);

// Increment the version number before we save to the datastore.
TemplateSchema.pre('save', function preSave(next) {
  this.increment();
  next();
});

let model;

// try to get schema, and if it doesn't exist, establish it.
try {
  model = mongoose.model('Template');
} catch (error) {
  model = mongoose.model('Template', TemplateSchema);
}

const templateModel = model;

export default templateModel;
