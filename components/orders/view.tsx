import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type OrdersViewProps = {
    orderId: string;
}

const OrdersView: React.FC<OrdersViewProps> = ({ orderId }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
            <div>
                <span>Order view Page: {orderId} </span>
            </div>
        );

};

export default OrdersView;