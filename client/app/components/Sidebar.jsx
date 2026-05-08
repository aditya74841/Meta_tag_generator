"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import {
  Menu,
  X,
  Code,
  Globe,
  Share2,
  Twitter,
  Facebook,
  Building,
  FileText,
  User,
  Calendar,
  Briefcase,
  Store,
  Utensils,
  Video,
  Monitor,
  Book,
  Music,
  Tv,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import AdBanner from "./AdBanner";

const navigationData = [
  {
    id: "metatags",
    title: "Meta Tags",
    icon: Code,
    href: "/metatags",
  },
  {
    id: "structured",
    title: "Structured Data",
    icon: Globe,
    children: [
      { title: "Article", href: "/structuredtags/article", icon: FileText },
      { title: "Breadcrumb", href: "/structuredtags/breadcrumb", icon: Code },
      { title: "Event", href: "/structuredtags/event", icon: Calendar },
      { title: "FAQ", href: "/structuredtags/faq", icon: Code },
      { title: "How-to", href: "/structuredtags/how-to", icon: Code },
      { title: "Job Posting", href: "/structuredtags/job-posting", icon: Briefcase },
      { title: "Local Business", href: "/structuredtags/localbusiness", icon: Store },
      { title: "Organization", href: "/structuredtags/organization", icon: Building },
      { title: "Person", href: "/structuredtags/person", icon: User },
      { title: "Product", href: "/structuredtags/product", icon: Code },
      { title: "Recipe", href: "/structuredtags/receipe", icon: Utensils },
      { title: "Video", href: "/structuredtags/video", icon: Video },
      { title: "Website", href: "/structuredtags/website", icon: Monitor },
    ],
  },
  {
    id: "opengraph",
    title: "Open Graph",
    icon: Facebook,
    children: [
      { title: "Article", href: "/opengraph/article", icon: FileText },
      { title: "Book", href: "/opengraph/book", icon: Book },
      { title: "Business", href: "/opengraph/business", icon: Building },
      { title: "Music Album", href: "/opengraph/musicalbum", icon: Music },
      { title: "Music Playlist", href: "/opengraph/musicplaylist", icon: Music },
      { title: "Music Station", href: "/opengraph/musicradiostation", icon: Music },
      { title: "Music Song", href: "/opengraph/musicsong", icon: Music },
      { title: "Product", href: "/opengraph/product", icon: LayoutDashboard },
      { title: "Profile", href: "/opengraph/profile", icon: User },
      { title: "Video", href: "/opengraph/video", icon: Video },
      { title: "Video Episode", href: "/opengraph/videoepisode", icon: Tv },
      { title: "Video Movie", href: "/opengraph/videomovie", icon: Video },
      { title: "TV Show", href: "/opengraph/videotvshow", icon: Tv },
      { title: "Website", href: "/opengraph/website", icon: Monitor },
    ],
  },
  {
    id: "twitter",
    title: "Twitter Cards",
    icon: Twitter,
    children: [
      { title: "App", href: "/twittercard/app", icon: LayoutDashboard },
      { title: "Player", href: "/twittercard/player", icon: Video },
      { title: "Summary", href: "/twittercard/summary", icon: FileText },
      { title: "Large Image", href: "/twittercard/summarylargeimage", icon: FileText },
    ],
  },
];

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleSection = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      
      {/* Mobile Top Navbar */}
      <div className="lg:hidden fixed top-0 w-full h-16 bg-slate-950 border-b border-slate-800 z-50 flex items-center px-4 justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <div className="bg-blue-600 p-1.5 rounded-md">
            <Code className="h-5 w-5 text-white" />
          </div>
          MetaForge
        </Link>
        <button type="button" onClick={toggleSidebar} className="p-2 text-slate-400 hover:bg-slate-800 rounded-md">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-16 hidden lg:flex items-center px-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:opacity-80 transition-opacity">
            <div className="bg-blue-600 p-1.5 rounded-md">
              <Code className="h-5 w-5 text-white" />
            </div>
            MetaForge
          </Link>
        </div>

        <div className="h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
          <nav className="space-y-1">
            {navigationData.map((item) => {
              const Icon = item.icon;
              const hasChildren = !!item.children;
              const isActive = pathname === item.href;
              const isSectionExpanded = expanded[item.id];

              return (
                <div key={item.id} className="mb-2">
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() => toggleSection(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isSectionExpanded ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-900 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        {item.title}
                      </div>
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform", isSectionExpanded ? "rotate-180" : "")}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive ? "bg-blue-600/10 text-blue-400" : "text-slate-400 hover:bg-slate-900 hover:text-white"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  )}

                  {hasChildren && isSectionExpanded && (
                    <div className="mt-1 ml-4 pl-4 border-l border-slate-800 space-y-1">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors font-medium",
                              isChildActive
                                ? "text-blue-400 bg-blue-600/10"
                                : "text-slate-500 hover:text-white hover:bg-slate-900"
                            )}
                          >
                            <ChildIcon className="h-4 w-4" />
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 pt-16 lg:pt-0 min-h-screen transition-all duration-300 relative">
        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-slate-950/80 z-30 lg:hidden" 
            onClick={() => setIsOpen(false)}
          />
        )}
        <div className="p-0 sm:p-0 lg:p-0">
          {children}
        </div>
      </main>
    </div>
  );
}
