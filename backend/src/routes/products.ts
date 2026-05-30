import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const router = Router();

interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  createdAt: Date;
}

const products: Product[] = [];

router.get('/', (req, res) => {
  const { category, vendorId } = req.query;
  let filtered = products;
  if (category) filtered = filtered.filter(p => p.category === category);
  if (vendorId) filtered = filtered.filter(p => p.vendorId === vendorId);
  res.json({ products: filtered });
});

router.post('/', (req, res) => {
  const { vendorId, name, description, price, category, imageUrl } = req.body;
  if (!vendorId || !name || !price) {
    return res.status(400).json({ error: 'vendorId, name, price required' });
  }
  const product: Product = { 
    id: uuid(), vendorId, name, description, price, 
    category: category || 'general', imageUrl: imageUrl || '', 
    createdAt: new Date() 
  };
  products.push(product);
  res.status(201).json(product);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

export { router as productRoutes, Product };