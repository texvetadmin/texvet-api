/**
 * County model
 */
import mongoose from 'mongoose';

const CountySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: [true, 'name is required!'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'name is required!'],
      unique: true,
    },
    uuid: {
      type: String,
    },
    cities: [
      {
        id: {
          type: Number,
        },
        name: {
          type: String,
        },
      },
    ],
    relatedCities: [
      {
        id: {
          type: Number,
        },
        name: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true, versionKey: 'version' },
);

// Increment the version number before we save to the datastore.
CountySchema.pre('save', function preSave(next) {
  this.increment();
  next();
});
let model;

// try to get schema, and if it doesn't exist, establish it.
try {
  model = mongoose.model('CountySchema');
} catch (error) {
  model = mongoose.model('CountySchema', CountySchema);
}

const CountyModel = model;
export default CountyModel;
