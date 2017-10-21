const mongoose = require('mongoose');

const Student = mongoose.model('Student');
const multer = require('multer');

// const DIR = '../../public/images/';
const jwt = require('jsonwebtoken');

// const upload = multer({ dest: DIR }).single('photo');
// const path = require('path');

const storage = multer.diskStorage({
  // multers disk storage settings
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    const datetimestamp = Date.now();
    cb(
      null,
      `${file.fieldname}-${datetimestamp}.${file.originalname.split('.')[
        file.originalname.split('.').length - 1
      ]}`
    );
  }
});

const upload = multer({
  // multer settings
  storage
}).single('file');

module.exports.pun = (req, res) => {
  upload(req, res, (err) => {
    console.log(req.file);
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({ error_code: 0, err_desc: null });
  });
};

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

// const jimp = require('jimp');
// const uuid = require('uuid');

module.exports.createStudent = async (req, res) => {
  const student = new Student(req.body);
  student.setPassword(req.body.password);
  await student.save();
  const token = await student.generateJwt();
  sendJsonResponse(res, 200, { token });
};

module.exports.login = async (req, res) => {
  if (!req.body.indexNumber || !req.body.password) {
    sendJsonResponse(res, 400, 'No indexNumber or password provided');
  }
  const student = await Student.findOne({ indexNumber: req.body.indexNumber });
  if (!student) {
    sendJsonResponse(res, 400, 'Student not found');
  }
  const validPassword = student.validPassword(req.body.password);
  if (!validPassword) {
    sendJsonResponse(res, 400, 'Password Invalid');
  }
  const token = student.generateJwt();
  sendJsonResponse(res, 200, { token, name: student.name });
};

module.exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    sendJsonResponse(res, 400, 'No token provided');
  } else {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        sendJsonResponse(res, 500, err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports.profile = async (req, res) => {
  const student = await Student.findOne({ _id: req.decoded._id });
  sendJsonResponse(res, 200, student);
};

module.exports.checkEmail = async (req, res) => {
  if (!req.params.email) {
    sendJsonResponse(res, 400, 'No Email Provided');
  }
  const email = await Student.findOne({ email: req.params.email });
  if (!email) {
    sendJsonResponse(res, 200, {
      success: true,
      message: 'Email is available'
    });
  }
  sendJsonResponse(res, 200, { success: false, message: 'Email is taken' });
};

module.exports.checkIndexNumber = async (req, res) => {
  if (!req.params.indexNumber) {
    sendJsonResponse(res, 400, 'No indexNumber Provided');
  }
  const indexNumber = await Student.findOne({
    indexNumber: req.params.indexNumber
  });
  if (!indexNumber) {
    sendJsonResponse(res, 200, {
      success: true,
      message: 'Index Number is available'
    });
  }
  sendJsonResponse(res, 200, {
    success: false,
    message: 'Index Number is already Registered'
  });
};

module.exports.addMessage = async (req, res) => {
  if (!req.params.indexNumber) {
    sendJsonResponse(res, 400, 'No indexNumber Provided');
  }
  const student = await Student.findOne({
    indexNumber: req.params.indexNumber
  });
  if (!student) {
    sendJsonResponse(res, 400, 'Student not found');
  }
  student.messages.push(req.body);
  await student.save();
  sendJsonResponse(res, 200, 'Message has been sent');
};

module.exports.deleteMessage = async (req, res) => {
  if (!req.params.id || !req.query.index) {
    sendJsonResponse(res, 400, 'Message id or indexNumber not provided');
  }
  const student = await Student.findOne({ indexNumber: req.query.index });
  if (!student) {
    sendJsonResponse(res, 400, 'Student not found');
  }
  await student.messages.id(req.params.id).remove();
  await student.save();
  sendJsonResponse(res, 200, 'Message has been deleted');
};

module.exports.getUsername = async (req, res) => {
  if (!req.params.indexnumber) {
    sendJsonResponse(res, 400, 'No index Number provided');
  }
  const student = await Student.findOne({
    indexNumber: req.params.indexnumber
  });
  if (!student) {
    sendJsonResponse(res, 400, 'Student not found');
  }
  sendJsonResponse(res, 200, student);
};

module.exports.picture = (req, res) => {
  sendJsonResponse(res, 200, req.body);
};
