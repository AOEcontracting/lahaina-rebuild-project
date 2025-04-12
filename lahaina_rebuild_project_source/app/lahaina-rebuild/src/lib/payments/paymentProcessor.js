// Payment Processing Module
// This module integrates with Stripe for payment processing

// Import required libraries
import { loadStripe } from '@stripe/stripe-js';

// Stripe public key (would be environment variable in production)
const STRIPE_PUBLIC_KEY = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

// Initialize Stripe
let stripePromise;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

/**
 * Create a payment intent for a one-time payment
 * @param {number} amount - Payment amount in cents
 * @param {string} currency - Currency code (default: 'usd')
 * @param {Object} metadata - Additional metadata for the payment
 * @returns {Promise<Object>} - Payment intent details
 */
export async function createPaymentIntent(amount, currency = 'usd', metadata = {}) {
  try {
    // In production, this would call a server endpoint that creates a payment intent
    // For development, we'll simulate the response
    
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        metadata
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }
    
    // Parse response
    const data = await response.json();
    
    // For development, simulate a successful response
    if (process.env.NODE_ENV === 'development') {
      return {
        clientSecret: 'pi_' + Math.random().toString(36).substring(2, 15) + '_secret_' + Math.random().toString(36).substring(2, 15),
        id: 'pi_' + Math.random().toString(36).substring(2, 15),
        amount,
        currency,
        status: 'requires_payment_method'
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Failed to initialize payment');
  }
}

/**
 * Set up a subscription for recurring payments
 * @param {string} customerId - Customer ID
 * @param {string} priceId - Price ID for the subscription
 * @param {Object} metadata - Additional metadata for the subscription
 * @returns {Promise<Object>} - Subscription details
 */
export async function createSubscription(customerId, priceId, metadata = {}) {
  try {
    // In production, this would call a server endpoint that creates a subscription
    // For development, we'll simulate the response
    
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        priceId,
        metadata
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }
    
    // Parse response
    const data = await response.json();
    
    // For development, simulate a successful response
    if (process.env.NODE_ENV === 'development') {
      return {
        id: 'sub_' + Math.random().toString(36).substring(2, 15),
        customerId,
        priceId,
        status: 'active',
        current_period_end: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
        cancel_at_period_end: false
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error('Failed to set up subscription');
  }
}

/**
 * Create a new customer in Stripe
 * @param {string} email - Customer email
 * @param {string} name - Customer name
 * @param {Object} metadata - Additional metadata for the customer
 * @returns {Promise<Object>} - Customer details
 */
export async function createCustomer(email, name, metadata = {}) {
  try {
    // In production, this would call a server endpoint that creates a customer
    // For development, we'll simulate the response
    
    const response = await fetch('/api/create-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        metadata
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create customer');
    }
    
    // Parse response
    const data = await response.json();
    
    // For development, simulate a successful response
    if (process.env.NODE_ENV === 'development') {
      return {
        id: 'cus_' + Math.random().toString(36).substring(2, 15),
        email,
        name,
        created: Date.now()
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw new Error('Failed to create customer');
  }
}

/**
 * Get payment methods for a customer
 * @param {string} customerId - Customer ID
 * @returns {Promise<Array>} - Array of payment methods
 */
export async function getPaymentMethods(customerId) {
  try {
    // In production, this would call a server endpoint that retrieves payment methods
    // For development, we'll simulate the response
    
    const response = await fetch(`/api/payment-methods?customerId=${customerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to retrieve payment methods');
    }
    
    // Parse response
    const data = await response.json();
    
    // For development, simulate a successful response
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          id: 'pm_' + Math.random().toString(36).substring(2, 15),
          type: 'card',
          card: {
            brand: 'visa',
            last4: '4242',
            exp_month: 12,
            exp_year: 2025
          }
        }
      ];
    }
    
    return data;
  } catch (error) {
    console.error('Error retrieving payment methods:', error);
    throw new Error('Failed to retrieve payment methods');
  }
}

/**
 * Get subscription details
 * @param {string} subscriptionId - Subscription ID
 * @returns {Promise<Object>} - Subscription details
 */
export async function getSubscription(subscriptionId) {
  try {
    // In production, this would call a server endpoint that retrieves subscription details
    // For development, we'll simulate the response
    
    const response = await fetch(`/api/subscription?subscriptionId=${subscriptionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to retrieve subscription');
    }
    
    // Parse response
    const data = await response.json();
    
    // For development, simulate a successful response
    if (process.env.NODE_ENV === 'development') {
      return {
        id: subscriptionId,
        status: 'active',
        current_period_end: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
        cancel_at_period_end: false,
        items: {
          data: [
            {
              price: {
                id: 'price_' + Math.random().toString(36).substring(2, 15),
                product: 'prod_' + Math.random().toString(36).substring(2, 15),
                unit_amount: 9900, // $99.00
                currency: 'usd',
                recurring: {
                  interval: 'month'
                }
              }
            }
          ]
        }
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    throw new Error('Failed to retrieve subscription');
  }
}

/**
 * Cancel a subscription
 * @param {string} subscriptionId - Subscription ID
 * @param {boolean} cancelAtPeriodEnd - Whether to cancel at the end of the current period
 * @returns {Promise<Object>} - Updated subscription details
 */
export async function cancelSubscription(subscriptionId, cancelAtPeriodEnd = true) {
  try {
    // In production, this would call a server endpoint that cancels a subscription
    // For development, we'll simulate the response
    
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscriptionId,
        cancelAtPeriodEnd
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }
    
    // Parse response
    const data = await response.json();
    
    // For development, simulate a successful response
    if (process.env.NODE_ENV === 'development') {
      return {
        id: subscriptionId,
        status: cancelAtPeriodEnd ? 'active' : 'canceled',
        cancel_at_period_end: cancelAtPeriodEnd,
        canceled_at: cancelAtPeriodEnd ? null : Date.now()
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw new Error('Failed to cancel subscription');
  }
}

/**
 * Create a payment link for a specific service
 * @param {string} serviceId - Service ID
 * @param {number} amount - Payment amount in cents
 * @param {string} description - Service description
 * @returns {Promise<Object>} - Payment link details
 */
export async function createPaymentLink(serviceId, amount, description) {
  try {
    // In production, this would call a server endpoint that creates a payment link
    // For development, we'll simulate the response
    
    const response = await fetch('/api/create-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceId,
        amount,
        description
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create payment link');
    }
    
    // Parse response
    const data = await response.json();
    
    // For development, simulate a successful response
    if (process.env.NODE_ENV === 'development') {
      return {
        id: 'plink_' + Math.random().toString(36).substring(2, 15),
        url: `https://checkout.stripe.com/pay/cs_test_${Math.random().toString(36).substring(2, 15)}`,
        amount,
        currency: 'usd',
        description
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw new Error('Failed to create payment link');
  }
}

/**
 * Format currency amount for display
 * @param {number} amount - Amount in cents
 * @param {string} currency - Currency code (default: 'usd')
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(amount, currency = 'usd') {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2
  });
  
  return formatter.format(amount / 100);
}

/**
 * Get available payment plans
 * @returns {Promise<Array>} - Array of payment plans
 */
export async function getPaymentPlans() {
  try {
    // In production, this would call a server endpoint that retrieves payment plans
    // For development, we'll return mock data
    
    // Mock payment plans
    const plans = [
      {
        id: 'plan_standard',
        name: 'Standard Plan',
        description: 'Pay as you go for electrical services',
        type: 'one-time',
        features: [
          'Pay per service',
          'Access to all contractors',
          'No commitment'
        ]
      },
      {
        id: 'plan_monthly',
        name: 'Monthly Maintenance',
        description: 'Regular electrical maintenance for your property',
        type: 'subscription',
        interval: 'month',
        amount: 9900, // $99.00
        currency: 'usd',
        features: [
          'Monthly electrical inspection',
          'Priority service',
          'Discounted rates on additional work',
          'Cancel anytime'
        ]
      },
      {
        id: 'plan_annual',
        name: 'Annual Service Plan',
        description: 'Comprehensive yearly electrical service package',
        type: 'subscription',
        interval: 'year',
        amount: 99900, // $999.00
        currency: 'usd',
        features: [
          'Quarterly electrical inspections',
          'Emergency service within 24 hours',
          'All standard maintenance included',
          '10% discount on all additional work',
          'Annual electrical code compliance check'
        ]
      }
    ];
    
    return plans;
  } catch (error) {
    console.error('Error retrieving payment plans:', error);
    throw new Error('Failed to retrieve payment plans');
  }
}
