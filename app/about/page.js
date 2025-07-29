
"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Stack,
  Avatar,
  Chip,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  // About page icons
  Rocket as RocketIcon,
  People as PeopleIcon,
  Star as StarIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Code as CodeIcon,
  TrendingUp as TrendingIcon,
  Support as SupportIcon,
  Email as EmailIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  CheckCircle as CheckIcon,
  Analytics as AnalyticsIcon,
  Share as ShareIcon,
  Lightbulb as LightbulbIcon,
  Timeline as TimelineIcon,
  Group as GroupIcon,
  LocalOffer as LocalOfferIcon,
} from "@mui/icons-material";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      avatar: "AJ",
      description: "Full-stack developer with 8+ years in web technologies and SEO optimization.",
      color: "#1976d2"
    },
    {
      name: "Sarah Chen",
      role: "UI/UX Designer",
      avatar: "SC",
      description: "Creative designer focused on user experience and modern interface design.",
      color: "#7b1fa2"
    },
    {
      name: "Mike Rodriguez",
      role: "SEO Specialist",
      avatar: "MR",
      description: "Digital marketing expert with deep knowledge of social media algorithms.",
      color: "#388e3c"
    },
    {
      name: "Emma Davis",
      role: "QA Engineer",
      avatar: "ED",
      description: "Quality assurance specialist ensuring flawless user experience.",
      color: "#f57c00"
    }
  ];

  const features = [
    {
      icon: CodeIcon,
      title: "17+ Generators",
      description: "Complete suite covering all major social media platforms"
    },
    {
      icon: SpeedIcon,
      title: "Lightning Fast",
      description: "Generate professional meta tags in under 30 seconds"
    },
    {
      icon: SecurityIcon,
      title: "Error-Free Validation",
      description: "Built-in validation prevents common SEO mistakes"
    },
    {
      icon: AnalyticsIcon,
      title: "Live Preview",
      description: "See exactly how your content appears before publishing"
    },
    {
      icon: ShareIcon,
      title: "No Registration",
      description: "Use all tools immediately without creating an account"
    },
    {
      icon: SupportIcon,
      title: "24/7 Support",
      description: "Community support and comprehensive documentation"
    }
  ];

  const stats = [
    { label: "Meta Tags Generated", value: "50,000+", icon: CodeIcon },
    { label: "Active Users", value: "10,000+", icon: PeopleIcon },
    { label: "Countries Served", value: "120+", icon: TrendingIcon },
    { label: "Uptime", value: "99.9%", icon: StarIcon }
  ];

  return (
    <Box sx={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
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
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              mx: "auto", 
              mb: 3,
              bgcolor: "rgba(255,255,255,0.2)",
              fontSize: "2rem",
              fontWeight: "bold"
            }}
          >
            MF
          </Avatar>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            About MetaForge
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
            Forging the Future of Social Media Optimization
          </Typography>
          {/* FIXED: Line 153 - Used curly braces for apostrophe */}
          <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 800, mx: "auto", mb: 4 }}>
            {"We're passionate about empowering developers, marketers, and content creators with cutting-edge tools for generating SEO-optimized meta tags and social media cards easily and professionally."}
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

        {/* Mission & Vision Section */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, height: "100%", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <RocketIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
                <Typography variant="h4" fontWeight="bold" color="primary">
                  Our Mission
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                To democratize social media optimization by providing powerful, 
                user-friendly tools that eliminate the technical barriers between 
                content creators and professional SEO results.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                We believe every website deserves professional social media presence, 
                regardless of technical expertise or budget constraints.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 4, height: "100%", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <LightbulbIcon sx={{ fontSize: 32, color: "secondary.main", mr: 2 }} />
                <Typography variant="h4" fontWeight="bold" color="secondary">
                  Our Vision
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                To become the go-to platform for social media optimization, 
                setting the standard for ease of use, accuracy, and comprehensive 
                coverage of all major social platforms.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                We envision a world where creating professional meta tags is as 
                simple as filling out a form, yet as powerful as custom coding.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center" color="primary">
            Why Choose MetaForge?
          </Typography>
          {/* FIXED: Line 225 - Used curly braces for apostrophe */}
          <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
            {"We've built MetaForge with the needs of modern web professionals in mind"}
          </Typography>
          
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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

        {/* Company Timeline */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <TimelineIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
            <Typography variant="h4" fontWeight="bold" color="primary">
              Our Journey
            </Typography>
          </Box>

          <List>
            <ListItem>
              <ListItemIcon>
                <LightbulbIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography fontWeight="bold">2023 - The Idea</Typography>}
                secondary="Recognized the need for simplified meta tag generation tools"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CodeIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography fontWeight="bold">2024 - Development</Typography>}
                secondary="Built the first version with Open Graph and Twitter Card generators"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <RocketIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography fontWeight="bold">2024 - Launch</Typography>}
                secondary="Launched MetaForge with 10+ generators and growing user base"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TrendingIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography fontWeight="bold">2025 - Growth</Typography>}
                secondary="Expanded to 17+ generators serving 10,000+ users globally"
              />
            </ListItem>
          </List>
        </Paper>

        {/* Values Section */}
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center" color="primary">
            Our Core Values
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <CheckIcon sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Quality First
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Every tool we build meets the highest standards of accuracy and reliability.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <GroupIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  User-Centric
                </Typography>
                {/* FIXED: Line 386 - Used curly braces for apostrophe */}
                <Typography variant="body2" color="text.secondary">
                  {"Our users' needs drive every decision we make and feature we develop."}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <LocalOfferIcon sx={{ fontSize: 48, color: "secondary.main", mb: 2 }} />
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Always Free
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We believe powerful SEO tools should be accessible to everyone, always.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Contact Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 3,
            textAlign: "center"
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Get in Touch
          </Typography>
          {/* FIXED: Line 419 - Used curly braces for apostrophe */}
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 4, maxWidth: 600, mx: "auto" }}>
            {"Have questions, suggestions, or just want to say hello? We'd love to hear from you!"}
          </Typography>

          <Stack 
            direction={{ xs: "column", sm: "row" }} 
            spacing={2} 
            justifyContent="center" 
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Button 
              variant="contained" 
              startIcon={<EmailIcon />}
              sx={{ 
                bgcolor: "rgba(255,255,255,0.2)", 
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                minWidth: 160
              }}
            >
              Email Us
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<TwitterIcon />}
              sx={{ 
                borderColor: "rgba(255,255,255,0.5)", 
                color: "white",
                "&:hover": { 
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)"
                },
                minWidth: 160
              }}
            >
              Follow Us
            </Button>
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <IconButton sx={{ color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
              <GitHubIcon />
            </IconButton>
            <IconButton sx={{ color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
              <LinkedInIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" sx={{ opacity: 0.7, mt: 3 }}>
            support@metaforge.allaboutcse.com
          </Typography>
        </Paper>

      </Container>
    </Box>
  );
};

export default About;





// "use client";
// import React from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   Paper,
//   Stack,
//   Avatar,
//   Chip,
//   Divider,
//   Button,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
// } from "@mui/material";
// import {
//   // About page icons
//   Rocket as RocketIcon,
//   People as PeopleIcon,
//   Star as StarIcon,
//   Security as SecurityIcon,
//   Speed as SpeedIcon,
//   Code as CodeIcon,
//   TrendingUp as TrendingIcon,
//   Support as SupportIcon,
//   Email as EmailIcon,
//   Twitter as TwitterIcon,
//   GitHub as GitHubIcon,
//   LinkedIn as LinkedInIcon,
//   CheckCircle as CheckIcon,
//   Analytics as AnalyticsIcon,
//   Share as ShareIcon,
//   Lightbulb as LightbulbIcon,
//   Timeline as TimelineIcon,
//   Group as GroupIcon,
//   LocalOffer as LocalOfferIcon,
// } from "@mui/icons-material";

// const About = () => {
//   const teamMembers = [
//     {
//       name: "Alex Johnson",
//       role: "Lead Developer",
//       avatar: "AJ",
//       description: "Full-stack developer with 8+ years in web technologies and SEO optimization.",
//       color: "#1976d2"
//     },
//     {
//       name: "Sarah Chen",
//       role: "UI/UX Designer",
//       avatar: "SC",
//       description: "Creative designer focused on user experience and modern interface design.",
//       color: "#7b1fa2"
//     },
//     {
//       name: "Mike Rodriguez",
//       role: "SEO Specialist",
//       avatar: "MR",
//       description: "Digital marketing expert with deep knowledge of social media algorithms.",
//       color: "#388e3c"
//     },
//     {
//       name: "Emma Davis",
//       role: "QA Engineer",
//       avatar: "ED",
//       description: "Quality assurance specialist ensuring flawless user experience.",
//       color: "#f57c00"
//     }
//   ];

//   const features = [
//     {
//       icon: CodeIcon,
//       title: "17+ Generators",
//       description: "Complete suite covering all major social media platforms"
//     },
//     {
//       icon: SpeedIcon,
//       title: "Lightning Fast",
//       description: "Generate professional meta tags in under 30 seconds"
//     },
//     {
//       icon: SecurityIcon,
//       title: "Error-Free Validation",
//       description: "Built-in validation prevents common SEO mistakes"
//     },
//     {
//       icon: AnalyticsIcon,
//       title: "Live Preview",
//       description: "See exactly how your content appears before publishing"
//     },
//     {
//       icon: ShareIcon,
//       title: "No Registration",
//       description: "Use all tools immediately without creating an account"
//     },
//     {
//       icon: SupportIcon,
//       title: "24/7 Support",
//       description: "Community support and comprehensive documentation"
//     }
//   ];

//   const stats = [
//     { label: "Meta Tags Generated", value: "50,000+", icon: CodeIcon },
//     { label: "Active Users", value: "10,000+", icon: PeopleIcon },
//     { label: "Countries Served", value: "120+", icon: TrendingIcon },
//     { label: "Uptime", value: "99.9%", icon: StarIcon }
//   ];

//   return (
//     <Box sx={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
//       <Container maxWidth="xl" sx={{ py: 4 }}>
        
//         {/* Hero Section */}
//         <Paper 
//           elevation={3} 
//           sx={{ 
//             p: 4, 
//             mb: 4, 
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "white",
//             borderRadius: 3,
//             textAlign: "center"
//           }}
//         >
//           <Avatar 
//             sx={{ 
//               width: 80, 
//               height: 80, 
//               mx: "auto", 
//               mb: 3,
//               bgcolor: "rgba(255,255,255,0.2)",
//               fontSize: "2rem",
//               fontWeight: "bold"
//             }}
//           >
//             MF
//           </Avatar>
//           <Typography variant="h2" fontWeight="bold" gutterBottom>
//             About MetaForge
//           </Typography>
//           <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
//             Forging the Future of Social Media Optimization
//           </Typography>
//           <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 800, mx: "auto", mb: 4 }}>
//             We&apos;re passionate about empowering developers, marketers, and content creators with 
//             cutting-edge tools for generating SEO-optimized meta tags and social media cards 
//             easily and professionally.
//           </Typography>

//           {/* Stats Row */}
//           <Grid container spacing={3} sx={{ mt: 2 }}>
//             {stats.map((stat, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Box sx={{ textAlign: "center" }}>
//                   <stat.icon sx={{ fontSize: 32, mb: 1 }} />
//                   <Typography variant="h4" fontWeight="bold">
//                     {stat.value}
//                   </Typography>
//                   <Typography variant="body2" sx={{ opacity: 0.8 }}>
//                     {stat.label}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Paper>

//         {/* Mission & Vision Section */}
//         <Grid container spacing={4} sx={{ mb: 4 }}>
//           <Grid item xs={12} md={6}>
//             <Paper elevation={2} sx={{ p: 4, height: "100%", borderRadius: 2 }}>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                 <RocketIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
//                 <Typography variant="h4" fontWeight="bold" color="primary">
//                   Our Mission
//                 </Typography>
//               </Box>
//               <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
//                 To democratize social media optimization by providing powerful, 
//                 user-friendly tools that eliminate the technical barriers between 
//                 content creators and professional SEO results.
//               </Typography>
//               <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
//                 We believe every website deserves professional social media presence, 
//                 regardless of technical expertise or budget constraints.
//               </Typography>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Paper elevation={2} sx={{ p: 4, height: "100%", borderRadius: 2 }}>
//               <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                 <LightbulbIcon sx={{ fontSize: 32, color: "secondary.main", mr: 2 }} />
//                 <Typography variant="h4" fontWeight="bold" color="secondary">
//                   Our Vision
//                 </Typography>
//               </Box>
//               <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
//                 To become the go-to platform for social media optimization, 
//                 setting the standard for ease of use, accuracy, and comprehensive 
//                 coverage of all major social platforms.
//               </Typography>
//               <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
//                 We envision a world where creating professional meta tags is as 
//                 simple as filling out a form, yet as powerful as custom coding.
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>

//         {/* Features Section */}
//         <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center" color="primary">
//             Why Choose MetaForge?
//           </Typography>
//           <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
//             We&apos;ve built MetaForge with the needs of modern web professionals in mind
//           </Typography>
          
//           <Grid container spacing={3}>
//             {features.map((feature, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Box sx={{ textAlign: "center", p: 2 }}>
//                   <Avatar 
//                     sx={{ 
//                       bgcolor: "primary.main", 
//                       width: 56, 
//                       height: 56, 
//                       mx: "auto", 
//                       mb: 2 
//                     }}
//                   >
//                     <feature.icon />
//                   </Avatar>
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     {feature.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {feature.description}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Paper>

//         {/* Team Section */}
//         {/* <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
//           <Box sx={{ textAlign: "center", mb: 4 }}>
//             <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
//               Meet Our Team
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               Passionate professionals dedicated to your success
//             </Typography>
//           </Box>

//           <Grid container spacing={3}>
//             {teamMembers.map((member, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <Card 
//                   elevation={2}
//                   sx={{ 
//                     textAlign: "center", 
//                     p: 3,
//                     height: "100%",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: 4
//                     }
//                   }}
//                 >
//                   <Avatar 
//                     sx={{ 
//                       width: 80, 
//                       height: 80, 
//                       mx: "auto", 
//                       mb: 2,
//                       bgcolor: member.color,
//                       fontSize: "1.5rem",
//                       fontWeight: "bold"
//                     }}
//                   >
//                     {member.avatar}
//                   </Avatar>
//                   <Typography variant="h6" fontWeight="bold" gutterBottom>
//                     {member.name}
//                   </Typography>
//                   <Chip 
//                     label={member.role} 
//                     size="small" 
//                     sx={{ mb: 2, bgcolor: member.color, color: "white" }}
//                   />
//                   <Typography variant="body2" color="text.secondary">
//                     {member.description}
//                   </Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Paper> */}

//         {/* Company Timeline */}
//         <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
//           <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//             <TimelineIcon sx={{ fontSize: 32, color: "primary.main", mr: 2 }} />
//             <Typography variant="h4" fontWeight="bold" color="primary">
//               Our Journey
//             </Typography>
//           </Box>

//           <List>
//             <ListItem>
//               <ListItemIcon>
//                 <LightbulbIcon color="primary" />
//               </ListItemIcon>
//               <ListItemText
//                 primary={<Typography fontWeight="bold">2023 - The Idea</Typography>}
//                 secondary="Recognized the need for simplified meta tag generation tools"
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemIcon>
//                 <CodeIcon color="primary" />
//               </ListItemIcon>
//               <ListItemText
//                 primary={<Typography fontWeight="bold">2024 - Development</Typography>}
//                 secondary="Built the first version with Open Graph and Twitter Card generators"
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemIcon>
//                 <RocketIcon color="primary" />
//               </ListItemIcon>
//               <ListItemText
//                 primary={<Typography fontWeight="bold">2024 - Launch</Typography>}
//                 secondary="Launched MetaForge with 10+ generators and growing user base"
//               />
//             </ListItem>
//             <ListItem>
//               <ListItemIcon>
//                 <TrendingIcon color="primary" />
//               </ListItemIcon>
//               <ListItemText
//                 primary={<Typography fontWeight="bold">2025 - Growth</Typography>}
//                 secondary="Expanded to 17+ generators serving 10,000+ users globally"
//               />
//             </ListItem>
//           </List>
//         </Paper>

//         {/* Values Section */}
//         <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center" color="primary">
//             Our Core Values
//           </Typography>
          
//           <Grid container spacing={3} sx={{ mt: 2 }}>
//             <Grid item xs={12} md={4}>
//               <Box sx={{ textAlign: "center", p: 2 }}>
//                 <CheckIcon sx={{ fontSize: 48, color: "success.main", mb: 2 }} />
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                   Quality First
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Every tool we build meets the highest standards of accuracy and reliability.
//                 </Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Box sx={{ textAlign: "center", p: 2 }}>
//                 <GroupIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                   User-Centric
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Our users&apos; needs drive every decision we make and feature we develop.
//                 </Typography>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <Box sx={{ textAlign: "center", p: 2 }}>
//                 <LocalOfferIcon sx={{ fontSize: 48, color: "secondary.main", mb: 2 }} />
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                   Always Free
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   We believe powerful SEO tools should be accessible to everyone, always.
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>

//         {/* Contact Section */}
//         <Paper 
//           elevation={3} 
//           sx={{ 
//             p: 4, 
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             color: "white",
//             borderRadius: 3,
//             textAlign: "center"
//           }}
//         >
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             Get in Touch
//           </Typography>
//           <Typography variant="body1" sx={{ opacity: 0.9, mb: 4, maxWidth: 600, mx: "auto" }}>
//             Have questions, suggestions, or just want to say hello? We&apos;d love to hear from you!
//           </Typography>

//           <Stack 
//             direction={{ xs: "column", sm: "row" }} 
//             spacing={2} 
//             justifyContent="center" 
//             alignItems="center"
//             sx={{ mb: 3 }}
//           >
//             <Button 
//               variant="contained" 
//               startIcon={<EmailIcon />}
//               sx={{ 
//                 bgcolor: "rgba(255,255,255,0.2)", 
//                 "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
//                 minWidth: 160
//               }}
//             >
//               Email Us
//             </Button>
//             <Button 
//               variant="outlined" 
//               startIcon={<TwitterIcon />}
//               sx={{ 
//                 borderColor: "rgba(255,255,255,0.5)", 
//                 color: "white",
//                 "&:hover": { 
//                   borderColor: "white",
//                   bgcolor: "rgba(255,255,255,0.1)"
//                 },
//                 minWidth: 160
//               }}
//             >
//               Follow Us
//             </Button>
//           </Stack>

//           <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
//             <IconButton sx={{ color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
//               <TwitterIcon />
//             </IconButton>
//             <IconButton sx={{ color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
//               <GitHubIcon />
//             </IconButton>
//             <IconButton sx={{ color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } }}>
//               <LinkedInIcon />
//             </IconButton>
//           </Box>

//           <Typography variant="body2" sx={{ opacity: 0.7, mt: 3 }}>
//             support@metaforge.allaboutcse.com
//           </Typography>
//         </Paper>

//       </Container>
//     </Box>
//   );
// };

// export default About;
