import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../contexts/auth";

const MainNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
    };

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
                        <li>
                            {/* User Authentication Section */}
                            {isAuthenticated ? (
                                <div className="auth-section">
                                    <span className="user-info">Welcome, {user?.username}</span>
                                    <button 
                                        onClick={handleLogout}
                                        className="logout-btn"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="auth-section">
                                    <Link href="/login" className="login-link">Login</Link>
                                </div>
                            )}
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
