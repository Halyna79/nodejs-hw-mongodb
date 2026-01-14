import createHttpError from 'http-errors';
import { SessionsCollection } from '../models/session.js';
import { UsersCollection } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  let token;
  let session;

  const bearerToken = req.get('authorization');

  if (bearerToken) {
    const [bearer, extractedToken] = bearerToken.split(' '); 
    if (bearer !== 'Bearer' || !extractedToken) {
      return next(createHttpError(401, 'Authorization header should be of type Bearer'));
    }
    token = extractedToken;
    session = await SessionsCollection.findOne({ accessToken: token });
  } else {
    const sessionId = req.cookies?.sessionId;
    if (!sessionId) {
      return next(createHttpError(401, 'No Authorization header or sessionId cookie found'));
    }
    session = await SessionsCollection.findById(sessionId);
  }

  if (!session) {
    return next(createHttpError(401, 'Session not found'));
    
  }

  const isTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

  if (isTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
    
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'User not found')); 
    
  }

  req.user = user;
  next();
};