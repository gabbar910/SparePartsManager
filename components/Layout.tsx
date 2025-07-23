import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "../contexts/auth";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <nav className="flex space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
              <Link href="/about" className="text-blue-600 hover:text-blue-800">
                About
              </Link>
              <Link href="/users" className="text-blue-600 hover:text-blue-800">
                Users List
              </Link>
              <Link href="/api/users" className="text-blue-600 hover:text-blue-800">
                Users API
              </Link>
            </nav>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <span className="text-gray-600">I'm here to stay (Footer)</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
