"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Book,
  Music,
  User,
  Video,
  Monitor,
  Tv,
  ShoppingCart,
  Smartphone,
  PlayCircle,
  ShieldCheck,
  Zap,
  Code,
  Layout,
  ArrowRight,
  TrendingUp,
  Share2,
  Star,
  Film,
  Radio,
  ListMusic,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AIUrlAnalyzer from "./components/AIUrlAnalyzer";

const openGraphGenerators = [
  {
    id: "article",
    title: "Article",
    description: "Blog posts, news articles, editorial content",
    icon: FileText,
    color: "blue",
    route: "/opengraph/article",
    tags: ["Blog", "News"],
    popular: true,
  },
  {
    id: "product",
    title: "Product",
    description: "E-commerce, product catalogs, shopping",
    icon: ShoppingCart,
    color: "orange",
    route: "/opengraph/product",
    tags: ["E-commerce", "Retail"],
    popular: true,
  },
  {
    id: "video",
    title: "Video",
    description: "General video content, tutorials, entertainment",
    icon: Video,
    color: "red",
    route: "/opengraph/video",
    tags: ["Media", "Tutorial"],
  },
  {
    id: "book",
    title: "Book",
    description: "Book promotion, literary content, publishing",
    icon: Book,
    color: "purple",
    route: "/opengraph/book",
    tags: ["Literature", "Edu"],
  },
  {
    id: "music-album",
    title: "Music Album",
    description: "Album promotion, music marketing",
    icon: Music,
    color: "green",
    route: "/opengraph/musicalbum",
    tags: ["Music", "Album"],
  },
  {
    id: "profile",
    title: "Profile",
    description: "Personal branding, professional profiles",
    icon: UserCircle,
    color: "amber",
    route: "/opengraph/profile",
    tags: ["Personal", "Brand"],
  },
];

const twitterCardGenerators = [
  {
    id: "app",
    title: "App Card",
    description: "Mobile app promotion, direct downloads",
    icon: Smartphone,
    route: "/twittercard/app",
    popular: true,
  },
  {
    id: "player",
    title: "Player Card",
    description: "Embedded media players, interactive content",
    icon: PlayCircle,
    route: "/twittercard/player",
  },
  {
    id: "summary",
    title: "Summary Card",
    description: "General content, articles, basic sharing",
    icon: FileText,
    route: "/twittercard/summary",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-blue-500/30">
      {/* Decorative Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto pt-20 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge
              variant="outline"
              className="px-4 py-1.5 border-blue-500/30 text-blue-400 bg-blue-500/5 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-3 duration-500"
            >
              <Zap className="w-3.5 h-3.5 mr-2 fill-current" />
              v2.0 is now live with AI Analysis
            </Badge>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent pb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
              MetaForge Pro Suite
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-1000">
              Generate pixel-perfect Open Graph and Twitter Card meta tags.
              Boost your click-through rates and social SEO in seconds.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <Button
                size="lg"
                className="h-12 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg shadow-blue-600/20"
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 border-slate-700 hover:bg-slate-800 rounded-full text-slate-300"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* AI Analyzer Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-3xl mx-auto">
            <div className="p-1 rounded-3xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20">
              <div className="bg-slate-950/90 backdrop-blur-xl rounded-[22px] p-6 border border-white/5">
                <AIUrlAnalyzer />
              </div>
            </div>
          </div>
        </section>

        {/* Open Graph Generators */}
        <section className="container mx-auto px-4 mb-24">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <Layout className="w-8 h-8 text-blue-500" />
                Open Graph Generators
              </h2>
              <p className="text-slate-400">
                Standardized meta tags for Facebook, LinkedIn, and more.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openGraphGenerators.map((gen) => (
              <Link href={gen.route} key={gen.id} className="group">
                <Card className="glass glass-hover h-full transition-all duration-300 border-white/5 hover:border-blue-500/30 overflow-hidden relative">
                  {gen.popular && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/10">
                        Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600/10 group-hover:border-blue-500/20 transition-all duration-300">
                      <gen.icon className="w-6 h-6 text-slate-300 group-hover:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl text-slate-100 group-hover:text-white transition-colors">
                      {gen.title}
                    </CardTitle>
                    <CardDescription className="text-slate-400 line-clamp-2">
                      {gen.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <div className="flex gap-2">
                      {gen.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider font-bold text-slate-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Twitter Cards Section */}
        <section className="container mx-auto px-4 mb-24">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                <Share2 className="w-8 h-8 text-sky-400" />
                Twitter Card Generators
              </h2>
              <p className="text-slate-400">
                Optimized snippets for the X (formerly Twitter) platform.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {twitterCardGenerators.map((gen) => (
              <Link href={gen.route} key={gen.id} className="group">
                <Card className="glass glass-hover h-full transition-all duration-300 border-white/5 hover:border-sky-500/30 overflow-hidden relative">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-sky-600/10 group-hover:border-sky-500/20 transition-all duration-300">
                      <gen.icon className="w-6 h-6 text-slate-300 group-hover:text-sky-400" />
                    </div>
                    <CardTitle className="text-xl text-slate-100 group-hover:text-white transition-colors">
                      {gen.title}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {gen.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <ArrowRight className="w-4 h-4 ml-auto text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-[2.5rem] bg-slate-900/50 border border-white/5 backdrop-blur-md">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-white tracking-tighter">
                17+
              </div>
              <div className="text-sm uppercase tracking-widest text-slate-500 font-bold">
                Generators
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-white tracking-tighter">
                99.9%
              </div>
              <div className="text-sm uppercase tracking-widest text-slate-500 font-bold">
                Accuracy
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-white tracking-tighter">
                30s
              </div>
              <div className="text-sm uppercase tracking-widest text-slate-500 font-bold">
                Avg. Time
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-white tracking-tighter">
                Free
              </div>
              <div className="text-sm uppercase tracking-widest text-slate-500 font-bold">
                Forever
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-4 pb-24">
          <div className="relative p-12 rounded-[3rem] overflow-hidden text-center bg-blue-600">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white">
                Ready to Optimize?
              </h2>
              <p className="text-blue-100 text-lg max-w-xl mx-auto">
                Join thousands of developers and marketers who use MetaForge to
                perfect their social media presence.
              </p>
              <div className="pt-6">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-14 px-10 rounded-full font-bold text-lg bg-white text-blue-600 hover:bg-slate-100"
                >
                  Get Started Now — It&apos;s Free
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
