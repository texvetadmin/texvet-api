/**
 * Recipient model
 */

import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export const RecipientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Recipient name is required!'],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: value => isEmail(value),
        message: props => `${props.value} is not a valid email!`,
      },
    },
  },
  { timestamps: true, versionKey: 'version' },
);

// Increment the version number before we save to the datastore.
RecipientSchema.pre('save', function preSave(next) {
  this.increment();
  next();
});

let model;

// try to get schema, and if it doesn't exist, establish it.
try {
  model = mongoose.model('Recipient');
} catch (error) {
  model = mongoose.model('Recipient', RecipientSchema);
}

export const RecipientModel = model;
