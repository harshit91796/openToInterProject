const express = require('express');
const router = express.Router()
const {createCollege,createIntern,getCollege} = require('../controller/api')

 

router.post('/functionup/colleges',createCollege);
router.post('/functionup/interns',createIntern);
router.get('/functionup/collegesDetails',getCollege);


module.exports = router;