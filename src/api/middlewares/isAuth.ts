const jwt = require('jsonwebtoken');
import config from '../../config';  
import { BlockedTokens } from '../middlewares/blockedTokens';

// Checks the token sent
function authenticateToken(req, res, next) {
  console.log("authenticateToken")
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, config.JWT_SECRET, (err: any, user: any) => {
    console.log()
    // Validate token
    if (err) return res.sendStatus(401)

    // Check that token corresponds to user
    if (req.params.userId != user.id) { 
      return res.sendStatus(403);
    }    

    // Check blocked tokens list
    console.log(user.id)
    if (BlockedTokens.getInstance().tokenIsBlocked(+user.id, token)){
      return res.sendStatus(401)
    }

    // Attach user data
    req.user = user
    req.user.token = token

    next()
  })
}

export default authenticateToken