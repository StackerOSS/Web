"use client";

import * as React from "react";
import {
  AiOutlineHome,
  AiOutlineThunderbolt,
  AiOutlineBook,
  AiOutlineGithub,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { Button } from "#/components/ui/button";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "#/components/ui/tooltip";
import { TbExternalLink } from "react-icons/tb";

// ─── Navbar Component (Floating Pill style) ───────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
  tooltip?: string;
  icon: React.ReactNode;
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  {
    label: "Home",
    href: "/",
    isActive: true,
    tooltip: "Back to top",
    icon: <AiOutlineHome className="h-3.5 w-3.5" />,
  },
  {
    label: "Features",
    href: "/#features",
    tooltip: "See what Stacker can do",
    icon: <AiOutlineThunderbolt className="h-3.5 w-3.5" />,
  },
  {
    label: "Docs",
    href: "#docs",
    tooltip: "Read the documentation",
    icon: <AiOutlineBook className="h-3.5 w-3.5" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/stackeross/Web",
    tooltip: "Star us on GitHub ⭐",
    icon: <AiOutlineGithub className="h-3.5 w-3.5" />,
  },
];

export interface NavbarProps {
  navLinks?: NavLink[];
  ctaButtonText?: string;
  ctaButtonHref?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  navLinks = DEFAULT_NAV_LINKS,
  ctaButtonText = "Build Now",
  ctaButtonHref = "/create",
}) => {
  const isPending = false;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 px-6 ${
        scrolled ? "py-2" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/"
                aria-label="Stacker home"
                className="inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-transform active:scale-95"
              >
                <img
                  src="/logo.png"
                  alt="Stacker logo"
                  className="h-9 w-auto object-contain sm:h-9"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Stacker — Home</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-2"
          aria-label="Main navigation"
        >
          <div className={`
            flex items-center gap-0.5 rounded-full px-1 py-1 
            transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)
            ${scrolled 
              ? "border border-border/40 bg-background/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] scale-[0.98]" 
              : "border border-transparent"
            }
          `}>
            <TooltipProvider>
              {navLinks.map((link, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-current={link.isActive ? "page" : undefined}
                      className={`
                        group inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium font-sans
                        transition-all duration-300 relative overflow-hidden
                        ${
                          link.isActive
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                            : scrolled 
                              ? "text-foreground/70 hover:text-foreground hover:bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                        }
                      `}
                    >
                      {link.icon}
                      <span className="relative">
                        {link.label}
                      </span>
                      {link.href.startsWith("http") && (
                        <div className="w-0 group-hover:w-3 overflow-hidden transition-all duration-300 ease-out flex items-center">
                          <TbExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      )}
                    </a>
                  </TooltipTrigger>
                  {link.tooltip && (
                    <TooltipContent side="bottom">
                      <p>{link.tooltip}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </TooltipProvider>

            <div className={`h-4 w-px transition-colors duration-300 mx-1 ${scrolled ? "bg-border/40" : "bg-foreground/10"}`} />

            {/* Nav CTA / User Profile */}
            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      size="sm"
                      className={`group rounded-full font-sans font-semibold ml-1 gap-1.5 transition-all duration-300 ${
                        scrolled 
                          ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20" 
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      <a href={ctaButtonHref} className="flex items-center gap-1.5 pl-4 pr-3 py-2">
                        {ctaButtonText}
                        <AiOutlineArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Configure your stack visually</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle menu"
          className="md:hidden h-10 w-10 rounded-full bg-muted/20 ring-1 ring-border backdrop-blur text-foreground hover:bg-muted/30"
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 5h16M4 12h16M4 19h16"
              />
            </svg>
          )}
        </Button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 rounded-3xl bg-background/95 border border-border/50 shadow-[0_24px_48px_rgba(0,0,0,0.15)] p-3 flex flex-col gap-1.5 animate-fade-slide-in-1 backdrop-blur-xl">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`
                inline-flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-medium font-sans transition-all
                ${
                  link.isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }
              `}
            >
              <span className="opacity-70">{link.icon}</span>
              {link.label}
            </a>
          ))}
          <div className="h-px bg-border/40 my-1.5 mx-2" />
          
          {isPending ? (
            <div className="h-12 w-full rounded-2xl bg-muted/20 animate-pulse mt-1" />
          ) : (
            <Button
              asChild
              className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary/95 font-sans font-semibold w-full h-12 shadow-xl shadow-primary/10"
            >
              <a href={ctaButtonHref} className="gap-2">
                {ctaButtonText}
                <AiOutlineArrowRight className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
