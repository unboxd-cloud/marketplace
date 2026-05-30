import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const router = Router();

interface Vendor {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

const vendors: Vendor[] = [];

router.get('/', (_, res) => {
  res.json({ vendors });
});

router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email required' });
  }
  const vendor: Vendor = { id: uuid(), name, email, createdAt: new Date() };
  vendors.push(vendor);
  res.status(201).json(vendor);
});

router.get('/:id', (req, res) => {
  const vendor = vendors.find(v => v.id === req.params.id);
  if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
  res.json(vendor);
});

export { router as vendorRoutes, Vendor };