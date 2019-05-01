/**
 * Type model
 */

import mongoose from 'mongoose';

const TypeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'name is required!'],
      unique: true,
    },
    description: {
      type: String,
    },
    template_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
    },
  },
  { timestamps: true, versionKey: 'version' },
);

// Increment the version number before we save to the datastore.
TypeSchema.pre('save', function preSave(next) {
  this.increment();
  next();
});
let model;

// try to get schema, and if it doesn't exist, establish it.
try {
  model = mongoose.model('Type');
} catch (error) {
  model = mongoose.model('Type', TypeSchema);
}

const typeSchema = model;

export default typeSchema;
