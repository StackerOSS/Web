"use client";

import { motion } from "framer-motion";
import { 
  TbEdit, 
  TbUsers, 
  TbShieldLock, 
  TbPalette, 
  TbCloudComputing, 
  TbDeviceAnalytics 
} from "react-icons/tb";
import { 
  Card, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";

const FEATURES = [
  {
    title: "Block-Based Editor",
    description: "A familiar, intuitive way to build pages. Drag, drop, and nest content exactly how you want it.",
    icon: TbEdit,
    badge: "Most Popular",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Real-time Sync",
    description: "Work together with your team in perfect sync. See changes as they happen, instantly.",
    icon: TbUsers,
    badge: "Pro",
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    title: "Privacy First",
    description: "End-to-end encryption and self-hosting options. Your data belongs to you, always.",
    icon: TbShieldLock,
    badge: "Secure",
    color: "bg-green-500/10 text-green-500"
  },
  {
    title: "Deep Customization",
    description: "Match your workspace to your brand. Custom themes, fonts, and layouts at your fingertips.",
    icon: TbPalette,
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    title: "Powerful Automations",
    description: "Connect your workflows with our robust API and internal triggers to save hours every day.",
    icon: TbDeviceAnalytics,
    color: "bg-indigo-500/10 text-indigo-500"
  },
  {
    title: "Multi-Cloud Deploy",
    description: "Export and deploy your workspace to any cloud provider with one click. No lock-in.",
    icon: TbCloudComputing,
    color: "bg-cyan-500/10 text-cyan-500"
  }
];

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary font-medium">
              Core Capabilities
            </Badge>
            <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-foreground mb-6">
              Everything you need to <br />
              <span className="italic">scale your productivity.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We've built Brotion with the best of modern technology to give you a 
              fast, secure, and beautiful workspace that's truly yours.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/40 bg-muted/20 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold tracking-tight">
                      {feature.title}
                    </CardTitle>
                    {feature.badge && (
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-bold h-5">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-muted-foreground pt-2 text-[15px] leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
}
