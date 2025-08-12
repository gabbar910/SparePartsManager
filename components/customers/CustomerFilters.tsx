import React, { useState, useEffect } from 'react';
import { Customer } from '../../interfaces';
import '../../styles/CustomerFilters.css'; // Assuming you have some styles for this component

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
    <div className="filter-section">            
        {/* Search Input */}
        <div>
          <label htmlFor="search">Customer Name</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter name ..."            
          />
        </div>

        {/* State Filter */}
        <div>
          <label htmlFor="state">
            Filter by State
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => handleStateChange(e.target.value)}          
          >
            <option value="">All States</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* City Filter */}
        <div>
          <label htmlFor="city">
            Filter by City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}            
          >
            <option value="">All Cities</option>
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Pincode Filter */}
        <div>
          <label htmlFor="pincode">
            Filter by Pincode
          </label>
          <select
            id="pincode"
            value={selectedPincode}
            onChange={(e) => setSelectedPincode(e.target.value)}            
          >
            <option value="">All Pincodes</option>
            {uniquePincodes.map(pincode => (
              <option key={pincode} value={pincode}>{pincode}</option>
            ))}
          </select>
        </div>      

      {/* Clear Filters Button */}
      <div>
        <label>All Filters</label>
        <button className="clear-btn"
          onClick={handleClearFilters}          
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default CustomerFilters;
