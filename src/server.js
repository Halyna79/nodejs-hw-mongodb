import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routers/contacts.routers.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';
import usersRouter from './routers/users.routers.js';
import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = () => {
    const app = express();

    app.use('/uploads', express.static(UPLOAD_DIR));

    app.use(cors());
    app.use(pino());
    app.use(express.json());
    app.use(cookieParser());

    app.use('/contacts', contactsRouter);
    app.use('/users', usersRouter);

    app.use(router);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
};

