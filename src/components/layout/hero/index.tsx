"use client";

import React from "react";
import {
  AiOutlineArrowRight,
  AiOutlineGithub,
} from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Features from "./components/Features";
import FAQ from "./components/FAQ";

interface ResponsiveHeroBannerProps {
  logoUrl?: string;
  backgroundImageUrl?: string;
  navLinks?: any[];
  ctaButtonText?: string;
  ctaButtonHref?: string;
  badgeLabel?: string;
  badgeText?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  backgroundImageUrl = "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0e2dbea0-c0a9-413f-a57b-af279633c0df_3840w.jpg",
  badgeLabel = "Developer Tool",
  badgeText = "Open source full-stack builder",
  title = "Build your stack.",
  titleLine2 = "Instantly.",
  description =
    "Configure your entire full-stack project visually. Pick your framework, UI library, auth layer, ORM, API, and theme. See live code preview. Copy the template ID. Build locally with one CLI command.",
  primaryButtonText = "Start Building",
  primaryButtonHref = "/create",
  secondaryButtonText = "View on GitHub",
  secondaryButtonHref = "https://github.com/stackeross/Web",
}) => {
  return (
    <TooltipProvider delayDuration={200}>
      <section className="w-full isolate min-h-screen overflow-hidden relative bg-background">
        {/* Background Image / GIF */}
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundImageUrl} 
            alt="" 
            className="w-full h-full object-cover opacity-60 dark:opacity-40 select-none pointer-events-none transition-opacity duration-1000"
          />
        </div>

        {/* ── Hero Content ───────────────────────────────────────────────── */}
        <div className="z-10 relative">
          <div className="pt-40 sm:pt-48 md:pt-56 lg:pt-60 max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pb-32 flex flex-col items-center justify-center text-center gap-4">
            <div className="mx-auto max-w-3xl text-center">

              {/* Badge */}
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full bg-muted/50 px-2.5 py-1.5 ring-1 ring-border backdrop-blur-sm animate-fade-slide-in-1">
                <Badge
                  variant="secondary"
                  className="rounded-full bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-0.5 font-sans"
                >
                  {badgeLabel}
                </Badge>
                <span className="text-sm font-medium text-muted-foreground font-sans pr-1">
                  {badgeText}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif font-normal tracking-tight animate-fade-slide-in-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-center">
                <span className="block text-foreground">{title}</span>
                <span className="block bg-linear-to-r from-foreground via-foreground/80 to-primary bg-clip-text text-transparent mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  {titleLine2}
                </span>
              </h1>

              {/* Description */}
              <p className="animate-fade-slide-in-3 text-lg sm:text-xl text-muted-foreground max-w-2xl mt-8 mx-auto leading-relaxed font-sans">
                {description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-12 items-center justify-center animate-fade-slide-in-4">
                {/* Primary */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      size="lg"
                      className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105"
                    >
                      <a href={primaryButtonHref}>
                        {primaryButtonText}
                        <AiOutlineArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Free forever — no credit card needed</p>
                  </TooltipContent>
                </Tooltip>

                {/* Secondary — GitHub */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="rounded-full transition-all hover:scale-105"
                    >
                      <a
                        href={secondaryButtonHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <AiOutlineGithub className="h-5 w-5" />
                        {secondaryButtonText}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Open source</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Social proof micro-copy */}
              <p className="mt-6 text-xs text-muted-foreground/60 font-sans animate-fade-slide-in-4">
                React · Next.js · tRPC · Tailwind · shadcn/ui · Open source
              </p>
            </div>

          </div>
        </div>
      </section>
      <Features />
      <FAQ />
    </TooltipProvider>
  );
};

export default ResponsiveHeroBanner;