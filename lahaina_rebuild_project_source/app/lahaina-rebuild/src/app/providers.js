"use client";
import { AuthProvider } from '@/lib/auth/authProvider';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
