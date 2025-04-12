import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { getContractorRating, getContractorReviews, submitContractorRating } from '../lib/blockchain/ratingSystem';

// Mock ethers
vi.mock('ethers', () => ({
  BrowserProvider: vi.fn(),
  JsonRpcProvider: vi.fn(),
  Contract: vi.fn()
}));

// Mock web3
vi.mock('web3', () => ({
  default: vi.fn()
}));

describe('Blockchain Rating System', () => {
  describe('getContractorRating', () => {
    it('returns contractor rating data', async () => {
      const contractorId = '0x1234567890123456789012345678901234567890';
      
      const result = await getContractorRating(contractorId);
      
      expect(result).toBeDefined();
      expect(result.contractorId).toBe(contractorId);
      expect(result.averageRating).toBeGreaterThanOrEqual(0);
      expect(result.averageRating).toBeLessThanOrEqual(5);
      expect(result.totalReviews).toBeGreaterThanOrEqual(0);
      expect(result.verified).toBe(true);
    });
    
    it('handles non-hex contractor IDs', async () => {
      const contractorId = '1234567890123456789012345678901234567890';
      
      const result = await getContractorRating(contractorId);
      
      expect(result).toBeDefined();
      expect(result.contractorId).toBe('0x1234567890123456789012345678901234567890');
      expect(result.averageRating).toBeGreaterThanOrEqual(0);
      expect(result.totalReviews).toBeGreaterThanOrEqual(0);
    });
    
    it('returns default values for unknown contractors', async () => {
      const contractorId = '0x9999999999999999999999999999999999999999';
      
      const result = await getContractorRating(contractorId);
      
      expect(result).toBeDefined();
      expect(result.contractorId).toBe(contractorId);
      expect(result.averageRating).toBe(0);
      expect(result.totalReviews).toBe(0);
      expect(result.verified).toBe(true);
    });
  });
  
  describe('getContractorReviews', () => {
    it('returns contractor reviews', async () => {
      const contractorId = '0x1234567890123456789012345678901234567890';
      
      const result = await getContractorReviews(contractorId);
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      
      if (result.length > 0) {
        const review = result[0];
        expect(review.reviewId).toBeDefined();
        expect(review.clientId).toBeDefined();
        expect(review.rating).toBeGreaterThanOrEqual(1);
        expect(review.rating).toBeLessThanOrEqual(5);
        expect(review.comment).toBeDefined();
        expect(review.timestamp).toBeDefined();
        expect(review.verified).toBe(true);
        expect(review.transactionHash).toBeDefined();
      }
    });
    
    it('returns empty array for unknown contractors', async () => {
      const contractorId = '0x9999999999999999999999999999999999999999';
      
      const result = await getContractorReviews(contractorId);
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });
  
  describe('submitContractorRating', () => {
    it('submits rating successfully', async () => {
      const contractorId = '0x1234567890123456789012345678901234567890';
      const clientId = '0x0987654321098765432109876543210987654321';
      const rating = 4;
      const comment = 'Great service!';
      const projectId = 'project_123';
      
      const result = await submitContractorRating(contractorId, clientId, rating, comment, projectId);
      
      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.transactionHash).toBeDefined();
      expect(result.reviewId).toBeDefined();
      expect(result.contractorId).toBe(contractorId);
      expect(result.clientId).toBe(clientId);
      expect(result.rating).toBe(rating);
      expect(result.comment).toBe(comment);
      expect(result.timestamp).toBeDefined();
      expect(result.projectId).toBe(projectId);
    });
    
    it('validates rating value', async () => {
      const contractorId = '0x1234567890123456789012345678901234567890';
      const clientId = '0x0987654321098765432109876543210987654321';
      const invalidRating = 6; // Rating should be 1-5
      const comment = 'Great service!';
      const projectId = 'project_123';
      
      await expect(
        submitContractorRating(contractorId, clientId, invalidRating, comment, projectId)
      ).rejects.toThrow('Rating must be between 1 and 5');
    });
  });
});
