import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import programsData from '@/data/programs-data.json';
import { getIconComponent } from '@/lib/icon-mapper';
import Navigation from '@/components/Navigation';

export default function ProgramsOverview() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = useMemo(() => {
    let filtered = programsData.programs;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (program) =>
          program.title.toLowerCase().includes(query) ||
          program.description.toLowerCase().includes(query) ||
          program.programs.some(
            (p) =>
              p.title.toLowerCase().includes(query) ||
              p.description.toLowerCase().includes(query) ||
              p.activities.some(a => a.toLowerCase().includes(query))
          )
      );
    }

    return filtered;
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Our Programs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive programs to empower members, build community, and advance the cause of liberty.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programs..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none"
            />
          </div>
        </motion.div>

        {filteredPrograms.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-muted-foreground">
              No programs found matching "{searchQuery}"
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-muted-foreground"
            >
              Showing {filteredPrograms.length} of {programsData.programs.length} program categories
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPrograms.map((programCategory, index) => {
                const ProgramIcon = getIconComponent(programCategory.icon);
                return (
                  <motion.div
                    key={programCategory.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={`/programs/${programCategory.slug}`}
                      className="group block h-full"
                    >
                      <div
                        className="glass-effect rounded-xl p-6 border border-border/50 hover:border-primary transition-all h-full flex flex-col"
                        style={{
                          borderColor: programCategory.color + '30',
                        }}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                            style={{
                              backgroundColor: programCategory.color + '20',
                              color: programCategory.color,
                            }}
                          >
                            <ProgramIcon className="h-7 w-7" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                              {programCategory.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-3">
                              {programCategory.description}
                            </p>
                          </div>
                        </div>

                      <div className="space-y-2 mb-4 flex-1">
                        <h4 className="text-sm font-semibold text-muted-foreground">Programs:</h4>
                        <ul className="space-y-1">
                          {programCategory.programs.slice(0, 4).map((program, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              <span className="line-clamp-1">{program.title}</span>
                            </li>
                          ))}
                          {programCategory.programs.length > 4 && (
                            <li className="text-sm text-muted-foreground italic">
                              + {programCategory.programs.length - 4} more programs
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm text-muted-foreground">
                          {programCategory.programs.length} program{programCategory.programs.length === 1 ? '' : 's'}
                        </span>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
                );
              })}
            </div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass-effect rounded-xl p-8 border border-border/50 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Get Involved Today</h2>
          <p className="text-muted-foreground mb-6">
            Join the American Liberty Order and gain access to all our programs and resources.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
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
    </div>
  );
}
