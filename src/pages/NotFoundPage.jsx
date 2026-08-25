import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import { Home, Sparkles } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="pt-32 pb-24 text-center space-y-6 max-w-md mx-auto px-4">
        <div className="text-7xl font-extrabold text-indigo-400">404</div>
        <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
        <p className="text-slate-400 text-sm">
          The interview room or resource you are looking for does not exist or has been moved.
        </p>

        <Link to="/" className="inline-block pt-4">
          <Button variant="primary" icon={Home}>
            Back to Home Page
          </Button>
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
