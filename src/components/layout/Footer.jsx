import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Github, Twitter, Linkedin, Sparkles, Send, Heart } from 'lucide-react';
import Button from '../ui/Button';

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-md shadow-indigo-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Interact<span className="text-indigo-400">AI</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering job seekers worldwide with dynamic real-time AI mock interviews, smart speech metrics, and personalized answer refactoring.
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
                  className="glass-input flex-1 px-3.5 py-2 rounded-xl text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500"
                />
                <Button variant="primary" size="sm" icon={Send} />
              </div>
            </div>
          </div>

          {/* Col 1 - Product */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-slate-400 hover:text-indigo-300 transition-colors">AI Voice Interviewer</a></li>
              <li><a href="#features" className="text-slate-400 hover:text-indigo-300 transition-colors">STAR Feedback Generator</a></li>
              <li><a href="#roles" className="text-slate-400 hover:text-indigo-300 transition-colors">System Design Room</a></li>
              <li><a href="#pricing" className="text-slate-400 hover:text-indigo-300 transition-colors">Enterprise Plan</a></li>
              <li><Link to="/setup" className="text-slate-400 hover:text-indigo-300 transition-colors">Try Practice Room</Link></li>
            </ul>
          </div>

          {/* Col 2 - Roles */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Popular Roles</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#roles" className="text-slate-400 hover:text-indigo-300 transition-colors">Full-Stack Engineer</a></li>
              <li><a href="#roles" className="text-slate-400 hover:text-indigo-300 transition-colors">Product Manager</a></li>
              <li><a href="#roles" className="text-slate-400 hover:text-indigo-300 transition-colors">Data Scientist</a></li>
              <li><a href="#roles" className="text-slate-400 hover:text-indigo-300 transition-colors">Engineering Manager</a></li>
              <li><a href="#roles" className="text-slate-400 hover:text-indigo-300 transition-colors">Behavioral & Culture</a></li>
            </ul>
          </div>

          {/* Col 3 - Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-indigo-300 transition-colors">Interview Prep Guide</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-300 transition-colors">Top 100 System Design Qs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-300 transition-colors">Behavioral Cheat Sheet</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-300 transition-colors">Community Discord</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-300 transition-colors">API & Docs</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} InteractAI Platform Inc. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>for job seekers worldwide.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Security</a>

            <div className="flex items-center gap-3 ml-2">
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 transition-colors">
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
