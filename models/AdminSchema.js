const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      trim: true
    },
    phone: {
      type: Number,
      required: true,
      minlength: 10,
      trim: true
    }
  },
  { timestamps: true }
);

const Admin = mongoose.model('User', adminSchema);

module.exports = Admin;
