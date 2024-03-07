const express = require('express');
const { infoAll } = require('../config/provide');

const router  = express.Router();

router.get('/user/:email',infoAll.user)
router.post('/register',infoAll.registerUser)

module.exports = {router}

