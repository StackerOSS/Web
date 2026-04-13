"use client";

import { motion } from "framer-motion";
import { TbRefresh, TbHome, TbMoodSad } from "react-icons/tb";
import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-destructive/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center space-y-8 max-w-2xl"
      >
        <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-[32px] bg-destructive/10 border border-destructive/20 flex items-center justify-center backdrop-blur-md mb-6">
                <TbMoodSad className="w-12 h-12 text-destructive animate-bounce" />
            </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground">
            Something <span className="italic text-destructive">snapped.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto font-sans leading-relaxed">
            We ran into an unexpected error. Don't worry, even the best systems have bad days.
          </p>
        </div>

        {error.message && (
          <div className="p-4 rounded-2xl bg-muted/30 border border-border/50 max-w-lg mx-auto overflow-hidden">
            <code className="text-sm text-muted-foreground font-mono break-all opacity-70">
              {error.message}
            </code>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            onClick={() => reset()}
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-semibold h-14 px-8 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            <TbRefresh className="mr-2 h-5 w-5" />
            Try Again
          </Button>
          
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="rounded-full font-sans font-semibold h-14 px-8 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
          >
            <Link to="/">
              <TbHome className="mr-2 h-5 w-5" />
              Go Home
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
