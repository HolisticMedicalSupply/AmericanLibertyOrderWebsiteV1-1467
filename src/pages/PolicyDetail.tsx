import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  Moon,
  Sun,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/Breadcrumb";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import policyData from "../../policy-data.json";

interface SubPolicy {
  title: string;
  viability: string;
  problem: string[];
  positions: string[];
  framing: string;
}

interface Policy {
  id: string;
  title: string;
  slug: string;
  icon: string;
  color: string;
  shortDescription: string;
  overview: string;
  subPolicies: SubPolicy[];
}

export default function PolicyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [email, setEmail] = useState("");

  const policy = policyData.policies.find((p: Policy) => p.slug === slug);

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Policy Not Found</h1>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

  const relatedPolicies = policyData.policies
    .filter((p: Policy) => p.id !== policy.id)
    .slice(0, 3);

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const getViabilityColor = (viability: string) => {
    if (viability.includes("high")) return "text-green-600 bg-green-500/10 border-green-500/20";
    if (viability.includes("moderate") || viability.includes("mod")) return "text-yellow-600 bg-yellow-500/10 border-yellow-500/20";
    return "text-blue-600 bg-blue-500/10 border-blue-500/20";
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: policy.title,
        text: policy.shortDescription,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks for subscribing! We'll send updates about ${policy.title} to ${email}`);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="American Liberty Order" className="h-10 w-10" />
              <span className="text-lg font-bold text-foreground hidden sm:inline">American Liberty Order</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button onClick={() => navigate("/")} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <Breadcrumb items={[{ label: "Policies", href: "/#policies" }, { label: policy.title }]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl p-8 md:p-12 mb-12"
            style={{ 
              background: `linear-gradient(135deg, ${policy.color}15 0%, ${policy.color}05 100%)`,
              border: `1px solid ${policy.color}30`
            }}
          >
            <div className="flex items-start gap-6">
              <div 
                className="text-6xl w-20 h-20 flex items-center justify-center rounded-2xl"
                style={{ background: `${policy.color}20` }}
              >
                {policy.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{policy.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{policy.shortDescription}</p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleShare} variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-relaxed">{policy.overview}</p>
                  </CardContent>
                </Card>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6">Policy Positions</h2>
                <div className="space-y-4">
                  {policy.subPolicies.map((subPolicy: SubPolicy, index: number) => (
                    <Card 
                      key={index} 
                      className="glass overflow-hidden cursor-pointer transition-all hover:shadow-lg"
                      onClick={() => toggleCard(index)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl">{subPolicy.title}</CardTitle>
                            <Badge 
                              variant="outline" 
                              className={`mt-2 ${getViabilityColor(subPolicy.viability)}`}
                            >
                              {subPolicy.viability.toUpperCase()} VIABILITY
                            </Badge>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedCards.has(index) ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                          </motion.div>
                        </div>
                      </CardHeader>
                      
                      {expandedCards.has(index) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardContent className="space-y-6 border-t border-border/50 pt-6">
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                <h4 className="font-bold text-lg">The Problem</h4>
                              </div>
                              <ul className="space-y-2">
                                {subPolicy.problem.map((item: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-red-500 mt-1">•</span>
                                    <span className="text-muted-foreground">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <h4 className="font-bold text-lg">Our Positions</h4>
                              </div>
                              <ul className="space-y-2">
                                {subPolicy.positions.map((item: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-muted/30 rounded-lg p-4 border-l-4" style={{ borderColor: policy.color }}>
                              <h4 className="font-bold mb-2">How We Frame It</h4>
                              <p className="text-muted-foreground italic">{subPolicy.framing}</p>
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </Card>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="glass" style={{ borderTop: `4px solid ${policy.color}` }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Get Updates on {policy.title}
                    </CardTitle>
                    <CardDescription>
                      Subscribe to receive news and action items related to this policy area
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleEmailSignup} className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <Button type="submit">Subscribe</Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.section>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="glass sticky top-24">
                  <CardHeader>
                    <CardTitle>Get Involved</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" style={{ backgroundColor: policy.color }}>
                      Support This Policy
                    </Button>
                    <Button variant="outline" className="w-full">
                      Contact Your Rep
                    </Button>
                    <Button variant="outline" className="w-full">
                      Join Local Chapter
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Related Policies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {relatedPolicies.map((related: Policy) => (
                      <Link
                        key={related.id}
                        to={`/policies/${related.slug}`}
                        className="block p-3 rounded-lg hover:bg-muted/50 transition-colors border border-border/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{related.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm line-clamp-1">{related.title}</div>
                            <div className="text-xs text-muted-foreground line-clamp-2">{related.shortDescription}</div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Take Action</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Join as a Member</div>
                        <div className="text-muted-foreground text-xs">Access exclusive resources and support</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Volunteer</div>
                        <div className="text-muted-foreground text-xs">Help advance this policy in your area</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium mb-1">Donate</div>
                        <div className="text-muted-foreground text-xs">Support policy research and advocacy</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
