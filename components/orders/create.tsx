import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CreateOrder = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
            <div>
                <span>Order Creation Page</span>
            </div>
        );

};

export default CreateOrder;