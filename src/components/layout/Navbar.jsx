import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Sparkles, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import api from '../../services/api';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    api.logout();
    window.location.reload();
  };

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-[#020617]/85 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_0_0_rgba(255,255,255,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px]">

          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="InteractAI home">
            {/* Logo mark */}
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 group-hover:from-cyan-500/50 group-hover:to-blue-600/50 transition-all duration-300" />
              <div className="absolute inset-[1px] rounded-[10px] bg-[#020617] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
              </div>
              {/* Active indicator dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full border-2 border-[#020617] animate-pulse" />
            </div>

            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-[17px] tracking-tight text-white">
                Interact<span className="text-gradient-cyan">AI</span>
              </span>
              <span className="text-[9px] text-slate-500 font-medium tracking-[0.12em] uppercase">
                AI Interview Lab
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            <Link
              to="/"
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'text-cyan-400 bg-cyan-500/8'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-white px-3.5 py-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {token && user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" icon={LayoutDashboard}>
                    Dashboard
                  </Button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/8 transition-colors"
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
            )}

            <Link to="/setup">
              <Button variant="primary" size="sm" icon={Sparkles} className="shadow-lg shadow-cyan-500/20">
                Start Interview
              </Button>
            </Link>
          </div>

          {/* Mobile: login + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/setup">
              <Button variant="primary" size="xs" className="shadow-md shadow-cyan-500/20">
                Start
              </Button>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="bg-[#020617]/96 backdrop-blur-2xl border-t border-white/[0.06] px-4 py-5 space-y-1">
          <Link
            to="/"
            className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Home
          </Link>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 mt-3 border-t border-white/[0.06] flex flex-col gap-2">
            {token ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" className="w-full justify-center" icon={LayoutDashboard}>
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-rose-400 hover:text-rose-300"
                  onClick={handleLogout}
                  icon={LogOut}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="secondary" className="w-full justify-center">Login</Button>
              </Link>
            )}
            <Link to="/setup" onClick={() => setMobileOpen(false)}>
              <Button variant="primary" icon={Sparkles} className="w-full justify-center shadow-lg shadow-cyan-500/20">
                Start Interview →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
