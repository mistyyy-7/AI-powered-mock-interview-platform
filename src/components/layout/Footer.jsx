import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Github, Twitter, Linkedin, Send, Heart, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 border-t border-indigo-500/20 pt-16 pb-12 overflow-hidden z-10">
      
      {/* Subtle animated gradient glow line above footer */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
      
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-purple-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-400 p-0.5 shadow-md shadow-purple-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Interact<span className="text-purple-400">AI</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              AI-powered interview preparation platform. Practice realistic mock interviews, receive instant AI voice feedback, and land your dream offer.
            </p>

            {/* Newsletter input */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Subscribe to Interview Tips
              </label>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your work email..."
                  className="glass-input flex-1 px-3.5 py-2 rounded-xl text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500"
                />
                <Button variant="primary" size="sm" icon={Send} />
              </div>
            </div>
          </div>

          {/* Col 1 - Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-slate-400 hover:text-purple-300 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-slate-400 hover:text-purple-300 transition-colors">How It Works</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-purple-300 transition-colors">About Us</a></li>
              <li><Link to="/setup" className="text-slate-400 hover:text-purple-300 transition-colors">Start Interview</Link></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-purple-300 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 2 - Interview Tracks */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Interview Tracks</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/setup" className="text-slate-400 hover:text-purple-300 transition-colors">Frontend Engineering</Link></li>
              <li><Link to="/setup" className="text-slate-400 hover:text-purple-300 transition-colors">Backend & Systems</Link></li>
              <li><Link to="/setup" className="text-slate-400 hover:text-purple-300 transition-colors">System Design Room</Link></li>
              <li><Link to="/setup" className="text-slate-400 hover:text-purple-300 transition-colors">Product Management</Link></li>
              <li><Link to="/setup" className="text-slate-400 hover:text-purple-300 transition-colors">Behavioral & Culture</Link></li>
            </ul>
          </div>

          {/* Col 3 - Legal & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Legal & Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-purple-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-300 transition-colors">Security Overview</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-300 transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-300 transition-colors">API & Documentation</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} InteractAI Inc. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>for job seekers worldwide.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security</a>

            <div className="flex items-center gap-3 ml-2">
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-purple-400 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-purple-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-purple-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
