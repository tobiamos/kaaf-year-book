const express = require('express');

const ctrlStudent = require('../controllers/studentController');

const router = express.Router();

function catchErrors(fn) {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
}


router.get('/checkemail/:email', catchErrors(ctrlStudent.checkEmail));
router.get(
  '/indexnumber/:indexNumber',
  catchErrors(ctrlStudent.checkIndexNumber)
);
router.post('/signup', catchErrors(ctrlStudent.createStudent));
router.post('/login', catchErrors(ctrlStudent.login));
router.get(
  '/profile',
  ctrlStudent.authenticate,
  catchErrors(ctrlStudent.profile)
);
router.post('/message/:indexNumber', catchErrors(ctrlStudent.addMessage));
router.delete(
  '/message/:id',
  ctrlStudent.authenticate,
  catchErrors(ctrlStudent.deleteMessage)
);

router.get('/index/:indexnumber', catchErrors(ctrlStudent.getUsername));

// router.use(ctrlStudent.picConfig);
router.post('/uploadto', ctrlStudent.pun);
module.exports = router;
