import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Database, Cpu, Layout, Brain, Users, Sparkles, ArrowRight, Check } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const RoleCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Engineering', 'System Design', 'Product', 'Data & AI', 'Behavioral'];

  const tracks = [
    {
      id: 'sw-frontend',
      category: 'Engineering',
      title: 'Senior Frontend Engineer',
      level: 'Mid to Lead Level',
      questionsCount: '120+ Questions',
      skills: ['React 18', 'TypeScript', 'Web Performance', 'State Management'],
      icon: Code,
      badgeColor: 'indigo'
    },
    {
      id: 'sw-backend',
      category: 'Engineering',
      title: 'Backend & Microservices',
      level: 'Senior Level',
      questionsCount: '150+ Questions',
      skills: ['Node.js/Go/Java', 'PostgreSQL', 'Distributed Caching', 'Concurrency'],
      icon: Database,
      badgeColor: 'cyan'
    },
    {
      id: 'system-design',
      category: 'System Design',
      title: 'Distributed System Design',
      level: 'Staff / Principal',
      questionsCount: '80+ Case Studies',
      skills: ['Scalability', 'Load Balancing', 'Sharding', 'Kafka & Queues'],
      icon: Cpu,
      badgeColor: 'purple'
    },
    {
      id: 'prod-mgmt',
      category: 'Product',
      title: 'Technical Product Manager',
      level: 'Senior PM',
      questionsCount: '95+ Scenarios',
      skills: ['Product Strategy', 'Metrics & KPIs', 'Prioritization', 'User Pain Points'],
      icon: Layout,
      badgeColor: 'amber'
    },
    {
      id: 'data-ml',
      category: 'Data & AI',
      title: 'Machine Learning Engineer',
      level: 'Mid to Senior',
      questionsCount: '110+ Questions',
      skills: ['LLMs & Fine-Tuning', 'PyTorch', 'Model Evaluation', 'MLOps Pipeline'],
      icon: Brain,
      badgeColor: 'emerald'
    },
    {
      id: 'behavioral',
      category: 'Behavioral',
      title: 'Behavioral & Leadership',
      level: 'All Experience Levels',
      questionsCount: '200+ Scenarios',
      skills: ['Conflict Resolution', 'Cross-functional Alignment', 'Failure & Lessons'],
      icon: Users,
      badgeColor: 'rose'
    }
  ];

  const filteredTracks = selectedCategory === 'All' 
    ? tracks 
    : tracks.filter(t => t.category === selectedCategory);

  return (
    <section id="roles" className="py-24 relative bg-slate-950/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TAILORED INDUSTRY TRACKS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore Specialized <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
              Mock Interview Tracks
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Choose your specialization and get questions calibrated to top tech company rubrics.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => {
            const Icon = track.icon;
            return (
              <GlassCard key={track.id} className="flex flex-col justify-between p-6 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={track.badgeColor}>{track.level}</Badge>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">{track.questionsCount}</p>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {track.skills.map((skill) => (
                      <span key={skill} className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <Link to="/setup">
                    <Button variant="outline" size="sm" className="w-full justify-between group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all">
                      <span>Launch This Track</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default RoleCategories;
