const jwt = require('jsonwebtoken');
import config from '../../config'; 

//Gets user data from token and attachs it to request
function authenticateToken(req, res, next) {
  console.log("authenticateToken")
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, config.JWT_SECRET, (err: any, user: any) => {
    if (err) return res.sendStatus(403)

    // Attach user data
    req.user = user

    next()
  })
}

export default authenticateToken