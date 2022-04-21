const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express')
const authorization = express.Router(); 

const createToken =  async ( userId = 0, role = '', access = true ) => {

     try {
          const token = jwt.sign(
               {
                   id: userId,
                   role,
                   access
               },
               process.env.SIGN_TOKEN,
               { expiresIn: '1hr'}
           );
       
           return token; 
     } catch (error) {
          throw 'Token error'
     }
    
}

const verifyToken = (req, res, next) => {
     const token = req.header('authorization')
     if (!token) return res.status(401).json({ msg: 'Denied Access' })
     try {
         const verified = jwt.verify(token, process.env.SIGN_TOKEN)
         req.user = verified
         next() // continuamos
     } catch (error) {
         res.status(400).json({msg: 'token is invalid'})
     }
}

module.exports = {
     createToken,
     verifyToken
}