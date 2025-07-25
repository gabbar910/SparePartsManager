import Link from "next/link";
import Layout from "../../components/Layout";
import OrdersView from "../../components/orders/create"

const CreateOrder = () => (
  <Layout title="Create New Order">
    <OrdersView />
  </Layout>
);

export default CreateOrder;