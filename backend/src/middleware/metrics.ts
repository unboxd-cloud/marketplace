import { Request, Response, NextFunction } from 'express';

// Simple metrics for Prometheus
let requestCount = 0;
let errorCount = 0;

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  requestCount++;
  res.on('finish', () => {
    if (res.statusCode >= 400) errorCount++;
  });
  next();
};

export const getMetrics = () => ({
  requests_total: requestCount,
  errors_total: errorCount,
  uptime: process.uptime(),
  memory_usage: process.memoryUsage(),
});