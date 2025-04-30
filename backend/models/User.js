const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  societyName: { type: String, required: true },
  address: { type: String, required: true },
  contactPerson: { type: String, required: true },
  contactNumber: { type: String, required: true },
  totalFamilies: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
