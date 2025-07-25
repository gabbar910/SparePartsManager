import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "../contexts/auth";
import MainNavigation from "./MainNavigation";

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
      <MainNavigation />
      <main className="max-w-7xl mx-auto pt-20 pb-6 px-4 sm:px-6 lg:px-8">
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
