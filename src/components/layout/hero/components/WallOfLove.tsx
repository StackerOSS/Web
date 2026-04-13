"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent } from "#/components/ui/card";
import { cn } from "#/lib/utils";
import { AiFillStar } from "react-icons/ai";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
  handle: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    role: "Product Designer @ Linear",
    handle: "@sarahj",
    content: "Qmi is everything I wanted Notion to be. The block-based editor is snappy, and having total control over my data is a game-changer.",
    avatarUrl: "https://HoIrqrkdgBmvpwuTwuWj.supabase.co/storage/v1/object/public/assets/assets/8e9d3b87-1b0a-4876-8575-52bfae17bb4c_800w.png",
  },
  {
    name: "David Chen",
    role: "Engineering Manager @ Vercel",
    handle: "@dchen_dev",
    content: "Self-hosting Qmi was a breeze. The performance is incredible compared to other tools in this space. Finally, a workspace that feels like it belongs in 2026.",
    avatarUrl: "https://HoIrqrkdgBmvpwuTwuWj.supabase.co/storage/v1/object/public/assets/assets/f7466370-2832-4fdd-84c2-0932bb0dd850_800w.png",
  },
  {
    name: "Elena Rodriguez",
    role: "Founding Engineer @ Supabase",
    handle: "@elena_rodriguez",
    content: "The knowledge graph feature completely changed how I organize my research. It's so intuitive. Plus, it's open source - what more could you ask for?",
    avatarUrl: "https://HoIrqrkdgBmvpwuTwuWj.supabase.co/storage/v1/object/public/assets/assets/0a9a71ec-268b-4689-a510-56f57e9d4f13_1600w.png",
  },
  {
    name: "Alex Rivera",
    role: "Fullstack Developer",
    handle: "@arivera",
    content: "I've tried every note-taking app out there. Qmi is the first one that doesn't feel like it's fighting my workflow. Snappy, beautiful, and private.",
    avatarUrl: "https://HoIrqrkdgBmvpwuTwuWj.supabase.co/storage/v1/object/public/assets/assets/a9ed4369-748a-49f8-9995-55d6c876bbff_1600w.png",
  },
  {
    name: "Jessica Wu",
    role: "Technical Writer @ Stripe",
    handle: "@jessw",
    content: "Clean, fast, and powerful. The markdown support is the best I've ever seen in a block editor. Highly recommended for any serious documentation.",
    avatarUrl: "https://HoIrqrkdgBmvpwuTwuWj.supabase.co/storage/v1/object/public/assets/assets/0d8966a4-8525-4e11-9d5d-2d7390b2c798_1600w.png",
  },
  {
    name: "Marcus Thorne",
    role: "CEO @ TechFlow",
    handle: "@mthorne",
    content: "Transitioned our entire team to Qmi last month. No regrets. The real-time collaboration is flawless, and the local AI is a massive plus.",
    avatarUrl: "https://HoIrqrkdgBmvpwuTwuWj.supabase.co/storage/v1/object/public/assets/assets/2ed33c8b-b8b2-4176-967f-3d785fed07d8_1600w.png",
  },
];

// Tripling the list for better seamless scrolling
const SCROLL_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

const TestimonialCard = ({ testimonial, className }: { testimonial: Testimonial; className?: string }) => (
  <Card 
    className={cn(
      "group shrink-0 w-[320px] md:w-[420px] rounded-[32px] md:rounded-[48px] border-border bg-card backdrop-blur-sm",
      "hover:border-primary/40 hover:bg-card/95 transition-all duration-500",
      "hover:shadow-[0_20px_80px_-20px_rgba(var(--primary),0.15)] relative overflow-hidden h-full",
      className
    )}
  >
    <CardContent className="p-8 md:p-10 flex flex-col justify-between h-full relative z-10">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 md:h-12 md:w-12 border border-border/50 ring-4 ring-primary/5">
          <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
          <AvatarFallback className="font-bold bg-primary/10 text-primary">{testimonial.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm md:text-base font-bold text-foreground tracking-tight truncate">
            {testimonial.name}
          </h4>
          <p className="text-[10px] md:text-xs text-muted-foreground/60 truncate font-semibold uppercase tracking-wider">
            {testimonial.role}
          </p>
        </div>
      </div>
      
      <p className="text-base md:text-[17px] leading-relaxed text-muted-foreground/90 font-sans mt-6 md:mt-8 group-hover:text-foreground transition-colors duration-500">
        "{testimonial.content}"
      </p>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-0.5 text-primary">
          {[...Array(5)].map((_, i) => (
            <AiFillStar key={i} className="h-4 w-4 fill-current drop-shadow-sm" />
          ))}
        </div>
        <span className="text-[9px] md:text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">{testimonial.handle}</span>
      </div>
    </CardContent>
    {/* Subtle texture overlay */}
    <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
  </Card>
);

export default function WallOfLove() {

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-background" aria-label="Wall of Love">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 text-primary font-bold tracking-[0.2em] uppercase text-[9px]">
            The standard for teams
          </Badge>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight text-foreground mb-8">
            The <span className="italic font-light">Wall of Love</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-sans leading-relaxed">
            Join thousands of developers and designers who have redefined their 
            creative workflow with our open platform.
          </p>
        </motion.div>
      </div>

      <div 
        className="flex flex-col gap-6 md:gap-8 group"
      >
        {/* Row 1: Right to Left */}
        <div className="relative flex overflow-hidden group/row">
          <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />

          <div
            className="flex gap-6 md:gap-8 py-4 pr-6 md:pr-8 shrink-0 animate-marquee group-hover:pause"
          >
            {SCROLL_TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard 
                key={`${testimonial.handle}-row1-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>

        {/* Row 2: Left to Right */}
        <div className="relative flex overflow-hidden group/row">
          <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />
          
          <div
            className="flex gap-6 md:gap-8 py-4 pr-6 md:pr-8 shrink-0 animate-marquee-reverse group-hover:pause"
            style={{ animationDuration: '60s' }}
          >
            {SCROLL_TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard 
                key={`${testimonial.handle}-row2-${index}`}
                testimonial={testimonial}
                className="opacity-90"
              />
            ))}
          </div>
        </div>

        {/* Row 3: Right to Left (Faster) */}
        <div className="relative flex overflow-hidden group/row hidden md:flex">
          <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-background via-background/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-background via-background/80 to-transparent z-20 pointer-events-none" />
          
          <div
            className="flex gap-6 md:gap-8 py-4 pr-6 md:pr-8 shrink-0 animate-marquee group-hover:pause"
            style={{ animationDuration: '35s' }}
          >
            {[...SCROLL_TESTIMONIALS].reverse().map((testimonial, index) => (
              <TestimonialCard 
                key={`${testimonial.handle}-row3-${index}`}
                testimonial={testimonial}
                className="opacity-80"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats / Final CTA subtext */}
      <div className="max-w-7xl mx-auto px-6 mt-20 text-center relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/30">
          Powered by real people building real tools
        </p>
      </div>
    </section>
  );
}
