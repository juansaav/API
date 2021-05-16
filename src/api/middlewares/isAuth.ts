import config from '../../config'; 
import jwt from 'express-jwt';

const getTokenFromHeader = req => {
  // Get token from header
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const isAuth = jwt({
  secret: config.JWT_SECRET, // The _secret_ to sign the JWTs
  algorithms: ['HS256'], // JWT Algorithm
  userProperty: 'token', // Use req.token to store the JWT
  getToken: getTokenFromHeader, // How to extract the JWT from the request

});

export default isAuth;