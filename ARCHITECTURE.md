# Unboxd Cloud Marketplace - Architecture

## Overview
Composable, headless, lightweight cloud native multivendor marketplace for images & artifacts with AI Agent Payments Protocol (AP2).

## Tech Stack (CNCF Projects - Composable)
- **Orchestration**: K3s (lightweight Kubernetes)
- **Database**: TiKV (CNCF project)
- **Observability**: Prometheus + Grafana (CNCF projects)
- **Logging**: Fluentd/Fluent Bit (CNCF project)
- **Tracing**: Jaeger (CNCF project)
- **CI/CD**: Argo CD (CNCF project)
- **Container Runtime**: ContainerD (CNCF project)
- **Payments**: AP2 Protocol (Agent Payments)
- **Auth**: JWT
- **API**: REST + GraphQL (headless, composable)
- **Security**: PCI DSS compliant

## Architecture (Composable Modules)
```
  +---------+  +-----------+  +-----------+
  | Vendor  |  |  Product  |  |  Payment  |
  | Module  |  |  Module   |  |  Module   |
  +---------+  +-----------+  +-----------+
  +---------+  +-----------+  +-----------+
  |  Order  |  |  Search   |  |Analytics  |
  | Module  |  |  Module   |  |  Module   |
  +---------+  +-----------+  +-----------+
```

## API Endpoints
- `POST /api/auth/*` - Authentication routes
- `GET/POST /api/vendors/*` - Vendor management
- `GET/POST /api/products/*` - Product CRUD
- `POST /api/payments/*` - AP2 payment processing
- `GET /api/orders/*` - Order management

## Security
- HTTPS only
- JWT token validation
- AP2 protocol signature verification
- Rate limiting & input sanitization
- PCI DSS compliant payments