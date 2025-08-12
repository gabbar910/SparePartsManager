import React from 'react';
import Link from 'next/link';
import { Customer } from '../../interfaces';

import '../../styles/CustomerTable.css'; // Assuming you have some styles for the table

interface CustomerTableProps {
  customers: Customer[];
  loading?: boolean;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, loading = false }) => {
  if (loading) {
    return (
      <div>
        <div>
          <div></div>
          <div>
            {[...Array(5)].map((_, i) => (
              <div key={i}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div>
        <p>No customers found</p>
        <p>Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <h2>Customers ({customers.length})</h2>      
      <div className="table-wrapper auto-overflow">
        <table >
          <thead className="fl-table">
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Pincode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="fl-table">
            {customers.map((customer) => (
              <tr key={customer.customerId} >
                <td >
                  {customer.customerId}
                </td>
                <td >
                  {customer.name}
                </td>
                <td className="truncate">
                  {customer.address}
                </td>
                <td >
                  {customer.city}
                </td>
                <td >
                  {customer.state}
                </td>
                <td >
                  {customer.pincode}
                </td>
                <td >
                  <Link
                    href={`/customers/${customer.customerId}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default CustomerTable;
