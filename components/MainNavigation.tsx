import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MainNavigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className="wrapper">
                        <Link href="/">
                            <Image 
                                src="/images/logo/helm-logo.svg" 
                                alt="Logo" 
                                width={120} 
                                height={30}
                                className="hover:opacity-80 transition-opacity logo"
                                priority
                            />                            
                        </Link>
                        <span>Spare Parts Manager</span>                                 
                {/* Desktop Navigation */}
                <nav className="main-nav">                    
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/customers">Customers</Link>
                        </li>
                        <li>
                            <Link href="/orders">Orders</Link>
                        </li>
                        <li>
                            <Link href="/spare-parts">Spare Parts</Link>
                        </li>
                    </ul>
                </nav>

                <div className="menu-toggle">
                    <div className="hamburger"></div>
                </div>                
            </div>
        </header>
    );

};

export default MainNavigation;
