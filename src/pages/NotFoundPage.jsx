import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CanvasBackground from '../components/ui/CanvasBackground';
import Button from '../components/ui/Button';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      <CanvasBackground />
      <Navbar />

      <main className="pt-36 pb-24 text-center space-y-6 max-w-md mx-auto px-4 relative z-10">
        <div className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
          404
        </div>
        <h1 className="text-3xl font-extrabold text-white">Page Not Found</h1>
        <p className="text-slate-400 text-sm">
          The interview room or neural resource you are looking for does not exist or has been relocated.
        </p>

        <Link to="/" className="inline-block pt-4">
          <Button variant="primary" icon={Home} className="shadow-lg shadow-purple-600/30">
            Back to Home Page
          </Button>
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
