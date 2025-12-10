import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronDown, ChevronUp, Mail, ExternalLink } from 'lucide-react';
import programsData from '@/data/programs-data.json';
import { getIconComponent } from '@/lib/icon-mapper';
import Navigation from '@/components/Navigation';

const tierColors = {
  Core: 'bg-primary/20 text-primary border-primary/30',
  Recommended: 'bg-accent/20 text-accent border-accent/30',
  Optional: 'bg-muted/20 text-muted-foreground border-muted/30',
  Featured: 'bg-secondary/20 text-secondary border-secondary/30'
};

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [expandedPrograms, setExpandedPrograms] = useState<Set<number>>(new Set());
  const [email, setEmail] = useState('');

  const programCategory = programsData.programs.find(p => p.slug === slug);

  if (!programCategory) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Program Not Found</h1>
          <Link to="/programs" className="text-primary hover:underline">
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  const toggleProgram = (index: number) => {
    const newExpanded = new Set(expandedPrograms);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPrograms(newExpanded);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to updates on ' + programCategory.title);
    setEmail('');
  };

  const relatedPrograms = programsData.programs
    .filter(p => p.id !== programCategory.id)
    .slice(0, 3);

  const ProgramIcon = getIconComponent(programCategory.icon);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="mb-8">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to All Programs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-xl p-8 border border-border/50"
              style={{ borderColor: programCategory.color + '40' }}
            >
              <div
                className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center text-2xl"
                style={{ backgroundColor: programCategory.color + '20', color: programCategory.color }}
              >
                <ProgramIcon className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold mb-4 gradient-text">{programCategory.title}</h1>
              <p className="text-lg text-muted-foreground">{programCategory.description}</p>
            </motion.div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Programs in this Category</h2>
              <div className="space-y-4">
                {programCategory.programs.map((program, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-effect rounded-xl border border-border/50 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleProgram(index)}
                      className="w-full p-6 text-left flex items-start justify-between hover:bg-card/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-xl font-semibold">{program.title}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              tierColors[program.tier as keyof typeof tierColors]
                            }`}
                          >
                            {program.tier}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{program.description}</p>
                      </div>
                      {expandedPrograms.has(index) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0 ml-4" />
                      )}
                    </button>

                    {expandedPrograms.has(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 space-y-6"
                      >
                        <div>
                          <h4 className="font-semibold text-primary mb-3">What We Offer</h4>
                          <ul className="space-y-2">
                            {program.activities.map((activity, i) => (
                              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                <span className="text-primary mt-1">✓</span>
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {program.requirements && (
                          <div>
                            <h4 className="font-semibold text-accent mb-3">Requirements</h4>
                            <p className="text-muted-foreground">{program.requirements}</p>
                          </div>
                        )}

                        {program.frequency && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-accent mb-2">Frequency</h4>
                              <p className="text-sm text-muted-foreground">{program.frequency}</p>
                            </div>
                            {program.lead && (
                              <div>
                                <h4 className="font-semibold text-secondary mb-2">Program Lead</h4>
                                <p className="text-sm text-muted-foreground">{program.lead}</p>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex gap-3 pt-4 border-t border-border">
                          <Link
                            to="/sign-up"
                            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Join This Program
                          </Link>
                          <button className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary transition-colors font-medium">
                            Learn More
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-xl p-8 border border-border/50"
            >
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Join the American Liberty Order and gain access to all our {programCategory.title.toLowerCase()}.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/sign-up"
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
                >
                  Become a Member
                </Link>
                <Link
                  to="/policies"
                  className="px-6 py-3 rounded-lg bg-card border border-border hover:border-primary transition-colors font-semibold"
                >
                  View Our Policies
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-xl p-6 border border-border/50"
            >
              <h3 className="font-semibold mb-4">Get Program Updates</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to receive updates about new programs and opportunities.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Subscribe
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-xl p-6 border border-border/50"
            >
              <h3 className="font-semibold mb-4">Other Program Categories</h3>
              <div className="space-y-3">
                {relatedPrograms.map((related) => {
                  const RelatedIcon = getIconComponent(related.icon);
                  return (
                    <Link
                      key={related.id}
                      to={`/programs/${related.slug}`}
                      className="block p-3 rounded-lg bg-card border border-border hover:border-primary transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                          style={{ backgroundColor: related.color + '20', color: related.color }}
                        >
                          <RelatedIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link
                to="/programs"
                className="block mt-4 text-center text-sm text-primary hover:underline"
              >
                View All Programs →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-xl p-6 border border-border/50"
            >
              <h3 className="font-semibold mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Programs</p>
                  <p className="text-2xl font-bold" style={{ color: programCategory.color }}>
                    {programCategory.programs.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Core Programs</p>
                  <p className="text-2xl font-bold text-primary">
                    {programCategory.programs.filter(p => p.tier === 'Core').length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Category</p>
                  <p className="text-sm font-medium">{programCategory.title}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
