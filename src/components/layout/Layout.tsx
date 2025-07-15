import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  bgColor?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, bgColor = '' }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${bgColor}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;