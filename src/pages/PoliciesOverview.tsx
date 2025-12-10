import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Moon, 
  Sun, 
  ArrowRight,
  DollarSign,
  Apple,
  Home as HomeIcon,
  Scale,
  Vote,
  ScrollText,
  Globe,
  Bitcoin,
  Receipt,
  Pill,
  Building2,
  BookOpen,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/Breadcrumb";
import { useTheme } from "@/hooks/use-theme";
import { useState, useMemo } from "react";
import policyData from "../../policy-data.json";

export default function PoliciesOverview() {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "viability">("title");

  const iconMap: Record<string, any> = {
    "economic-freedom": DollarSign,
    "food-health-sovereignty": Apple,
    "property-rights": HomeIcon,
    "government-accountability": Scale,
    "election-integrity": Vote,
    "constitutional-rights": ScrollText,
    "technology-communications": Globe,
    "monetary-reform": Bitcoin,
    "political-reform": Receipt,
    "foreign-policy": Globe,
    "healthcare-reform": Pill,
    "education-reform": BookOpen,
    "social-security": Building2,
  };

  const filteredPolicies = useMemo(() => {
    let filtered = policyData.policies.map((policy: any) => ({
      ...policy,
      icon: iconMap[policy.slug] || Target,
    }));

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((policy: any) =>
        policy.title.toLowerCase().includes(query) ||
        policy.shortDescription.toLowerCase().includes(query) ||
        policy.overview.toLowerCase().includes(query)
      );
    }

    if (sortBy === "title") {
      filtered.sort((a: any, b: any) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [searchQuery, sortBy]);

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
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <Breadcrumb items={[{ label: "Policies" }]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">Policy Platform</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Comprehensive, principle-driven policy reforms to restore American liberty and constitutional governance
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 flex flex-col sm:flex-row gap-4"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search policies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={sortBy === "title" ? "default" : "outline"}
                onClick={() => setSortBy("title")}
              >
                <Filter className="h-4 w-4 mr-2" />
                A-Z
              </Button>
            </div>
          </motion.div>

          {searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <p className="text-muted-foreground">
                Found {filteredPolicies.length} {filteredPolicies.length === 1 ? 'policy' : 'policies'}
              </p>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolicies.map((policy: any, index: number) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/policies/${policy.slug}`}>
                  <Card 
                    className="glass h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                    style={{ borderTop: `4px solid ${policy.color}` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div 
                          className="text-4xl w-14 h-14 flex items-center justify-center rounded-xl"
                          style={{ background: `${policy.color}20` }}
                        >
                          {policy.icon && <policy.icon className="h-7 w-7" style={{ color: policy.color }} />}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {policy.subPolicies?.length || 0} items
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {policy.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{policy.shortDescription}</CardDescription>
                      <div className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        View details <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPolicies.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-muted-foreground mb-4">No policies found matching your search</p>
              <Button onClick={() => setSearchQuery("")} variant="outline">
                Clear search
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
