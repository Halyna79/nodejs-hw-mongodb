export const errorHandler = (err, req, res, next) => {
    const { status = 500, message = 'Something went wrong', data = 'Internal Server Error' } = err;
    res.status(status).json({
        status,
        message,
        data,
    });
};