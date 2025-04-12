import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { AuthProvider, useAuth } from '../lib/auth/authProvider';

// Mock the auth context
vi.mock('../lib/auth/authProvider', async () => {
  const actual = await vi.importActual('../lib/auth/authProvider');
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

// Mock window.location
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('Authentication Components', () => {
  describe('LoginForm', () => {
    const mockLogin = vi.fn();
    
    beforeEach(() => {
      useAuth.mockReturnValue({
        login: mockLogin,
        loading: false,
        error: null,
      });
    });
    
    afterEach(() => {
      vi.clearAllMocks();
    });
    
    it('renders login form correctly', () => {
      render(<LoginForm />);
      
      expect(screen.getByText('Log In')).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      expect(screen.getByText('Remember me')).toBeInTheDocument();
      expect(screen.getByText('Forgot password?')).toBeInTheDocument();
      expect(screen.getByText('Don\'t have an account?')).toBeInTheDocument();
      expect(screen.getByText('Register')).toBeInTheDocument();
    });
    
    it('validates form inputs', async () => {
      render(<LoginForm />);
      
      // Submit without filling in fields
      fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
      
      await waitFor(() => {
        expect(screen.getByText('Please enter both email and password')).toBeInTheDocument();
      });
      
      // Login should not be called
      expect(mockLogin).not.toHaveBeenCalled();
    });
    
    it('calls login function with correct credentials', async () => {
      render(<LoginForm />);
      
      // Fill in form
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
      
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });
    
    it('shows loading state when submitting', async () => {
      useAuth.mockReturnValue({
        login: mockLogin,
        loading: true,
        error: null,
      });
      
      render(<LoginForm />);
      
      expect(screen.getByRole('button', { name: /Logging in/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Logging in/i })).toBeDisabled();
    });
    
    it('shows error message when login fails', async () => {
      useAuth.mockReturnValue({
        login: mockLogin,
        loading: false,
        error: 'Invalid credentials',
      });
      
      render(<LoginForm />);
      
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
  
  describe('RegisterForm', () => {
    const mockRegister = vi.fn();
    
    beforeEach(() => {
      useAuth.mockReturnValue({
        register: mockRegister,
        loading: false,
        error: null,
      });
    });
    
    afterEach(() => {
      vi.clearAllMocks();
    });
    
    it('renders register form correctly', () => {
      render(<RegisterForm />);
      
      expect(screen.getByText('Create an Account')).toBeInTheDocument();
      expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/I am a:/i)).toBeInTheDocument();
      expect(screen.getByText('I agree to the')).toBeInTheDocument();
      expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    });
    
    it('validates form inputs', async () => {
      render(<RegisterForm />);
      
      // Submit without filling in fields
      fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
      
      await waitFor(() => {
        expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
      });
      
      // Register should not be called
      expect(mockRegister).not.toHaveBeenCalled();
    });
    
    it('validates password match', async () => {
      render(<RegisterForm />);
      
      // Fill in form with mismatched passwords
      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/^Password/i), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password456' } });
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
      
      await waitFor(() => {
        expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
      });
      
      // Register should not be called
      expect(mockRegister).not.toHaveBeenCalled();
    });
    
    it('validates password length', async () => {
      render(<RegisterForm />);
      
      // Fill in form with short password
      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/^Password/i), { target: { value: 'pass' } });
      fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'pass' } });
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
      
      await waitFor(() => {
        expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
      });
      
      // Register should not be called
      expect(mockRegister).not.toHaveBeenCalled();
    });
    
    it('calls register function with correct details', async () => {
      render(<RegisterForm />);
      
      // Fill in form
      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test User' } });
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
      fireEvent.change(screen.getByLabelText(/^Password/i), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'password123' } });
      fireEvent.click(screen.getByLabelText(/I agree to the/i));
      
      // Submit form
      fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
      
      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith('Test User', 'test@example.com', 'password123', 'client');
      });
    });
  });
});
