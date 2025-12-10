import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, 
  Moon, 
  Sun, 
  ArrowRight,
  Heart,
  HandHeart,
  GraduationCap,
  Radio,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/Breadcrumb";
import { useTheme } from "@/hooks/use-theme";
import { useState, useMemo } from "react";
import programsData from "../../programs-data.json";

export default function ProgramsOverview() {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  const iconMap: Record<string, any> = {
    "member-support": Heart,
    "community-service": HandHeart,
    "youth-programs": GraduationCap,
    "media-influence": Radio,
  };

  const filteredPrograms = useMemo(() => {
    let filtered = programsData.programs.map((program: any) => ({
      ...program,
      icon: iconMap[program.slug] || Target,
    }));

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((program: any) =>
        program.title.toLowerCase().includes(query) ||
        program.shortDescription.toLowerCase().includes(query) ||
        program.overview.toLowerCase().includes(query) ||
        program.programs.some((p: any) => 
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
        )
      );
    }

    return filtered;
  }, [searchQuery]);

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
          <Breadcrumb items={[{ label: "Programs" }]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">Our Programs</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Comprehensive support systems and engagement opportunities for members to grow, serve, and make an impact
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </motion.div>

          {searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <p className="text-muted-foreground">
                Found {filteredPrograms.length} {filteredPrograms.length === 1 ? 'program category' : 'program categories'}
              </p>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {filteredPrograms.map((program: any, index: number) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={`/programs/${program.slug}`}>
                  <Card 
                    className="glass h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                    style={{ borderTop: `4px solid ${program.color}` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div 
                          className="text-5xl w-16 h-16 flex items-center justify-center rounded-xl"
                          style={{ background: `${program.color}20` }}
                        >
                          {program.icon && <program.icon className="h-8 w-8" style={{ color: program.color }} />}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {program.programs?.length || 0} programs
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {program.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 text-base">{program.shortDescription}</CardDescription>
                      <div className="space-y-2 mb-4">
                        {program.programs?.slice(0, 3).map((item: any, i: number) => (
                          <div key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: program.color }} />
                            {item.name}
                          </div>
                        ))}
                        {program.programs?.length > 3 && (
                          <div className="text-sm text-muted-foreground italic">
                            + {program.programs.length - 3} more programs
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore programs <ArrowRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-muted-foreground mb-4">No programs found matching your search</p>
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
