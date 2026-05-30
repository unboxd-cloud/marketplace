export const config = {
  port: parseInt(process.env.PORT || '3000'),
  tikvEndpoints: process.env.TIKV_ENDPOINTS?.split(',') || ['http://localhost:2379'],
  jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
  ap2SigningKey: process.env.AP2_SIGNING_KEY || '',
  prometheusEnabled: process.env.PROMETHEUS_ENABLED === 'true',
  jaegerEndpoint: process.env.JAEGER_ENDPOINT || 'http://localhost:14268',
};