import Link from "next/link";
import Layout from "../../components/Layout";
import OrdersView from "../../components/orders/view"
import { useRouter } from "next/router";

const ViewOrder = () => {
    const router = useRouter();
    const { id } = router.query;

    if (!id || Array.isArray(id)) {
        return <Layout title="Invalid Order">
            <div>Invalid order ID</div>
        </Layout>;
    }    

    return (
        <Layout title={'Order ${id} | Details'}>
            <OrdersView orderId={id} />
        </Layout>
    );
};

export default ViewOrder;