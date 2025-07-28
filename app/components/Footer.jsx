"use client";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  Chip,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  Language as WebsiteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  // Generator Icons
  Article as ArticleIcon,
  ShoppingCart as ProductIcon,
  VideoLibrary as VideoIcon,
  PhoneAndroid as AppIcon,
  Code as CodeIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  const quickLinks = [
    { name: "Article Generator", icon: ArticleIcon, href: "/article" },
    { name: "Product Generator", icon: ProductIcon, href: "/product" },
    { name: "Video Generator", icon: VideoIcon, href: "/video" },
    { name: "App Card Generator", icon: AppIcon, href: "/twitter-app" },
  ];

  const resources = [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Examples", href: "/examples" },
    { name: "Best Practices", href: "/best-practices" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contact", href: "/contact" },
  ];

  const features = [
    { icon: SpeedIcon, text: "Lightning Fast Generation" },
    { icon: SecurityIcon, text: "Error-Free Validation" },
    { icon: CodeIcon, text: "Professional Code Output" },
    { icon: SupportIcon, text: "24/7 Support Available" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: "https://facebook.com/codencreative",
      color: "#1877F2",
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      href: "https://twitter.com/codencreative",
      color: "#1DA1F2",
    },
    {
      name: "GitHub",
      icon: GitHubIcon,
      href: "https://github.com/codencreative",
      color: "#333",
    },
    {
      name: "Website",
      icon: WebsiteIcon,
      href: "https://codencreative.com",
      color: "#667eea",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        mt: "auto",
      }}
    >
      {/* Main Footer Content */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Company Info & Branding */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Open Graph Suite
              </Typography>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, mb: 3, lineHeight: 1.6 }}
              >
                The most comprehensive toolkit for creating professional Open
                Graph and Twitter Card meta tags. Trusted by thousands of
                developers and marketers worldwide.
              </Typography>

              {/* Key Features */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Why Choose Us?
                </Typography>
                <Stack spacing={1}>
                  {features.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <feature.icon sx={{ fontSize: 18, opacity: 0.8 }} />
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {feature.text}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>

              {/* Social Links */}
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={1}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                        "&:hover": {
                          bgcolor: social.color,
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <social.icon />
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>

          {/* Quick Access Generators */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Popular Generators
            </Typography>
            <Stack spacing={1.5}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": {
                      color: "white",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <link.icon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">{link.name}</Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Resources
            </Typography>
            <Stack spacing={1.5}>
              {resources.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    "&:hover": {
                      color: "white",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Typography variant="body2">{link.name}</Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Company Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Company
            </Typography>
            <Stack spacing={1.5}>
              {company.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    "&:hover": {
                      color: "white",
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <Typography variant="body2">{link.name}</Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Get in Touch
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                <Link
                  href="mailto:aditya@iamadityaranjan.com"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    "&:hover": { color: "white" },
                  }}
                >
                  <Typography variant="body2">hello@allaboutcse.com</Typography>
                </Link>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 16, opacity: 0.8 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  +91 7481092465
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocationIcon sx={{ fontSize: 16, opacity: 0.8, mt: 0.2 }} />
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Patna, Bihar
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: "rgba(0, 0, 0, 0.2)", py: 3 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} textAlign="center">
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" fontWeight="bold">
                17+
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Generators Available
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" fontWeight="bold">
                50K+
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Tags Generated
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" fontWeight="bold">
                95%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Time Saved
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" fontWeight="bold">
                99.9%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Uptime
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bottom Bar */}
      <Box sx={{ bgcolor: "rgba(0, 0, 0, 0.3)", py: 2 }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ opacity: 0.8, textAlign: { xs: "center", sm: "left" } }}
            >
              © {new Date().getFullYear()}{" "}
              <Link
                href="https://metaforge.allaboutcse.com/"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                AllAboutCse
              </Link>
              . All Rights Reserved.
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent="center"
            >
              <Chip
                label="Free to Use"
                size="small"
                sx={{
                  bgcolor: "rgba(76, 175, 80, 0.8)",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
              <Chip
                label="No Registration"
                size="small"
                sx={{
                  bgcolor: "rgba(33, 150, 243, 0.8)",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
              <Chip
                label="Professional Quality"
                size="small"
                sx={{
                  bgcolor: "rgba(156, 39, 176, 0.8)",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;

// import React from "react";

// const Footer = () => {
//   return (
//     <div>
//       <footer class="bg-white dark:bg-gray-900">
//         <div class=" w-full  px-4 py-6 ">

//           <hr class="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
//           <div class="sm:flex sm:items-center sm:justify-between">
//             <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
//               © 2023{" "}
//               <a href="https://codencreative.com/" class="hover:underline">
//                 CodenCreative
//               </a>
//               . All Rights Reserved.
//             </span>
//             <div class="flex mt-4 sm:justify-center sm:mt-0">
//               <a
//                 href="#"
//                 class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
//               >
//                 <svg
//                   class="w-4 h-4"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 8 19"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//                 <span class="sr-only">Facebook page</span>
//               </a>
//               <a
//                 href="#"
//                 class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
//               >
//                 <svg
//                   class="w-4 h-4"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 21 16"
//                 >
//                   <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
//                 </svg>
//                 <span class="sr-only">Discord community</span>
//               </a>
//               <a
//                 href="#"
//                 class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
//               >
//                 <svg
//                   class="w-4 h-4"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 17"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//                 <span class="sr-only">Twitter page</span>
//               </a>
//               <a
//                 href="#"
//                 class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
//               >
//                 <svg
//                   class="w-4 h-4"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//                 <span class="sr-only">GitHub account</span>
//               </a>
//               <a
//                 href="#"
//                 class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
//               >
//                 <svg
//                   class="w-4 h-4"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//                 <span class="sr-only">Dribbble account</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footer;
