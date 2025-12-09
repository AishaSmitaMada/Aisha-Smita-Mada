import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Production from './pages/Production';
import Inventory from './pages/Inventory';
import Blueprint from './pages/Blueprint';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'production':
        return <Production />;
      case 'inventory':
        return <Inventory />;
      case 'blueprint':
        return <Blueprint />;
      case 'settings':
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-slate-300">Settings Module</h2>
            <p className="text-slate-400 mt-2">Configuration for Users, GL Accounts, and Printers.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
};

export default App;