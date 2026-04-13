"use client";

import { motion } from "framer-motion";
import { 
  TbEdit, 
  TbUsers, 
  TbShieldLock, 
  TbPalette, 
  TbDeviceAnalytics,
  TbBrain,
  TbDatabase,
  TbWriting,
  TbHistory,
  TbCpu,
  TbKey,
  TbDownload
} from "react-icons/tb";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardTitle 
} from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";

const FEATURES = [
  {
    title: "Pick your framework",
    description: "Choose between React, Next.js, TanStack Start, or Vite. Stacker handles the setup.",
    icon: TbEdit,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "UI library selection",
    description: "Find and configure shadcn/ui, Radix UI, or other components. Preview live.",
    icon: TbPalette,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Authentication flow",
    description: "Integrate Clerk, Auth0, Better Auth, or bring your own. One click setup.",
    icon: TbKey,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Database & ORM",
    description: "Configure Prisma, Drizzle, or raw SQL. Pick Postgres, MySQL, SQLite instantly.",
    icon: TbDatabase,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "API layer",
    description: "Choose tRPC, REST, or GraphQL. All wired up with type safety and validation.",
    icon: TbCpu,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Live code preview",
    description: "See every generated file with syntax highlighting before running a single command.",
    icon: TbEdit,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Template IDs",
    description: "Your stack config is encoded into a shareable ID. Save it, share it, re-scaffold anytime.",
    icon: TbHistory,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "One-command scaffold",
    description: "Run bunx stacker-cli [ID] and your full project is set up locally. No copy-pasting.",
    icon: TbDownload,
    badge: "CLI-powered",
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Styling & themes",
    description: "Tailor Tailwind config, tweakcn themes, fonts, colors, and border radius on the fly.",
    icon: TbPalette,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "TanStack add-ons",
    description: "Add Query, Router, Store, and other TanStack libraries with one toggle.",
    icon: TbUsers,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Animations & extras",
    description: "Choose Framer Motion, GSAP, and other dev tools. Pick your icon library too.",
    icon: TbBrain,
    badge: "Batteries included",
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Open source",
    description: "Fork it, modify it, self-host it. Full control over your stack builder.",
    icon: TbShieldLock,
    color: "bg-primary/10 text-primary"
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 md:py-32 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/20 text-primary font-medium tracking-[0.24em] uppercase text-[10px]">
              Full-Stack Configuration
            </Badge>
            <h2 className="text-3xl md:text-5xl font-serif font-normal tracking-tight text-foreground mb-6 font-sans">
              Everything you need to <br />
              <span className="italic">ship faster.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              Configure your entire stack visually. No CLI wrestling. No decision paralysis. Just pick what you need and scaffold.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <Card className="h-full min-h-65 border-border bg-card backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:shadow-lg shadow-sm group overflow-hidden">
                <CardContent className="h-full p-8 flex flex-col justify-between font-sans">
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
                        {feature.title}
                      </CardTitle>
                      {feature.badge && (
                        <Badge variant="secondary" className="text-[10px] uppercase tracking-widest font-bold h-6 py-1 px-3">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardDescription className="text-muted-foreground pt-4 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
}
