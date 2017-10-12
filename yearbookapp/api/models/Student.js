const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const studentSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide a name' },
  indexNumber: { type: Number, required: 'Please provide an Index Number' },
  email: { type: String, required: 'Please provide a valid email address' },
  hash: String,
  salt: String,
  quote: String,
  facebook: String,
  twitter: String,
  snapchat: String,
  instagram: String,
  messages: [
    {
      text: { type: String },
      date: { type: Date, default: Date.now },
      sender: { type: String }
    }
  ]
});

module.exports = mongoose.model('Students', studentSchema);
