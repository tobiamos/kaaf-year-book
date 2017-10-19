const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const errorHandler = require('mongoose-mongodb-errors');

const messageSchema = new mongoose.Schema({
  text: { type: String, lowercase: true, required: 'Please provide a message' },
  name: {
    type: String,
    required: 'Please provide a name',
    lowercase: true,
    trim: true
  },
  date: { type: Date, default: Date.now }
});

function indexNumberLengthChecker(indexNumber) {
  if (!indexNumber) {
    return false;
  } else if (indexNumber.length < 8) {
    return false;
  }
  return true;
}

function indexNumberPatternChecker(indexNumber) {
  if (!indexNumber) {
    return false;
  }
  const regex = new RegExp(/^\d+$/);
  return regex.test(indexNumber);
}

function phoneNumberPatternChecker(phone) {
  if (!phone) {
    return false;
  }
  const regex = new RegExp(/^\d+$/);
  return regex.test(phone);
}

function quoteLengthChecker(quote) {
  if (quote && quote.length > 140) {
    return false;
  }
  return true;
}

function phoneLengthChecker(phone) {
  if (!phone) {
    return false;
  } else if (phone.length > 15) {
    return false;
  }
  return true;
}

const phoneNumberValidators = [
  {
    validator: phoneLengthChecker,
    message: 'Phone Number cannot be more than 15 Characters'
  },
  {
    validator: phoneNumberPatternChecker,
    message: 'Phone Number must contain only numbers'
  }
];

const indexNumberValidators = [
  {
    validator: indexNumberLengthChecker,
    message: 'Index Number  must be exactly 8 characters'
  },
  {
    validator: indexNumberPatternChecker,
    message: 'Index Number must contain only numbers'
  }
];

const quoteValidators = [
  {
    validator: quoteLengthChecker,
    message: 'Quote cannot be more than 140 characters'
  }
];

mongoose.Promise = global.Promise;
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please provide a name',
    lowercase: true,
    trim: true
  },
  indexNumber: {
    type: Number,
    required: 'Please provide an Index Number',
    unique: true,
    validate: indexNumberValidators
  },
  email: {
    type: String,
    required: 'Please provide a valid email address',
    lowercase: true,
    trim: true
  },
  hash: String,
  salt: String,
  quote: { type: String, lowercase: true, validate: quoteValidators },
  phone: {
    type: String,
    required: 'Please provide a phone number',
    validate: phoneNumberValidators
  },
  facebook: { type: String, lowercase: true, trim: true },
  twitter: { type: String, lowercase: true, trim: true },
  snapchat: { type: String, lowercase: true, trim: true },
  instagram: { type: String, lowercase: true, trim: true },
  messages: [messageSchema]
});

studentSchema.methods.setPassword = function (password) {
  if (!password) {
    throw new Error('Password is required');
  }
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

  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      indexNumber: this.indexNumber,
      exp: parseInt(expiry.getTime() / 1000)
    },
    process.env.SECRET
  );
};

studentSchema.plugin(errorHandler);

module.exports = mongoose.model('Student', studentSchema);
