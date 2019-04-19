/**
 * User model
 */

import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'User name is required!'],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, 'First name is required!'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required!'],
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: value => isEmail(value),
        message: props => `${props.value} is not a valid email!`,
      },
    },
    emailConfirmed: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: value => /^\+\d+/.test(value),
        message: props => `${props.value} is not a valid phone number!`,
      },
    },
    phoneNumberConfirmed: {
      type: Boolean,
      default: false,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    postalCode: {
      type: String,
      min: [3, 'Postal code is too short'],
      max: [5, 'Postal code is too long'],
    },
    profilePicUrl: {
      type: String,
    },
    externalId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, versionKey: 'version' },
);

// Increment the version number before we save to the datastore.
UserSchema.pre('save', function preSave(next) {
  this.increment();
  next();
});

// TODO: FIX THIS.
UserSchema.method('getFullName', function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

let model;

// try to get schema, and if it doesn't exist, establish it.
try {
  model = mongoose.model('User');
} catch (error) {
  model = mongoose.model('User', UserSchema);
}

const userModel = model;

export default userModel;
