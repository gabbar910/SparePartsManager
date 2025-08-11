import React, { useState, useEffect } from 'react';
import { Customer } from '../../interfaces';

interface CustomerFiltersProps {
  customers: Customer[];
  onFilter: (filteredCustomers: Customer[]) => void;
  onStateFilter: (state: string) => void;
  onCityFilter: (city: string) => void;
  onClearFilters: () => void;
}

const CustomerFilters: React.FC<CustomerFiltersProps> = ({
  customers,
  onFilter,
  onStateFilter,
  onCityFilter,
  onClearFilters,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedPincode, setSelectedPincode] = useState('');

  // Get unique states and cities from customers data
  const uniqueStates = Array.from(new Set(customers.map(customer => customer.state))).sort();
  const uniqueCities = Array.from(new Set(customers.map(customer => customer.city))).sort();
  const uniquePincodes = Array.from(new Set(customers.map(customer => customer.pincode))).sort();

  // Filter customers based on search criteria
  useEffect(() => {
    let filtered = customers;

    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedState) {
      filtered = filtered.filter(customer => customer.state === selectedState);
    }

    if (selectedCity) {
      filtered = filtered.filter(customer => customer.city === selectedCity);
    }

    if (selectedPincode) {
      filtered = filtered.filter(customer => customer.pincode === selectedPincode);
    }

    onFilter(filtered);
  }, [searchTerm, selectedState, selectedCity, selectedPincode, customers, onFilter]);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity(''); // Clear city when state changes
    if (state) {
      onStateFilter(state);
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (city) {
      onCityFilter(city);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedState('');
    setSelectedCity('');
    setSelectedPincode('');
    onClearFilters();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Filter Customers</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search by Name or Address
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter name or address..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* State Filter */}
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by State
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All States</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* City Filter */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Cities</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Pincode Filter */}
        <div>
          <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Pincode
          </label>
          <select
            id="pincode"
            value={selectedPincode}
            onChange={(e) => setSelectedPincode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Pincodes</option>
            {uniquePincodes.map(pincode => (
              <option key={pincode} value={pincode}>{pincode}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-end">
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default CustomerFilters;
