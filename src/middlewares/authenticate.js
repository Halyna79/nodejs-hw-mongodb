import createHttpError from 'http-errors';
import { SessionsCollection } from '../models/session.js';
import { UsersCollection } from '../models/user.js';

export const authenticate = async (req, res, next) => {
  const sessionId = req.cookies?.sessionId;
  const refreshToken = req.cookies?.refreshToken;

  if (!sessionId || !refreshToken) {
    return next(createHttpError(401, 'Session not found'));
  }

  const session = await SessionsCollection.findOne({ _id: sessionId, refreshToken });

  if (!session) return next(createHttpError(401, 'Session not found'));

  const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    return next(createHttpError(401, 'Access token expired'));
    
  }

  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    return next(createHttpError(401, 'User not found')); 
    
  }
    req.user = {
        ...user.toObject(),
        sessionId: session._id,
  };

  next();
};