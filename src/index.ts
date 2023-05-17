import express from 'express';
import dotenv from 'dotenv';
import router from './router/router';
const app = express();

dotenv.config();

app.use(express.json());

app.use(router);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
