import express from 'express';
import routerBooks from './routes/routesBooks'

const router = express.Router();

router.use(routerBooks);

export default router;