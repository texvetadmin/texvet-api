/**
 * County model
 */

import mongoose from 'mongoose';

const ServiceCategoryShema = new mongoose.Schema(
  {
    target_id: {
      type: Number,
      required: [true, 'target_id is required!'],
      unique: true,
    },
    target_uuid: {
      type: String,
    },
    url: {
      type: String,
    },
    title: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true, versionKey: 'version' },
);

// Increment the version number before we save to the datastore.
ServiceCategoryShema.pre('save', function preSave(next) {
  this.increment();
  next();
});
let model;

// try to get schema, and if it doesn't exist, establish it.
try {
  model = mongoose.model('ServiceCategory');
} catch (error) {
  model = mongoose.model('ServiceCategory', ServiceCategoryShema, 'serviceCategories');
}

const ServiceCategoryModel = model;

export default ServiceCategoryModel;
