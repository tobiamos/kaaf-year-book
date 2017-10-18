const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

mongoose.Promise = global.Promise;
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please provide a name',
    lowercase: true,
    trim: true
  },
  indexNumber: { type: Number, required: 'Please provide an Index Number' },
  email: {
    type: String,
    required: 'Please provide a valid email address',
    lowercase: true,
    trim: true
  },
  hash: String,
  salt: String,
  quote: String,
  facebook: { type: String, lowercase: true, trim: true },
  twitter: { type: String, lowercase: true, trim: true },
  snapchat: { type: String, lowercase: true, trim: true },
  instagram: { type: String, lowercase: true, trim: true },
  messages: [
    {
      text: { type: String },
      date: { type: Date, default: Date.now },
      name: { type: String }
    }
  ]
});

studentSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(256).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

studentSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

studentSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate + 7);

  return jwt.sign({
    _id: this._id,
    name: this.name,
    indexNumber: this.indexNumber,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.SECRET);
};

module.exports = mongoose.model('Students', studentSchema);
