"use client";
import { AuthProvider } from '@/lib/auth/authProvider';
import UserDashboard from '@/components/UserDashboard';

export default function DashboardPage() {
  return (
    <AuthProvider>
      <UserDashboard />
    </AuthProvider>
  );
}
