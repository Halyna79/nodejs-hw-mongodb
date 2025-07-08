import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        return devErrorHandler(err, res);
    }
    prodErrorHandler(err, res);
};

const prodErrorHandler = (err, res) => {
    if (err instanceof HttpError) {
        return res.status(err.status).json({
            status: err.status,
            message: err.message,
            ...(err.errors && { errors: err.errors }),
        });
    }
    res.status(500).json({
        status: 500,
        message: 'Something went wrong',
        data: err.message,
    });
};

const devErrorHandler = (err, res) => {
    console.log('ERROR:', err);
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
        ...(err.errors && { errors: err.errors }),
    });
};
  
   
