import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Customer } from '../../interfaces';
import { useAuth } from '../../contexts/auth';
import CustomerFilters from './CustomerFilters';
import CustomerTable from './CustomerTable';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, token } = useAuth();

  // Fetch all customers
  const fetchCustomers = useCallback(async () => {
    if (!isAuthenticated || !token) {
      setError('Authentication required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/customers', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (err: any) {
      console.error('Error fetching customers:', err);
      setError(err.response?.data?.error || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  // Fetch customers by state
  const fetchCustomersByState = useCallback(async (state: string) => {
    if (!isAuthenticated || !token) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/customers/state/${encodeURIComponent(state)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (err: any) {
      console.error('Error fetching customers by state:', err);
      setError(err.response?.data?.error || 'Failed to fetch customers by state');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  // Fetch customers by city
  const fetchCustomersByCity = useCallback(async (city: string) => {
    if (!isAuthenticated || !token) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/customers/city/${encodeURIComponent(city)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setCustomers(response.data);
      setFilteredCustomers(response.data);
    } catch (err: any) {
      console.error('Error fetching customers by city:', err);
      setError(err.response?.data?.error || 'Failed to fetch customers by city');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  // Initial load
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Handle filter changes
  const handleFilter = useCallback((filtered: Customer[]) => {
    setFilteredCustomers(filtered);
  }, []);

  // Handle state filter (API call)
  const handleStateFilter = useCallback((state: string) => {
    if (state) {
      fetchCustomersByState(state);
    } else {
      fetchCustomers();
    }
  }, [fetchCustomersByState, fetchCustomers]);

  // Handle city filter (API call)
  const handleCityFilter = useCallback((city: string) => {
    if (city) {
      fetchCustomersByCity(city);
    } else {
      fetchCustomers();
    }
  }, [fetchCustomersByCity, fetchCustomers]);

  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Authentication Required</h2>
          <p className="text-yellow-700">Please log in to view customers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
        <p className="text-gray-600">View and filter customer information</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
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
                <button
                  onClick={fetchCustomers}
                  className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CustomerFilters
        customers={customers}
        onFilter={handleFilter}
        onStateFilter={handleStateFilter}
        onCityFilter={handleCityFilter}
        onClearFilters={handleClearFilters}
      />

      <CustomerTable customers={filteredCustomers} loading={loading} />
    </div>
  );
};

export default CustomerList;
