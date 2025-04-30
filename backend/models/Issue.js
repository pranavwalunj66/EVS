const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  imageUrl: { type: String },
  status: { type: String, default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
