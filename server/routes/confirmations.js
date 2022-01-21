const express = require('express');
const route=express.Router();
const {emailController}=require('../controllers/emailsController')



route.get('/:id',emailController)

module.exports=route;