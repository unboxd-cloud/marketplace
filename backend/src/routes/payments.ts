import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const router = Router();

interface Payment {
  id: string;
  agentId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  ap2Signature: string;
  createdAt: Date;
}

const payments: Payment[] = [];

router.post('/initiate', (req, res) => {
  const { agentId, amount, currency } = req.body;
  if (!agentId || !amount) {
    return res.status(400).json({ error: 'agentId and amount required' });
  }
  const payment: Payment = {
    id: uuid(),
    agentId,
    amount,
    currency: currency || 'USD',
    status: 'pending',
    ap2Signature: '', // Will be verified against AP2 protocol
    createdAt: new Date()
  };
  payments.push(payment);
  res.status(201).json({ paymentId: payment.id, status: 'pending' });
});

router.post('/confirm', (req, res) => {
  const { paymentId, ap2Signature } = req.body;
  const payment = payments.find(p => p.id === paymentId);
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  
  // AP2 signature verification would go here
  payment.ap2Signature = ap2Signature;
  payment.status = 'completed';
  res.json({ paymentId, status: 'completed' });
});

router.get('/:id', (req, res) => {
  const payment = payments.find(p => p.id === req.params.id);
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  res.json(payment);
});

export { router as paymentRoutes, Payment };