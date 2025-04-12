import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createPaymentIntent, createSubscription, formatCurrency } from '../lib/payments/paymentProcessor';

// Mock Stripe
vi.mock('@stripe/stripe-js', () => ({
  loadStripe: vi.fn().mockResolvedValue({
    redirectToCheckout: vi.fn().mockResolvedValue({ error: null })
  })
}));

describe('Payment Processing', () => {
  describe('createPaymentIntent', () => {
    it('creates payment intent successfully', async () => {
      const amount = 15000; // $150.00
      const currency = 'usd';
      const metadata = {
        serviceId: 'service_123',
        description: 'Electrical Inspection'
      };
      
      // Mock fetch
      global.fetch = vi.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            clientSecret: 'pi_test_secret',
            id: 'pi_test',
            amount,
            currency,
            status: 'requires_payment_method'
          })
        })
      );
      
      const result = await createPaymentIntent(amount, currency, metadata);
      
      expect(result).toBeDefined();
      expect(result.clientSecret).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.amount).toBe(amount);
      expect(result.currency).toBe(currency);
      expect(result.status).toBeDefined();
      
      // Restore fetch
      global.fetch.mockRestore();
    });
    
    it('handles API errors', async () => {
      const amount = 15000;
      
      // Mock fetch with error
      global.fetch = vi.fn().mockImplementation(() => 
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: 'Bad Request'
        })
      );
      
      await expect(createPaymentIntent(amount)).rejects.toThrow('Failed to initialize payment');
      
      // Restore fetch
      global.fetch.mockRestore();
    });
  });
  
  describe('createSubscription', () => {
    it('creates subscription successfully', async () => {
      const customerId = 'cus_test';
      const priceId = 'price_test';
      const metadata = {
        planName: 'Monthly Maintenance'
      };
      
      // Mock fetch
      global.fetch = vi.fn().mockImplementation(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            id: 'sub_test',
            customerId,
            priceId,
            status: 'active',
            current_period_end: Date.now() + 30 * 24 * 60 * 60 * 1000,
            cancel_at_period_end: false
          })
        })
      );
      
      const result = await createSubscription(customerId, priceId, metadata);
      
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.customerId).toBe(customerId);
      expect(result.priceId).toBe(priceId);
      expect(result.status).toBe('active');
      expect(result.current_period_end).toBeDefined();
      
      // Restore fetch
      global.fetch.mockRestore();
    });
    
    it('handles API errors', async () => {
      const customerId = 'cus_test';
      const priceId = 'price_test';
      
      // Mock fetch with error
      global.fetch = vi.fn().mockImplementation(() => 
        Promise.resolve({
          ok: false,
          status: 400,
          statusText: 'Bad Request'
        })
      );
      
      await expect(createSubscription(customerId, priceId)).rejects.toThrow('Failed to create subscription');
      
      // Restore fetch
      global.fetch.mockRestore();
    });
  });
  
  describe('formatCurrency', () => {
    it('formats USD correctly', () => {
      expect(formatCurrency(1000)).toBe('$10.00');
      expect(formatCurrency(1050)).toBe('$10.50');
      expect(formatCurrency(1005)).toBe('$10.05');
      expect(formatCurrency(0)).toBe('$0.00');
    });
    
    it('formats other currencies correctly', () => {
      expect(formatCurrency(1000, 'eur')).toBe('€10.00');
      expect(formatCurrency(1000, 'gbp')).toBe('£10.00');
      expect(formatCurrency(1000, 'jpy')).toBe('¥10.00');
    });
  });
});
