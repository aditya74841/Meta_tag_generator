"use client";
import React, { useState } from "react";
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
  IconButton,
  Divider,
  Alert,
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
  TrendingUp as TrendingIcon,
  Star as StarIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  Share as ShareIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";
import HeadlessDemo from "./components/Sidebar";
import Link from "next/link";

const Home = () => {
  // Generator data structure
  const openGraphGenerators = [
    {
      id: "article",
      title: "Article",
      description: "Blog posts, news articles, editorial content",
      icon: ArticleIcon,
      color: "#1976d2",
      bgColor: "rgba(25, 118, 210, 0.1)",
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
      bgColor: "rgba(237, 108, 2, 0.1)",
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
      bgColor: "rgba(211, 47, 47, 0.1)",
      route: "/opengraph/video",
      tags: ["Media", "Entertainment", "Tutorial"]
    },
    {
      id: "book",
      title: "Book",
      description: "Book promotion, literary content, publishing",
      icon: BookIcon,
      color: "#7b1fa2",
      bgColor: "rgba(123, 31, 162, 0.1)",
      route: "/opengraph/book",
      tags: ["Publishing", "Literature", "Education"]
    },
    {
      id: "music-album",
      title: "Music Album",
      description: "Album promotion, music marketing",
      icon: MusicAlbumIcon,
      color: "#388e3c",
      bgColor: "rgba(56, 142, 60, 0.1)",
      route: "/opengraph/musicalbum",
      tags: ["Music", "Album", "Artist"]
    },
    {
      id: "music-playlist",
      title: "Music Playlist",
      description: "Curated music collections, streaming platforms",
      icon: PlaylistIcon,
      color: "#f57c00",
      bgColor: "rgba(245, 124, 0, 0.1)",
      route: "/opengraph/musicplaylist",
      tags: ["Playlist", "Streaming", "Curation"]
    },
    {
      id: "music-radio",
      title: "Music Radio Station",
      description: "Radio stations, podcast networks, streaming radio",
      icon: RadioIcon,
      color: "#c2185b",
      bgColor: "rgba(194, 24, 91, 0.1)",
      route: "/opengraph/musicradiostation",
      tags: ["Radio", "Podcast", "Live"]
    },
    {
      id: "music-song",
      title: "Music Song",
      description: "Individual track promotion",
      icon: SongIcon,
      color: "#00796b",
      bgColor: "rgba(0, 121, 107, 0.1)",
      route: "/opengraph/musicsong",
      tags: ["Track", "Single", "Music"]
    },
    {
      id: "profile",
      title: "Profile",
      description: "Personal branding, professional profiles",
      icon: ProfileIcon,
      color: "#5d4037",
      bgColor: "rgba(93, 64, 55, 0.1)",
      route: "/opengraph/profile",
      tags: ["Personal", "Professional", "Brand"]
    },
    {
      id: "video-episode",
      title: "Video Episode",
      description: "TV shows, web series, episodic content",
      icon: EpisodeIcon,
      color: "#303f9f",
      bgColor: "rgba(48, 63, 159, 0.1)",
      route: "/opengraph/videoepisode",
      tags: ["TV", "Series", "Episode"]
    },
    {
      id: "video-movie",
      title: "Video Movie",
      description: "Film promotion, cinema marketing",
      icon: MovieIcon,
      color: "#e64a19",
      bgColor: "rgba(230, 74, 25, 0.1)",
      route: "/opengraph/videomovie",
      tags: ["Film", "Cinema", "Movie"]
    },
    {
      id: "video-tv-show",
      title: "Video TV Show",
      description: "Television series, show promotion",
      icon: TvShowIcon,
      color: "#1565c0",
      bgColor: "rgba(21, 101, 192, 0.1)",
      route: "/opengraph/videotvshow",
      tags: ["TV", "Show", "Series"]
    },
    {
      id: "website",
      title: "Website",
      description: "General websites, landing pages, corporate sites",
      icon: WebsiteIcon,
      color: "#424242",
      bgColor: "rgba(66, 66, 66, 0.1)",
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
      bgColor: "rgba(29, 161, 242, 0.1)",
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
      bgColor: "rgba(29, 161, 242, 0.1)",
      route: "/twittercard/player",
      tags: ["Media", "Player", "Interactive"]
    },
    {
      id: "summary",
      title: "Summary Card",
      description: "General content, articles, basic sharing",
      icon: SummaryIcon,
      color: "#1DA1F2",
      bgColor: "rgba(29, 161, 242, 0.1)",
      route: "/twittercard/summary",
      tags: ["General", "Summary", "Basic"]
    },
    {
      id: "large-image",
      title: "Large Image Card",
      description: "Visual content, photography, featured articles",
      icon: LargeImageIcon,
      color: "#1DA1F2",
      bgColor: "rgba(29, 161, 242, 0.1)",
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
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      {/* <HeadlessDemo /> */}
      
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          
          {/* Hero Section */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              mb: 4, 
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              borderRadius: 3,
              textAlign: "center"
            }}
          >
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Open Graph & Twitter Card Generator Suite
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
              Create professional meta tags for social media optimization in seconds
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 800, mx: "auto", mb: 4 }}>
              Complete toolkit with 17+ generators covering every content type - from articles and products to videos and mobile apps. 
              Professional results with real-time validation and live previews.
            </Typography>
            
            {/* Stats Row */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box sx={{ textAlign: "center" }}>
                    <stat.icon sx={{ fontSize: 32, mb: 1 }} />
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Features Section */}
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center" color="primary">
              Why Choose Our Generator Suite?
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: "primary.main", 
                        width: 56, 
                        height: 56, 
                        mx: "auto", 
                        mb: 2 
                      }}
                    >
                      <feature.icon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Open Graph Generators Section */}
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h4" fontWeight="bold" color="primary">
                Open Graph Generators
              </Typography>
              <Chip 
                label={`${openGraphGenerators.length} Generators`} 
                color="primary" 
                variant="outlined"
              />
            </Box>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Optimize content for Facebook, LinkedIn, and all social media platforms with proper Open Graph meta tags.
            </Typography>

            <Grid container spacing={3}>
              {openGraphGenerators.map((generator) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={generator.id}>
                  <Card 
                    elevation={2}
                    sx={{ 
                      height: "100%", 
                      display: "flex", 
                      flexDirection: "column",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        elevation: 6,
                        transform: "translateY(-4px)",
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: generator.bgColor,
                            color: generator.color,
                            mr: 2,
                            width: 40,
                            height: 40
                          }}
                        >
                          <generator.icon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight="bold">
                            {generator.title}
                            {generator.popular && (
                              <Chip 
                                label="Popular" 
                                size="small" 
                                color="secondary" 
                                sx={{ ml: 1, fontSize: "0.7rem" }}
                              />
                            )}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {generator.description}
                      </Typography>
                      
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                        {generator.tags.map((tag, index) => (
                          <Chip 
                            key={index}
                            label={tag} 
                            size="small" 
                            variant="outlined"
                            sx={{ fontSize: "0.7rem" }}
                          />
                        ))}
                      </Stack>
                    </CardContent>
                    
                    {/* <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        endIcon={<LaunchIcon />}
                        sx={{ 
                          bgcolor: generator.color,
                          "&:hover": { bgcolor: generator.color, opacity: 0.9 }
                        }}
                        className="bg-gray-500"
                      >
                        Generate Tags
                      </Button>
                    </CardActions> */}

                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Link href={generator.route} style={{ textDecoration: "none", width: "100%" }}>
                        <Button 
                          fullWidth 
                          variant="contained" 
                          endIcon={<LaunchIcon />}
                          sx={{ 
                            bgcolor: generator.color,
                            "&:hover": { bgcolor: generator.color, opacity: 0.9 }
                          }}
                          className="bg-gray-500"
                        >
                          Generate Tags
                        </Button>
                      </Link>
                    </CardActions>

                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Twitter Card Generators Section */}
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#1DA1F2" }}>
                Twitter Card Generators
              </Typography>
              <Chip 
                label={`${twitterCardGenerators.length} Generators`} 
                sx={{ bgcolor: "#1DA1F2", color: "white" }}
              />
            </Box>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Create rich Twitter Cards for enhanced engagement and professional presentation on Twitter/X platform.
            </Typography>

            <Grid container spacing={3}>
              {twitterCardGenerators.map((generator) => (
                <Grid item xs={12} sm={6} md={3} key={generator.id}>
                  <Card 
                    elevation={2}
                    sx={{ 
                      height: "100%", 
                      display: "flex", 
                      flexDirection: "column",
                      border: "2px solid #1DA1F2",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        elevation: 6,
                        transform: "translateY(-4px)",
                        borderColor: "#0d8bd9"
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: generator.bgColor,
                            color: generator.color,
                            mr: 2,
                            width: 40,
                            height: 40
                          }}
                        >
                          <generator.icon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight="bold">
                            {generator.title}
                            {generator.popular && (
                              <Chip 
                                label="Popular" 
                                size="small" 
                                color="secondary" 
                                sx={{ ml: 1, fontSize: "0.7rem" }}
                              />
                            )}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {generator.description}
                      </Typography>
                      
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                        {generator.tags.map((tag, index) => (
                          <Chip 
                            key={index}
                            label={tag} 
                            size="small" 
                            variant="outlined"
                            sx={{ 
                              fontSize: "0.7rem",
                              borderColor: "#1DA1F2",
                              color: "#1DA1F2"
                            }}
                          />
                        ))}
                      </Stack>
                    </CardContent>
                    


                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Link href={generator.route} style={{ textDecoration: "none", width: "100%" }}>
                        <Button 
                          fullWidth 
                          variant="contained" 
                          endIcon={<LaunchIcon />}
                          sx={{ 
                            bgcolor: generator.color,
                            "&:hover": { bgcolor: generator.color, opacity: 0.9 }
                          }}
                          className="bg-gray-500"
                        >
                          Generate Tags
                        </Button>
                      </Link>
                    </CardActions>

                    {/* <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        endIcon={<LaunchIcon />}
                        sx={{ 
                          bgcolor: "#1DA1F2",
                          "&:hover": { bgcolor: "#0d8bd9" }
                        }}
                        className="bg-gray-500"
                      >
                        Generate Card
                      </Button>
                    </CardActions> */}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Getting Started Section */}
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
              Ready to Get Started?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: "auto" }}>
              Choose any generator above to start creating professional meta tags for your content. 
              No registration required - just select your content type and start generating!
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3, maxWidth: 800, mx: "auto" }}>
              <Typography variant="body2">
                💡 <strong>Pro Tip:</strong> Start with the Article or Product generators - they&apos;re our most popular tools 
                and cover the majority of social sharing needs.
              </Typography>
            </Alert>

            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Link href="/opengraph/article">
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<ArticleIcon />}
                sx={{ minWidth: 160 }}
                className="bg-cyan-400"
              >
                Start with Article
              </Button>
              </Link>
              <Button 
                variant="outlined" 
                size="large" 
                startIcon={<ProductIcon />}
                sx={{ minWidth: 160 }}
              >
                Try Product Generator
              </Button>
            </Stack>
          </Paper>

        </Container>
      </Box>
    </Box>
  );
};

export default Home;
