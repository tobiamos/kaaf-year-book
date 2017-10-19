const express = require('express');
const ctrlStudent = require('../controllers/studentController');

function catchErrors(fn) {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
}

const router = express.Router();
router.get('/checkemail/:email', catchErrors(ctrlStudent.checkEmail));
router.get('/indexnumber/:indexNumber', catchErrors(ctrlStudent.checkIndexNumber));
router.post('/signup', catchErrors(ctrlStudent.createStudent));
router.post('/login', catchErrors(ctrlStudent.login));
router.get(
  '/profile',
  ctrlStudent.authenticate,
  catchErrors(ctrlStudent.profile)
);
router.post('/message/:indexNumber', catchErrors(ctrlStudent.addMessage));
router.delete('/message/:id', catchErrors(ctrlStudent.deleteMessage));
module.exports = router;
