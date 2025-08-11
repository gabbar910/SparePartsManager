import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Customer } from '../../interfaces';
import { useAuth } from '../../contexts/auth';

const CustomerDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (!id || !isAuthenticated || !token) return;

    const fetchCustomer = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`/api/customers/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setCustomer(response.data);
      } catch (err: any) {
        console.error('Error fetching customer:', err);
        setError(err.response?.data?.error || 'Failed to fetch customer details');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, isAuthenticated, token]);

  if (!isAuthenticated) {
    return (
      <Layout title="Customer Details - Spare Parts Manager">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">Authentication Required</h2>
            <p className="text-yellow-700">Please log in to view customer details.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout title="Customer Details - Spare Parts Manager">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Customer Details - Spare Parts Manager">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <Link
                    href="/customers"
                    className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                  >
                    Back to Customers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!customer) {
    return (
      <Layout title="Customer Details - Spare Parts Manager">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Customer Not Found</h2>
            <p className="text-gray-600 mb-4">The requested customer could not be found.</p>
            <Link
              href="/customers"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Back to Customers
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${customer.name} - Customer Details`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Details</h1>
              <p className="text-gray-600">View detailed information for this customer</p>
            </div>
            <Link
              href="/customers"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Customers
            </Link>
          </div>
        </div>

        {/* Customer Information Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">Customer Information</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Customer ID</label>
                <p className="text-lg font-semibold text-gray-900">{customer.customerId}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <p className="text-lg font-semibold text-gray-900">{customer.name}</p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                <p className="text-lg text-gray-900">{customer.address}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">City</label>
                <p className="text-lg text-gray-900">{customer.city}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">State</label>
                <p className="text-lg text-gray-900">{customer.state}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Pincode</label>
                <p className="text-lg text-gray-900">{customer.pincode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Customer
          </button>
          
          <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDetailPage;
