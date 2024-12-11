import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from '../dashboard/components/Footer';

const MainLayout: React.FC = () => {
  return (
    <>
   
      <Navigation />
      <Outlet />
      <div className='' style={{ background: "black" }}>
      <Footer />
      </div>
    </>
  );
};

export default MainLayout;