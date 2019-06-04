/**
 * StaticResources model
 */
const mongoose = require('mongoose');
const isAlphanumeric = require('validator/lib/isAlphanumeric');

const StaticResourcesSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      trim: true,
      validate: {
        validator: value => isAlphanumeric(value),
        message: props => `${props.value} is not a alphanumeric!`,
      },
    },
    name: {
      type: String,
    },
    headline: {
      type: String,
    },
    body: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true, versionKey: 'version' },
);

// Increment the version number before we save to the datastore.
StaticResourcesSchema.pre('save', function preSave(next) {
  this.increment();
  next();
});
let model;

// try to get schema, and if it doesn't exist, establish it.
try {
  model = mongoose.model('StaticResources');
} catch (error) {
  model = mongoose.model('StaticResources', StaticResourcesSchema);
}

const StaticResourcesModel = model;
module.exports = StaticResourcesModel;
