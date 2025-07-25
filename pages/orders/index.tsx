import Link from "next/link";
import Layout from "../../components/Layout";
import OrdersView from "../../components/orders/list"

const OrdersPage = () => (
  <Layout title="View All Orders">
    <OrdersView />
  </Layout>
);

export default OrdersPage;