import { motion } from "framer-motion";
import { 
  ChevronDown, 
  Shield, 
  Users, 
  BookOpen,
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
  Heart,
  HandHeart,
  GraduationCap,
  Radio,
  UserPlus,
  HandshakeIcon,
  Gift,
  MapPin,
  Target,
  Eye,
  Sparkles,
  Flag,
  CheckCircle2,
  ArrowRight,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";

export default function Home() {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { theme, setTheme } = useTheme();

  const policies = [
    { icon: DollarSign, title: "Economic Freedom & Anti-Cronyism", description: "End corporate welfare, eliminate subsidies, and restore true free markets" },
    { icon: Apple, title: "Food & Health Sovereignty", description: "Empower individuals with health freedom and food production rights" },
    { icon: HomeIcon, title: "Property Rights", description: "Protect homeownership and land rights against government overreach" },
    { icon: Scale, title: "Government Accountability", description: "Demand transparency and hold officials accountable to the people" },
    { icon: Vote, title: "Election Integrity", description: "Secure transparent, verifiable election systems at all levels" },
    { icon: ScrollText, title: "Constitutional Rights", description: "Defend all constitutional amendments without exception" },
    { icon: Globe, title: "Foreign Policy", description: "Prioritize sovereignty and non-interventionism" },
    { icon: Bitcoin, title: "Monetary Reform", description: "Support sound money principles and end monetary manipulation" },
    { icon: Receipt, title: "Tax Reform", description: "Simplify taxation and reduce burden on working families" },
    { icon: Pill, title: "Drug Policy Reform", description: "End the drug war, support harm reduction and personal choice" },
    { icon: Building2, title: "Housing Reform", description: "Remove barriers to affordable housing and homeownership" },
  ];

  const principles = [
    { icon: ScrollText, title: "Constitutional Fidelity", description: "Uphold the letter and spirit of the Constitution" },
    { icon: Users, title: "Citizen Sovereignty", description: "Power belongs to the people, not bureaucrats" },
    { icon: Eye, title: "Transparent Governance", description: "Government should operate in the light of day" },
    { icon: Flag, title: "State-First Strategy", description: "Build power from local and state levels up" },
    { icon: BookOpen, title: "Education Before Advocacy", description: "Informed citizens drive lasting change" },
    { icon: Target, title: "Market-Based Solutions", description: "Free enterprise solves problems better than mandates" },
  ];

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="American Liberty Order" className="h-12 w-12" />
            <span className="text-xl font-bold text-foreground">American Liberty Order</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">About</a>
            <a href="#policies" className="text-foreground/80 hover:text-foreground transition-colors">Policies</a>
            <a href="#programs" className="text-foreground/80 hover:text-foreground transition-colors">Programs</a>
            <a href="#get-involved" className="text-foreground/80 hover:text-foreground transition-colors">Get Involved</a>
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

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/hero-bg.png)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img src="/logo.png" alt="ALO" className="h-32 w-32 mx-auto mb-8 animate-float" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            Defending Liberty Through Action
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto"
          >
            Empowering citizens to reclaim constitutional principles through practical reform, community action, and unwavering dedication to individual liberty
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="#get-involved">Join Us Today</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass" asChild>
              <a href="#about">Learn More</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <a href="#about">
              <ChevronDown className="h-8 w-8 text-foreground/60 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The American Liberty Order is a citizen-driven organization dedicated to defending constitutional principles, 
              limited government, and individual liberty through education, advocacy, and practical reform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Shield, title: "Defend Liberty", description: "Stand firm against government overreach and protect constitutional rights for all citizens" },
              { icon: Users, title: "Empower Citizens", description: "Equip Americans with knowledge, tools, and community to effect meaningful change" },
              { icon: Scale, title: "Reform Government", description: "Push for practical reforms that restore accountability and limit federal power" }
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <pillar.icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-2xl">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{pillar.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img src="/mission.png" alt="Mission" className="max-w-2xl w-full rounded-lg shadow-2xl" />
          </motion.div>
        </div>
      </section>

      <section id="policies" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Policy Platform</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive approach to restoring American liberty through practical, principle-driven policy reforms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer">
                  <CardHeader>
                    <policy.icon className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-lg">{policy.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{policy.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="programs" className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center"
          style={{ backgroundImage: "url(/programs-bg.png)" }}
        ></div>
        
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Programs</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Structured pathways for members to engage, grow, and make an impact
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="member-support" className="glass-card px-6 rounded-lg border-none">
                <AccordionTrigger className="text-xl font-semibold hover:text-primary">
                  <div className="flex items-center gap-3">
                    <Heart className="h-6 w-6 text-primary" />
                    Member Support Programs
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Legal Support Network:</strong> Connect with constitutional attorneys and legal resources
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Crisis Response Team:</strong> Rapid assistance for members facing rights violations
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Education Resources:</strong> Comprehensive library of constitutional law and civic knowledge
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="community-service" className="glass-card px-6 rounded-lg border-none">
                <AccordionTrigger className="text-xl font-semibold hover:text-primary">
                  <div className="flex items-center gap-3">
                    <HandHeart className="h-6 w-6 text-primary" />
                    Community Service & Outreach
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Local Chapter Network:</strong> Build community through regular meetups and events
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Voter Registration Drives:</strong> Increase civic participation in your community
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Town Hall Coordination:</strong> Organize and attend local government meetings
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="youth" className="glass-card px-6 rounded-lg border-none">
                <AccordionTrigger className="text-xl font-semibold hover:text-primary">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    Youth & Next Generation
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Student Leadership Program:</strong> Train the next generation of liberty advocates
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Campus Chapters:</strong> Establish presence in colleges and universities
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Mentorship Network:</strong> Connect young activists with experienced members
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="media" className="glass-card px-6 rounded-lg border-none">
                <AccordionTrigger className="text-xl font-semibold hover:text-primary">
                  <div className="flex items-center gap-3">
                    <Radio className="h-6 w-6 text-primary" />
                    Media & Public Influence
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Content Creation Hub:</strong> Produce educational content for social media
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Podcast Network:</strong> Share stories and insights with broader audiences
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5" />
                    <div>
                      <strong>Op-Ed Program:</strong> Get member voices published in local and national media
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      <section id="values" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Principles</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The foundational values that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <principle.icon className="h-10 w-10 text-primary mb-3" />
                    <CardTitle className="text-xl">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{principle.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="get-involved" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Involved</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join the movement and help defend liberty in your community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: UserPlus, title: "Become a Member", description: "Join our community and gain access to exclusive resources and programs" },
              { icon: HandshakeIcon, title: "Volunteer", description: "Contribute your time and skills to local chapters and initiatives" },
              { icon: Gift, title: "Donate", description: "Support our mission financially to expand our reach and impact" },
              { icon: MapPin, title: "Find a Chapter", description: "Connect with fellow members in your area and attend local events" }
            ].map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
                  <CardHeader>
                    <action.icon className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <CardTitle>{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{action.description}</CardDescription>
                    <Button variant="link" className="mt-4 p-0 group-hover:translate-x-2 transition-transform">
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Contact Us</CardTitle>
                <CardDescription className="text-center">
                  Have questions? We'd love to hear from you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <Input 
                      placeholder="Your Name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Your Email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Your Message" 
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <Button className="w-full" size="lg">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Sparkles className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-4">Stay Informed</h3>
              <p className="text-lg mb-8 text-primary-foreground/90">
                Subscribe to our newsletter for updates on events, policy initiatives, and ways to take action
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-primary-foreground text-foreground"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant="secondary" size="lg">Subscribe</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-card py-16 border-t">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="ALO" className="h-10 w-10" />
                <span className="font-bold text-lg">American Liberty Order</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Defending constitutional principles through citizen empowerment
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#policies" className="hover:text-foreground transition-colors">Policies</a></li>
                <li><a href="#programs" className="hover:text-foreground transition-colors">Programs</a></li>
                <li><a href="#get-involved" className="hover:text-foreground transition-colors">Get Involved</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documents</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Research</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Media</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Events</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#get-involved" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} American Liberty Order. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
