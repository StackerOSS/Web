"use client";

import { motion } from "framer-motion";
import { TbHome, TbArrowLeft, TbAlertTriangle } from "react-icons/tb";
import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-8 max-w-2xl"
      >
        {/* Animated 404 text with gradient */}
        <div className="relative inline-block">
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              delay: 0.2 
            }}
            className="text-[12rem] md:text-[16rem] font-serif font-black tracking-tighter leading-none select-none opacity-[0.05] dark:opacity-[0.1]"
          >
            404
          </motion.h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 backdrop-blur-sm rotate-12 animate-pulse">
                <TbAlertTriangle className="w-12 h-12 text-primary" />
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground">
            Lost in the <span className="italic">Stacker</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto font-sans leading-relaxed">
            The page you're looking for has drifted off track or simply doesn't exist. Let's get you back home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans font-semibold h-14 px-8 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            <Link to="/">
              <TbHome className="mr-2 h-5 w-5" />
              Back to Safety
            </Link>
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.history.back()}
            className="rounded-full font-sans font-semibold h-14 px-8 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
          >
            <TbArrowLeft className="mr-2 h-5 w-5" />
            Previous Page
          </Button>
        </div>
      </motion.div>

      {/* Floating particles or noise */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
