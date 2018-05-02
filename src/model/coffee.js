'use strict';

import mongoose from 'mongoose'; 

const Coffee = mongoose.Schema({
  brand: {
    type: String,
    required: true,
    unique: true,
  },
  origin: {
    type: String,
    required: true,
  },
  roast: {
    type: String,
    required: true,
  },
  roasted: {
    type: Date,
    default: () => new Date(),
  },
});

// Mongoose wants to create a model out of a schema
export default mongoose.model('coffee', Coffee);
