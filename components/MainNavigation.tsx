import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MainNavigation = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <Image 
                            src="/images/logo/logo-light.svg" 
                            alt="Logo" 
                            width={120} 
                            height={30}
                            className="hover:opacity-80 transition-opacity"
                            priority
                        />
                    </Link>
                    <span className="text-xl font-semibold">Spare Parts Manager</span>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
                    <Link href="/customers" className="hover:text-gray-300 transition-colors">Customers</Link>
                    <Link href="/orders" className="hover:text-gray-300 transition-colors">Orders</Link>
                    <Link href="/spare-parts" className="hover:text-gray-300 transition-colors">Spare Parts</Link>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden absolute w-full bg-gray-800 pb-4">
                    <div className="container mx-auto px-4 flex flex-col space-y-3">
                        <Link href="/" className="py-2 hover:text-gray-300 transition-colors">Home</Link>
                        <Link href="/customers" className="py-2 hover:text-gray-300 transition-colors">Customers</Link>
                        <Link href="/orders" className="py-2 hover:text-gray-300 transition-colors">Orders</Link>
                        <Link href="/spare-parts" className="py-2 hover:text-gray-300 transition-colors">Spare Parts</Link>
                    </div>
                </div>
            )}
        </header>
    );

};

export default MainNavigation;
