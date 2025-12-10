import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, Download, ChevronDown, ChevronUp, Mail } from 'lucide-react';
import policyData from '@/data/policy-data.json';
import { getIconComponent } from '@/lib/icon-mapper';
import Navigation from '@/components/Navigation';

const viabilityColors = {
  high: 'bg-green-500/20 text-green-400 border-green-500/30',
  'mod-high': 'bg-lime-500/20 text-lime-400 border-lime-500/30',
  moderate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'low-mod': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  low: 'bg-red-500/20 text-red-400 border-red-500/30',
  varies: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
};

const viabilityLabels = {
  high: 'High Viability',
  'mod-high': 'Moderate-High',
  moderate: 'Moderate',
  'low-mod': 'Low-Moderate',
  low: 'Low Viability',
  varies: 'Varies'
};

export default function PolicyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [expandedPolicies, setExpandedPolicies] = useState<Set<number>>(new Set());
  const [email, setEmail] = useState('');

  const policy = policyData.policies.find(p => p.slug === slug);

  if (!policy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Policy Not Found</h1>
          <Link to="/policies" className="text-primary hover:underline">
            Back to Policies
          </Link>
        </div>
      </div>
    );
  }

  const togglePolicy = (index: number) => {
    const newExpanded = new Set(expandedPolicies);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedPolicies(newExpanded);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: policy.title,
          text: policy.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to updates on ' + policy.title);
    setEmail('');
  };

  const relatedPolicies = policyData.policies
    .filter(p => p.id !== policy.id)
    .slice(0, 3);

  const PolicyIcon = getIconComponent(policy.icon);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="mb-8">
          <Link
            to="/policies"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to All Policies
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-xl p-8 border border-border/50"
              style={{ borderColor: policy.color + '40' }}
            >
              <div
                className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center text-2xl"
                style={{ backgroundColor: policy.color + '20', color: policy.color }}
              >
                <PolicyIcon className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold mb-4 gradient-text">{policy.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{policy.description}</p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleShare}
                  className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary transition-colors flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button className="px-4 py-2 rounded-lg bg-card border border-border hover:border-primary transition-colors flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            </motion.div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Policy Positions</h2>
              <div className="space-y-4">
                {policy.subPolicies.map((subPolicy, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-xl border border-border/50 overflow-hidden"
                  >
                    <button
                      onClick={() => togglePolicy(index)}
                      className="w-full p-6 text-left flex items-start justify-between hover:bg-card/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{subPolicy.title}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              viabilityColors[subPolicy.viability as keyof typeof viabilityColors]
                            }`}
                          >
                            {viabilityLabels[subPolicy.viability as keyof typeof viabilityLabels]}
                          </span>
                        </div>
                      </div>
                      {expandedPolicies.has(index) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>

                    {expandedPolicies.has(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 space-y-6"
                      >
                        <div>
                          <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                            The Problem
                          </h4>
                          <ul className="space-y-2">
                            {subPolicy.problem.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                <span className="text-red-400 mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                            Our Positions
                          </h4>
                          <ul className="space-y-2">
                            {subPolicy.positions.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                                <span className="text-green-400 mt-1">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-blue-400 mb-3">How We Frame It</h4>
                          <p className="text-muted-foreground italic border-l-2 border-blue-400 pl-4">
                            {subPolicy.framing}
                          </p>
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
              <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
              <p className="text-muted-foreground mb-6">
                Ready to make a difference? Join us in advocating for {policy.title.toLowerCase()}.
              </p>
              <div className="flex flex-wrap gap-3">
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
                  View Programs
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
              <h3 className="font-semibold mb-4">Subscribe for Updates</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get notified about policy developments and action opportunities.
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
              <h3 className="font-semibold mb-4">Related Policies</h3>
              <div className="space-y-3">
                {relatedPolicies.map((related) => {
                  const RelatedIcon = getIconComponent(related.icon);
                  return (
                    <Link
                      key={related.id}
                      to={`/policies/${related.slug}`}
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
                to="/policies"
                className="block mt-4 text-center text-sm text-primary hover:underline"
              >
                View All Policies →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-xl p-6 border border-border/50"
            >
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Sub-Policies</p>
                  <p className="text-2xl font-bold" style={{ color: policy.color }}>
                    {policy.subPolicies.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">High Viability</p>
                  <p className="text-2xl font-bold text-green-400">
                    {policy.subPolicies.filter(sp => sp.viability === 'high').length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Policy Area</p>
                  <p className="text-sm font-medium">{policy.title}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
