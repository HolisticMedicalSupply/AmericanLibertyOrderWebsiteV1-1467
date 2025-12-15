import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import policyData from '@/data/policy-data.json';
import { getIconComponent } from '@/lib/icon-mapper';
import Navigation from '@/components/Navigation';

export default function PoliciesOverview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'default' | 'az'>('default');

  const filteredPolicies = useMemo(() => {
    let filtered = policyData.policies;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (policy) =>
          policy.title.toLowerCase().includes(query) ||
          policy.description.toLowerCase().includes(query) ||
          policy.subPolicies.some(
            (sub) =>
              sub.title.toLowerCase().includes(query) ||
              sub.problem.some(p => p.toLowerCase().includes(query)) ||
              sub.positions.some(p => p.toLowerCase().includes(query))
          )
      );
    }

    if (sortOrder === 'az') {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [searchQuery, sortOrder]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Our Policy Platform</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive policy positions designed to restore liberty, accountability, and citizen sovereignty.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search policies..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none"
            />
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'default' | 'az')}
            className="px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none"
          >
            <option value="default">Default Order</option>
            <option value="az">A-Z</option>
          </select>
        </motion.div>

        {filteredPolicies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-muted-foreground">
              No policies found matching "{searchQuery}"
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
              Showing {filteredPolicies.length} of {policyData.policies.length} policies
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPolicies.map((policy, index) => {
                const PolicyIcon = getIconComponent(policy.icon);
                return (
                  <motion.div
                    key={policy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={`/policies/${policy.slug}`}
                      className="group block h-full cursor-pointer"
                    >
                      <div
                        className="glass-effect rounded-xl p-6 border border-border/50 hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                        style={{
                          borderColor: policy.color + '30',
                        }}
                      >
                        <div
                          className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-xl"
                          style={{
                            backgroundColor: policy.color + '20',
                            color: policy.color,
                          }}
                        >
                          <PolicyIcon className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {policy.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 flex-1">
                          {policy.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm text-muted-foreground">
                          {policy.subPolicies.length} sub-{policy.subPolicies.length === 1 ? 'policy' : 'policies'}
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
          <h2 className="text-2xl font-bold mb-4 gradient-text">Ready to Take Action?</h2>
          <p className="text-muted-foreground mb-6">
            Join us in fighting for these policies and restoring liberty across America.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/sign-up"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
            >
              Become a Member
            </Link>
            <Link
              to="/programs"
              className="px-6 py-3 rounded-lg bg-card border border-border hover:border-primary transition-colors font-semibold"
            >
              View Our Programs
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
