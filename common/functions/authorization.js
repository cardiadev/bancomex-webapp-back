const jwt = require('jsonwebtoken');
const credential = '@GTSK123SO98*/@25-SD243Q'

const createToken =  async ( userId = '', role = '', access = true ) => {

     try {
          const token = jwt.sign(
               {
                   _id: userId,
                   role,
                   access
               },
               credential,
               { expiresIn: '1hr'}
           );
       
           return token; 
     } catch (error) {
          throw 'Token error'
     }
    
}

module.exports = {
     createToken
}