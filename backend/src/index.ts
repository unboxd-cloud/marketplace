import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { vendorRoutes } from './routes/vendors';
import { productRoutes } from './routes/products';
import { paymentRoutes } from './routes/payments';
import { metricsMiddleware } from './middleware/metrics';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);

app.get('/health', (_, res) => res.json({ status: 'ok' }));
app.get('/ready', (_, res) => res.json({ ready: true }));

app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(config.port, () => {
  console.log(`Marketplace API running on port ${config.port}`);
});

export default app;