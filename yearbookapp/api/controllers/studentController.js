const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const Student = mongoose.model('Student');

function sendJsonResponse(res, status, content) {
  res.status(status);
  res.json(content);
}

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
    sendJsonResponse(res, 200, 'Email is available');
  }
  sendJsonResponse(res, 200, 'Email is taken');
};

module.exports.checkIndexNumber = async (req, res) => {
  if (!req.params.indexNumber) {
    sendJsonResponse(res, 400, 'No indexNumber Provided');
  }
  const indexNumber = await Student.findOne({
    indexNumber: req.params.indexNumber
  });
  if (!indexNumber) {
    sendJsonResponse(res, 200, 'Index Number is available');
  }
  sendJsonResponse(res, 200, 'Index Number is already Registered');
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
  sendJsonResponse(res, 200, 'Messages has been deleted');
};
