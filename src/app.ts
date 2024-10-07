import express, { Application } from 'express';
import mongoose from 'mongoose';
import router from './api';

const app: Application = express();
const PORT = 4000;

app.use(express.json());


app.use(router);

mongoose.connect(uri, {
}).then(() => console.log('Connected to MongoDB')).catch((error) => console.error('Error connecting to MongoDB:', error));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});