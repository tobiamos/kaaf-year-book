const express = require('express');

const router = express.Router();

router.get('/api', (req, res) => {
  res.send('i work');
});
module.exports = router;
