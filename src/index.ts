import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './router/router';
const app = express();

dotenv.config();

app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

