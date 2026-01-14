import { config } from 'dotenv';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { createDifIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

config();

const app = setupServer();
const PORT = process.env.PORT || 3000;

const start = async () => {
    await createDifIfNotExists(TEMP_UPLOAD_DIR);
    await createDifIfNotExists(UPLOAD_DIR);
    await initMongoConnection();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

start();

