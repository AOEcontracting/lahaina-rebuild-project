import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { generateEstimate, calculateMaterialCosts, calculateLaborCosts, checkCodeCompliance } from '../lib/ai/estimationModule';

// Mock TensorFlow.js
vi.mock('@tensorflow/tfjs', () => ({
  browser: {
    fromPixels: vi.fn().mockResolvedValue({
      expandDims: vi.fn().mockReturnThis(),
      div: vi.fn().mockReturnThis(),
      dispose: vi.fn()
    })
  },
  tidy: vi.fn((callback) => callback()),
  image: {
    resizeBilinear: vi.fn().mockReturnThis()
  }
}));

describe('AI Estimation Module', () => {
  describe('calculateMaterialCosts', () => {
    it('calculates material costs correctly', () => {
      const components = [
        { type: 'outlet', count: 10, positions: [] },
        { type: 'switch', count: 5, positions: [] },
        { type: 'light_fixture', count: 3, positions: [] },
        { type: 'panel', count: 1, size: '200a', positions: [] }
      ];
      
      const result = calculateMaterialCosts(components);
      
      expect(result).toBeDefined();
      expect(result.items.length).toBeGreaterThan(0);
      expect(result.subtotal).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(result.subtotal); // Should include Lahaina multiplier
      
      // Check specific items
      const outletItem = result.items.find(item => item.description.includes('Outlet'));
      expect(outletItem).toBeDefined();
      expect(outletItem.quantity).toBe(10);
      
      const switchItem = result.items.find(item => item.description.includes('Switch'));
      expect(switchItem).toBeDefined();
      expect(switchItem.quantity).toBe(5);
    });
    
    it('handles empty components array', () => {
      const result = calculateMaterialCosts([]);
      
      expect(result).toBeDefined();
      expect(result.items.length).toBe(0);
      expect(result.subtotal).toBe(0);
      expect(result.total).toBe(0);
    });
  });
  
  describe('calculateLaborCosts', () => {
    it('calculates labor costs correctly', () => {
      const components = [
        { type: 'outlet', count: 10, positions: [] },
        { type: 'switch', count: 5, positions: [] },
        { type: 'light_fixture', count: 3, positions: [] },
        { type: 'panel', count: 1, size: '200a', positions: [] }
      ];
      
      const result = calculateLaborCosts(components);
      
      expect(result).toBeDefined();
      expect(result.items.length).toBeGreaterThan(0);
      expect(result.subtotal).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(result.subtotal); // Should include Lahaina multiplier
      
      // Check specific items
      const outletItem = result.items.find(item => item.description.includes('Outlet'));
      expect(outletItem).toBeDefined();
      expect(outletItem.hours).toBe(10 * 0.5); // 10 outlets * 0.5 hours each
      
      // Should include apprentice labor
      const apprenticeItem = result.items.find(item => item.description.includes('Apprentice'));
      expect(apprenticeItem).toBeDefined();
    });
    
    it('handles empty components array', () => {
      const result = calculateLaborCosts([]);
      
      expect(result).toBeDefined();
      expect(result.items.length).toBe(0);
      expect(result.subtotal).toBe(0);
      expect(result.total).toBe(0);
    });
  });
  
  describe('checkCodeCompliance', () => {
    it('identifies GFCI requirements in wet locations', () => {
      const components = [
        { type: 'outlet', count: 10, positions: [] },
        { type: 'gfci', count: 1, positions: [] }
      ];
      
      const propertyDetails = {
        hasWetLocations: true,
        squareFootage: 1500
      };
      
      const result = checkCodeCompliance(components, propertyDetails);
      
      expect(result).toBeDefined();
      expect(result.compliant).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
      expect(result.issues[0].code).toBe('NEC 210.8');
    });
    
    it('identifies panel capacity issues for large homes', () => {
      const components = [
        { type: 'panel', count: 1, size: '100a', positions: [] }
      ];
      
      const propertyDetails = {
        hasWetLocations: false,
        squareFootage: 2500
      };
      
      const result = checkCodeCompliance(components, propertyDetails);
      
      expect(result).toBeDefined();
      expect(result.compliant).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
      expect(result.issues[0].code).toBe('NEC 220');
    });
    
    it('identifies outlet spacing requirements', () => {
      const components = [
        { type: 'outlet', count: 5, positions: [] }
      ];
      
      const propertyDetails = {
        hasWetLocations: false,
        squareFootage: 2500
      };
      
      const result = checkCodeCompliance(components, propertyDetails);
      
      expect(result).toBeDefined();
      expect(result.compliant).toBe(false);
      expect(result.issues.length).toBeGreaterThan(0);
      expect(result.issues[0].code).toBe('NEC 210.52');
    });
    
    it('passes compliant configurations', () => {
      const components = [
        { type: 'outlet', count: 20, positions: [] },
        { type: 'gfci', count: 5, positions: [] },
        { type: 'panel', count: 1, size: '200a', positions: [] }
      ];
      
      const propertyDetails = {
        hasWetLocations: true,
        squareFootage: 2500
      };
      
      const result = checkCodeCompliance(components, propertyDetails);
      
      expect(result).toBeDefined();
      expect(result.compliant).toBe(true);
      expect(result.issues.length).toBe(0);
    });
  });
});
