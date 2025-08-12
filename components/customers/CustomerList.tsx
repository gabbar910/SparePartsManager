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
      <div>
        <div>
          <h2>Authentication Required</h2>
          <p>Please log in to view customers.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Customer Management</h1>
      </div>

      {error && (
        <div className="">
          <div>
            <div>
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3>Error</h3>
              <div>
                <p>{error}</p>
              </div>
              <div>
                <button
                  onClick={fetchCustomers}
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
