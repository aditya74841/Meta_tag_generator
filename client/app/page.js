"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Paper,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import {
  // Open Graph Icons
  Article as ArticleIcon,
  Book as BookIcon,
  Album as MusicAlbumIcon,
  QueueMusic as PlaylistIcon,
  Radio as RadioIcon,
  MusicNote as SongIcon,
  ShoppingCart as ProductIcon,
  Person as ProfileIcon,
  VideoLibrary as VideoIcon,
  Tv as EpisodeIcon,
  Movie as MovieIcon,
  LiveTv as TvShowIcon,
  Language as WebsiteIcon,
  
  // Twitter Card Icons
  PhoneAndroid as AppIcon,
  PlayCircleOutline as PlayerIcon,
  Description as SummaryIcon,
  CropOriginal as LargeImageIcon,
  
  // Action Icons
  Launch as LaunchIcon,
  Star as StarIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  Share as ShareIcon,
  Analytics as AnalyticsIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { keyframes } from "@mui/system";
import AIUrlAnalyzer from "./components/AIUrlAnalyzer";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Home = () => {
  // Generator data structure
  const openGraphGenerators = [
    {
      id: "article",
      title: "Article",
      description: "Blog posts, news articles, editorial content",
      icon: ArticleIcon,
      color: "#1976d2",
      gradient: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
      route: "/opengraph/article",
      tags: ["Blog", "News", "Content"],
      popular: true
    },
    {
      id: "product",
      title: "Product",
      description: "E-commerce, product catalogs, shopping",
      icon: ProductIcon,
      color: "#ed6c02",
      gradient: "linear-gradient(135deg, #ed6c02 0%, #ff9800 100%)",
      route: "/opengraph/product",
      tags: ["E-commerce", "Shopping", "Retail"],
      popular: true
    },
    {
      id: "video",
      title: "Video",
      description: "General video content, tutorials, entertainment",
      icon: VideoIcon,
      color: "#d32f2f",
      gradient: "linear-gradient(135deg, #d32f2f 0%, #ef5350 100%)",
      route: "/opengraph/video",
      tags: ["Media", "Entertainment", "Tutorial"]
    },
    {
      id: "book",
      title: "Book",
      description: "Book promotion, literary content, publishing",
      icon: BookIcon,
      color: "#7b1fa2",
      gradient: "linear-gradient(135deg, #7b1fa2 0%, #ab47bc 100%)",
      route: "/opengraph/book",
      tags: ["Publishing", "Literature", "Education"]
    },
    {
      id: "music-album",
      title: "Music Album",
      description: "Album promotion, music marketing",
      icon: MusicAlbumIcon,
      color: "#388e3c",
      gradient: "linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)",
      route: "/opengraph/musicalbum",
      tags: ["Music", "Album", "Artist"]
    },
    {
      id: "music-playlist",
      title: "Music Playlist",
      description: "Curated music collections, streaming platforms",
      icon: PlaylistIcon,
      color: "#f57c00",
      gradient: "linear-gradient(135deg, #f57c00 0%, #ffa726 100%)",
      route: "/opengraph/musicplaylist",
      tags: ["Playlist", "Streaming", "Curation"]
    },
    {
      id: "music-radio",
      title: "Music Radio Station",
      description: "Radio stations, podcast networks, streaming radio",
      icon: RadioIcon,
      color: "#c2185b",
      gradient: "linear-gradient(135deg, #c2185b 0%, #ec407a 100%)",
      route: "/opengraph/musicradiostation",
      tags: ["Radio", "Podcast", "Live"]
    },
    {
      id: "music-song",
      title: "Music Song",
      description: "Individual track promotion",
      icon: SongIcon,
      color: "#00796b",
      gradient: "linear-gradient(135deg, #00796b 0%, #26a69a 100%)",
      route: "/opengraph/musicsong",
      tags: ["Track", "Single", "Music"]
    },
    {
      id: "profile",
      title: "Profile",
      description: "Personal branding, professional profiles",
      icon: ProfileIcon,
      color: "#5d4037",
      gradient: "linear-gradient(135deg, #5d4037 0%, #8d6e63 100%)",
      route: "/opengraph/profile",
      tags: ["Personal", "Professional", "Brand"]
    },
    {
      id: "video-episode",
      title: "Video Episode",
      description: "TV shows, web series, episodic content",
      icon: EpisodeIcon,
      color: "#303f9f",
      gradient: "linear-gradient(135deg, #303f9f 0%, #5c6bc0 100%)",
      route: "/opengraph/videoepisode",
      tags: ["TV", "Series", "Episode"]
    },
    {
      id: "video-movie",
      title: "Video Movie",
      description: "Film promotion, cinema marketing",
      icon: MovieIcon,
      color: "#e64a19",
      gradient: "linear-gradient(135deg, #e64a19 0%, #ff7043 100%)",
      route: "/opengraph/videomovie",
      tags: ["Film", "Cinema", "Movie"]
    },
    {
      id: "video-tv-show",
      title: "Video TV Show",
      description: "Television series, show promotion",
      icon: TvShowIcon,
      color: "#1565c0",
      gradient: "linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)",
      route: "/opengraph/videotvshow",
      tags: ["TV", "Show", "Series"]
    },
    {
      id: "website",
      title: "Website",
      description: "General websites, landing pages, corporate sites",
      icon: WebsiteIcon,
      color: "#424242",
      gradient: "linear-gradient(135deg, #424242 0%, #757575 100%)",
      route: "/opengraph/website",
      tags: ["General", "Corporate", "Landing"]
    }
  ];

  const twitterCardGenerators = [
    {
      id: "app",
      title: "App Card",
      description: "Mobile app promotion, direct downloads",
      icon: AppIcon,
      color: "#1DA1F2",
      gradient: "linear-gradient(135deg, #1DA1F2 0%, #71c9f8 100%)",
      route: "/twittercard/app",
      tags: ["Mobile", "App", "Download"],
      popular: true
    },
    {
      id: "player",
      title: "Player Card",
      description: "Embedded media players, interactive content",
      icon: PlayerIcon,
      color: "#1DA1F2",
      gradient: "linear-gradient(135deg, #1DA1F2 0%, #71c9f8 100%)",
      route: "/twittercard/player",
      tags: ["Media", "Player", "Interactive"]
    },
    {
      id: "summary",
      title: "Summary Card",
      description: "General content, articles, basic sharing",
      icon: SummaryIcon,
      color: "#1DA1F2",
      gradient: "linear-gradient(135deg, #1DA1F2 0%, #71c9f8 100%)",
      route: "/twittercard/summary",
      tags: ["General", "Summary", "Basic"]
    },
    {
      id: "large-image",
      title: "Large Image Card",
      description: "Visual content, photography, featured articles",
      icon: LargeImageIcon,
      color: "#1DA1F2",
      gradient: "linear-gradient(135deg, #1DA1F2 0%, #71c9f8 100%)",
      route: "/twittercard/summarylargeimage",
      tags: ["Visual", "Photography", "Featured"]
    }
  ];

  const features = [
    {
      icon: SpeedIcon,
      title: "Lightning Fast",
      description: "Generate meta tags in under 30 seconds"
    },
    {
      icon: SecurityIcon,
      title: "Error-Free",
      description: "Built-in validation prevents common mistakes"
    },
    {
      icon: CodeIcon,
      title: "Professional Code",
      description: "Enterprise-grade, validated meta tags"
    },
    {
      icon: AnalyticsIcon,
      title: "Live Preview",
      description: "See exactly how your content will appear"
    }
  ];

  const stats = [
    { label: "Total Generators", value: "17+", icon: CodeIcon },
    { label: "Content Types", value: "13+", icon: ShareIcon },
    { label: "Time Saved", value: "95%", icon: SpeedIcon },
    { label: "Success Rate", value: "99.9%", icon: StarIcon }
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f1f5f9", pb: 8, fontFamily: "'Inter', sans-serif" }}>      
      {/* Decorative Background Blobs */}
      <Box sx={{ position: 'fixed', top: -150, left: -100, width: 400, height: 400, bgcolor: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }} />
      <Box sx={{ position: 'fixed', bottom: -100, right: -50, width: 500, height: 500, bgcolor: 'rgba(29, 161, 242, 0.1)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0 }} />

      <Box sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="xl" sx={{ pt: 6 }}>
          
          {/* Hero Section */}
          <Box 
            sx={{ 
              p: { xs: 4, md: 8 }, 
              mb: 6, 
              background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
              color: "white",
              borderRadius: 4,
              textAlign: "center",
              boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              position: "relative",
              overflow: "hidden",
              animation: `${fadeIn} 0.8s ease-out`
            }}
          >
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54.627 0l.83.83-54.627 54.627-.83-.83L54.627 0z\' fill=\'%23ffffff\' fill-rule=\'evenodd\' fill-opacity=\'0.02\'/%3E%3C/svg%3E")', opacity: 0.5 }} />
            
            <Typography variant="h2" fontWeight="800" gutterBottom sx={{ position: 'relative', zIndex: 2, background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Meta Tag Generator Suite
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.8, mb: 4, fontWeight: 400, maxWidth: 700, mx: "auto", position: 'relative', zIndex: 2 }}>
              Create professional Open Graph and Twitter cards. Boost your social media footprint and SEO seamlessly in seconds.
            </Typography>
            
            <Box sx={{ position: 'relative', zIndex: 3, mb: 6 }}>
              <AIUrlAnalyzer />
            </Box>
            
            {/* Stats Row */}
            <Grid container spacing={4} sx={{ mt: 2, position: 'relative', zIndex: 2, justifyContent: 'center' }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box sx={{ textAlign: "center", p: 2, borderRadius: 3, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <stat.icon sx={{ fontSize: 36, mb: 1.5, color: '#60a5fa' }} />
                    <Typography variant="h4" fontWeight="bold" sx={{ color: '#f8fafc' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cbd5e1', fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ mb: 6, borderColor: 'rgba(0,0,0,0.05)' }} />

          {/* Open Graph Generators Section */}
          <Box sx={{ mb: 8, animation: `${fadeIn} 1s ease-out 0.2s backwards` }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4, px: 1 }}>
              <Box>
                <Typography variant="h3" fontWeight="800" sx={{ color: '#0f172a', letterSpacing: '-0.02em', mb: 1 }}>
                  Open Graph Protocols
                </Typography>
                <Typography variant="h6" sx={{ color: "#64748b", fontWeight: 400 }}>
                  Elevate your appearance on Facebook, LinkedIn, Discord & more.
                </Typography>
              </Box>
              <Chip 
                label={`${openGraphGenerators.length} Generators`} 
                sx={{ bgcolor: "#2563eb", color: "white", fontWeight: "bold", px: 1, py: 2, borderRadius: 2 }}
              />
            </Box>

            <Grid container spacing={3}>
              {openGraphGenerators.map((generator) => (
                <Grid item xs={12} sm={6} md={4} xl={3} key={generator.id}>
                  <Link href={generator.route} style={{ textDecoration: "none", color: "inherit" }}>
                    <Card 
                      elevation={0}
                      sx={{ 
                        height: "100%", 
                        display: "flex", 
                        flexDirection: "column",
                        borderRadius: 4,
                        background: '#ffffff',
                        border: '1px solid rgba(0,0,0,0.05)',
                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        overflow: 'visible',
                        cursor: 'pointer',
                        "&:hover": {
                          transform: "translateY(-8px) scale(1.02)",
                          boxShadow: `0 20px 40px -10px ${generator.color}40`,
                          borderColor: 'transparent'
                        }
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 3, pt: 4, position: 'relative' }}>
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            top: -24, 
                            left: 24, 
                            background: generator.gradient,
                            borderRadius: '16px',
                            p: 1.5,
                            boxShadow: `0 8px 16px -4px ${generator.color}50`
                          }}
                        >
                          <generator.icon sx={{ color: '#fff', fontSize: 32 }} />
                        </Box>

                        {generator.popular && (
                          <Chip 
                            label="POPULAR" 
                            size="small" 
                            sx={{ 
                              position: 'absolute', 
                              top: 16, 
                              right: 16, 
                              bgcolor: 'rgba(244, 63, 94, 0.1)', 
                              color: '#f43f5e', 
                              fontWeight: 800, 
                              fontSize: "0.65rem",
                              letterSpacing: 1
                            }}
                          />
                        )}
                        
                        <Box sx={{ mt: 3, mb: 2 }}>
                          <Typography variant="h5" fontWeight="800" sx={{ color: '#1e293b', mb: 1 }}>
                            {generator.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                            {generator.description}
                          </Typography>
                        </Box>
                        
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                          {generator.tags.map((tag, index) => (
                            <Chip 
                              key={index}
                              label={tag} 
                              size="small" 
                              sx={{ 
                                fontSize: "0.75rem", 
                                bgcolor: '#f1f5f9', 
                                color: '#475569',
                                fontWeight: 500,
                                borderRadius: 1.5
                              }}
                            />
                          ))}
                        </Stack>
                      </CardContent>

                      <Box sx={{ p: 3, pt: 0 }}>
                        <Button 
                          fullWidth 
                          variant="text" 
                          endIcon={<ArrowForwardIcon />}
                          sx={{ 
                            color: generator.color,
                            fontWeight: 700,
                            justifyContent: 'space-between',
                            px: 2,
                            py: 1.5,
                            borderRadius: 2,
                            bgcolor: `${generator.color}10`,
                            "&:hover": { bgcolor: `${generator.color}20` }
                          }}
                        >
                          Generate Tags
                        </Button>
                      </Box>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Divider sx={{ mb: 6, borderColor: 'rgba(0,0,0,0.05)' }} />

          {/* Twitter Card Generators Section */}
          <Box sx={{ mb: 8, animation: `${fadeIn} 1s ease-out 0.4s backwards` }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4, px: 1 }}>
              <Box>
                <Typography variant="h3" fontWeight="800" sx={{ color: '#1DA1F2', letterSpacing: '-0.02em', mb: 1 }}>
                  Twitter Cards
                </Typography>
                <Typography variant="h6" sx={{ color: "#64748b", fontWeight: 400 }}>
                  Stand out in the feed with rich media cards on X.
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={3}>
              {twitterCardGenerators.map((generator) => (
                <Grid item xs={12} sm={6} md={3} key={generator.id}>
                  <Link href={generator.route} style={{ textDecoration: "none", color: "inherit" }}>
                    <Card 
                      elevation={0}
                      sx={{ 
                        height: "100%", 
                        display: "flex", 
                        flexDirection: "column",
                        borderRadius: 4,
                        background: '#ffffff',
                        border: '2px solid rgba(29, 161, 242, 0.1)',
                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        overflow: 'visible',
                        cursor: 'pointer',
                        "&:hover": {
                          transform: "translateY(-8px) scale(1.02)",
                          boxShadow: `0 20px 40px -10px rgba(29, 161, 242, 0.3)`,
                          borderColor: 'rgba(29, 161, 242, 0.5)'
                        }
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1, p: 3, pt: 4, position: 'relative' }}>
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            top: -24, 
                            left: 24, 
                            background: generator.gradient,
                            borderRadius: '16px',
                            p: 1.5,
                            boxShadow: `0 8px 16px -4px ${generator.color}50`
                          }}
                        >
                          <generator.icon sx={{ color: '#fff', fontSize: 32 }} />
                        </Box>

                        {generator.popular && (
                          <Chip 
                            label="POPULAR" 
                            size="small" 
                            sx={{ 
                              position: 'absolute', 
                              top: 16, 
                              right: 16, 
                              bgcolor: 'rgba(29, 161, 242, 0.1)', 
                              color: '#1DA1F2', 
                              fontWeight: 800, 
                              fontSize: "0.65rem",
                              letterSpacing: 1
                            }}
                          />
                        )}
                        
                        <Box sx={{ mt: 3, mb: 2 }}>
                          <Typography variant="h5" fontWeight="800" sx={{ color: '#1e293b', mb: 1 }}>
                            {generator.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#64748b', lineHeight: 1.6 }}>
                            {generator.description}
                          </Typography>
                        </Box>
                      </CardContent>

                      <Box sx={{ p: 3, pt: 0 }}>
                        <Button 
                          fullWidth 
                          variant="contained" 
                          endIcon={<ArrowForwardIcon />}
                          sx={{ 
                            bgcolor: '#1DA1F2',
                            color: 'white',
                            fontWeight: 700,
                            justifyContent: 'space-between',
                            px: 2,
                            py: 1.5,
                            borderRadius: 2,
                            boxShadow: 'none',
                            "&:hover": { bgcolor: '#0c85d0', boxShadow: '0 8px 16px -4px rgba(29, 161, 242, 0.4)' }
                          }}
                        >
                          Create Twitter Card
                        </Button>
                      </Box>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Getting Started / CTA Section */}
          <Box 
            sx={{ 
              p: 6, 
              borderRadius: 6, 
              textAlign: "center",
              background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
              border: '1px solid rgba(255,255,255,0.5)',
              position: 'relative',
              overflow: 'hidden',
              animation: `${fadeIn} 1s ease-out 0.6s backwards`
            }}
          >
            <Box sx={{ position: 'absolute', top: '-50%', left: '-10%', width: '50%', height: '200%', background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)', transform: 'rotate(25deg)' }} />
            
            <Typography variant="h3" fontWeight="900" gutterBottom sx={{ color: '#0f172a', position: 'relative', zIndex: 2 }}>
              Ready to Optimize?
            </Typography>
            <Typography variant="h6" sx={{ color: "#475569", mb: 4, maxWidth: 600, mx: "auto", position: 'relative', zIndex: 2, fontWeight: 400 }}>
              Select a generator to begin creating structured metadata that helps your content stand out across the web.
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ position: 'relative', zIndex: 2 }}>
              <Link href="/opengraph/article" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  startIcon={<ArticleIcon />}
                  sx={{ 
                    minWidth: 200, 
                    py: 1.5, 
                    bgcolor: '#2563eb', 
                    borderRadius: 3,
                    boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    "&:hover": { bgcolor: '#1d4ed8' }
                  }}
                >
                  Start with Article
                </Button>
              </Link>
            </Stack>
          </Box>

        </Container>
      </Box>
    </Box>
  );
};

export default Home;

