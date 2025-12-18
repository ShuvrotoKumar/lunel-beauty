'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiPackage, FiUsers, FiDollarSign, FiPieChart, FiSettings, FiLogOut } from 'react-icons/fi';

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
  change: string;
};

const StatCard = ({ title, value, icon, trend, change }: StatCardProps) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
          <div className="text-white">{icon}</div>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              <div className={`ml-2 flex items-baseline text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? (
                  <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span className="sr-only">{trend === 'up' ? 'Increased' : 'Decreased'} by</span>
                {change}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const RecentOrders = () => (
  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
      <p className="mt-1 text-sm text-gray-500">A list of recent orders placed by customers.</p>
    </div>
    <div className="bg-white overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {[
          { id: '#LUN-001', customer: 'John Doe', status: 'Delivered', total: '$129.99', date: '2023-06-15' },
          { id: '#LUN-002', customer: 'Jane Smith', status: 'Shipped', total: '$89.99', date: '2023-06-14' },
          { id: '#LUN-003', customer: 'Robert Johnson', status: 'Processing', total: '$199.99', date: '2023-06-14' },
          { id: '#LUN-004', customer: 'Emily Davis', status: 'Delivered', total: '$149.99', date: '2023-06-13' },
          { id: '#LUN-005', customer: 'Michael Wilson', status: 'Cancelled', total: '$59.99', date: '2023-06-12' },
        ].map((order) => (
          <li key={order.id} className="px-6 py-4">
            <div className="flex items-center">
              <div className="min-w-0 flex-1 flex items-center">
                <div className="min-w-0 flex-1 px-4">
                  <div>
                    <p className="text-sm font-medium text-indigo-600 truncate">{order.id}</p>
                    <p className="mt-1 text-sm text-gray-500">{order.customer}</p>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${
                  order.status === 'Delivered' ? 'text-green-600' : 
                  order.status === 'Shipped' ? 'text-blue-600' : 
                  order.status === 'Processing' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {order.status}
                </p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div className="ml-4 text-right">
                <p className="text-sm font-medium text-gray-900">{order.total}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    <div className="bg-gray-50 px-4 py-3 sm:px-6 text-right">
      <Link href="/admin/orders" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
        View all
      </Link>
    </div>
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is admin
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    
    if (!isAuthenticated || !isAdmin) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FiLogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="$24,780"
            icon={<FiDollarSign className="h-6 w-6" />}
            trend="up"
            change="12%"
          />
          <StatCard
            title="Total Orders"
            value="1,245"
            icon={<FiPackage className="h-6 w-6" />}
            trend="up"
            change="8%"
          />
          <StatCard
            title="Total Customers"
            value="845"
            icon={<FiUsers className="h-6 w-6" />}
            trend="up"
            change="5%"
          />
          <StatCard
            title="Conversion Rate"
            value="3.2%"
            icon={<FiPieChart className="h-6 w-6" />}
            trend="down"
            change="0.5%"
          />
        </div>

        {/* Recent Orders */}
        <div className="mt-8">
          <RecentOrders />
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Add New Product', icon: <FiPackage className="h-6 w-6" />, href: '/admin/products/new' },
              { title: 'View Customers', icon: <FiUsers className="h-6 w-6" />, href: '/admin/customers' },
              { title: 'Manage Inventory', icon: <FiPackage className="h-6 w-6" />, href: '/admin/inventory' },
              { title: 'Store Settings', icon: <FiSettings className="h-6 w-6" />, href: '/admin/settings' },
            ].map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="bg-white overflow-hidden shadow rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors"
              >
                <div className="bg-indigo-100 rounded-full p-3 mb-3">
                  {action.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
