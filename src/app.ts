import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './api';

const app: Application = express();
const PORT = 4000;
const uri = "mongodb://localhost:27017/web-scraper-db"

app.use(cors({
    origin: 'http://localhost:4200' //frontend http for CORS
}));

app.use(express.json());
app.use(router);

mongoose.connect(uri, {
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => console.error('Error connecting to MongoDB:', error));

