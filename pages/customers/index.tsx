import React from 'react';
import Layout from '../../components/Layout';
import CustomerList from '../../components/customers/CustomerList';

const CustomersPage: React.FC = () => {
  return (
    <Layout title="Customers - Spare Parts Manager">
      <CustomerList />
    </Layout>
  );
};

export default CustomersPage;
