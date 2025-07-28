"use client";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Alert,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  CropOriginal as LargeImageIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Description as DescriptionIcon,
  Title as TitleIcon,
  Share as ShareIcon,
  Twitter as TwitterIcon,
  PhotoSizeSelectLarge as PhotoLargeIcon,
  AspectRatio as AspectRatioIcon,
  Public as PublicIcon,
  CropLandscape as LandscapeIcon,
} from "@mui/icons-material";

const SummaryLargeImage = () => {
  const [site, setSite] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAltText, setImageAltText] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!title.trim()) newErrors.title = "Title is required";

    // Twitter handle validation
    if (site && !site.startsWith("@")) {
      newErrors.site = "Twitter handle should start with @";
    }

    // Description length validation
    if (description && description.length > 200) {
      newErrors.description = "Description must be 200 characters or less";
    }

    // URL validation for image
    const urlPattern = /^https?:\/\/.+/;
    if (imageUrl && !urlPattern.test(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [title, site, description, imageUrl, imageAltText]);

  const generateMetaTags = () => {
    const metaTags = [];
    
    metaTags.push('<meta name="twitter:card" content="summary_large_image" />');
    if (title) metaTags.push(`<meta name="twitter:title" content="${title}" />`);
    if (site) metaTags.push(`<meta name="twitter:site" content="${site}" />`);
    if (description) metaTags.push(`<meta name="twitter:description" content="${description}" />`);
    if (imageUrl) metaTags.push(`<meta name="twitter:image" content="${imageUrl}" />`);
    if (imageAltText) metaTags.push(`<meta name="twitter:image:alt" content="${imageAltText}" />`);

    return metaTags.join('\n');
  };

  const metaTagsText = generateMetaTags();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && title.trim();

  return (
    <Box sx={{ p: 3, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
      {/* Header Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: "linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)",
          color: "white",
          borderRadius: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <LargeImageIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Summary with Large Image Twitter Card Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create Twitter Card meta tags with title, description and a prominent featured image.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Configuration Panel */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "primary.main", color: "white", p: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <CodeIcon />
              <Typography variant="h6" fontWeight="bold">
                LARGE IMAGE TWITTER CARD CONFIGURATION
              </Typography>
              {isFormValid && (
                <Chip 
                  icon={<CheckIcon />} 
                  label="Valid" 
                  sx={{ bgcolor: "rgba(76, 175, 80, 0.8)", color: "white", ml: "auto" }}
                />
              )}
            </Box>
            
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Basic Information Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <PublicIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Basic Information
                  </Typography>
                </Grid>

                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Content Title *"
                    placeholder="Amazing Article with Stunning Visuals"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!!errors.title}
                    helperText={errors.title || `${title.length} characters (recommended: 40-60 for social sharing)`}
                    InputProps={{
                      startAdornment: <TitleIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Twitter Site */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Twitter Site"
                    placeholder="@yourusername"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    error={!!errors.site}
                    helperText={errors.site || "The Twitter @username the card should be attributed to (optional)"}
                    InputProps={{
                      startAdornment: <TwitterIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Content Description"
                    placeholder="Discover stunning visuals and compelling content in this comprehensive guide that showcases the best practices..."
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={!!errors.description}
                    helperText={errors.description || `${description.length}/200 characters (optional but recommended)`}
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* Large Image Configuration Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Large Featured Image" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <PhotoLargeIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Large Image Settings
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Configure the prominent featured image that dominates the Twitter card
                  </Typography>
                </Grid>

                {/* Image URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Featured Image URL"
                    placeholder="https://example.com/large-featured-image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl || "2:1 aspect ratio recommended, 300x157px minimum, 4096x4096px maximum, Max 5MB (JPG, PNG, WEBP, GIF)"}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Image Alt Text */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image Alt Text"
                    placeholder="Beautiful landscape with mountains and sunset"
                    value={imageAltText}
                    onChange={(e) => setImageAltText(e.target.value)}
                    helperText="Descriptive text for accessibility (recommended)"
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Large Image Requirements Info */}
                <Grid item xs={12}>
                  <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      <LandscapeIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                      Twitter Large Image Requirements:
                    </Typography>
                    <Stack spacing={1}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckIcon color="success" fontSize="small" />
                        <Typography variant="body2">
                          Landscape aspect ratio (2:1) recommended
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckIcon color="success" fontSize="small" />
                        <Typography variant="body2">
                          Minimum size: 300×157 pixels
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckIcon color="success" fontSize="small" />
                        <Typography variant="body2">
                          Maximum size: 4096×4096 pixels
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckIcon color="success" fontSize="small" />
                        <Typography variant="body2">
                          File size: Less than 5MB
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckIcon color="success" fontSize="small" />
                        <Typography variant="body2">
                          Image dominates the card for maximum visual impact
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>

                {/* Benefits Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Benefits" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    Large Image Twitter Card Benefits
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Maximum visual impact with prominent featured image
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Higher engagement rates due to visual prominence
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Perfect for visual content, photography, and artwork
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Ideal for news articles, blog posts with hero images
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Dominates Twitter timeline for better visibility
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Generated Code */}
          <Paper elevation={3} sx={{ mt: 3, borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "success.main", color: "white", p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                GENERATED TWITTER CARD META TAGS
              </Typography>
              <CopyToClipboard text={metaTagsText} onCopy={handleCopy}>
                <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                  <IconButton sx={{ color: "white" }}>
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </Box>
            
            {!isFormValid && (
              <Alert severity="warning" sx={{ m: 0, borderRadius: 0 }}>
                Please fix the errors above to generate valid meta tags.
              </Alert>
            )}
            
            <Alert severity="info" sx={{ m: 0, borderRadius: 0 }}>
              Add these meta tags to the &lt;head&gt; section of your HTML page.
            </Alert>

            <Box sx={{ p: 3, bgcolor: "#1e1e1e", color: "#f8f8f2", maxHeight: 500, overflow: "auto" }}>
              <pre style={{ 
                fontFamily: "'Fira Code', monospace", 
                fontSize: "0.875rem", 
                lineHeight: "1.5",
                margin: 0,
                whiteSpace: "pre-wrap"
              }}>
                {metaTagsText || "<!-- No meta tags generated yet -->"}
              </pre>
            </Box>
          </Paper>
        </Grid>

        {/* Preview Panel */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            {/* Twitter Large Image Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "#1DA1F2", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  TWITTER LARGE IMAGE PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0, border: "1px solid #1DA1F2" }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ p: 2, pb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <TwitterIcon color="primary" />
                      <Typography variant="body2" color="primary">
                        {site || "@yourusername"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Large Featured Image */}
                  <Box sx={{ position: "relative" }}>
                    {imageUrl ? (
                      <Box sx={{ position: "relative" }}>
                        <img 
                          src={imageUrl} 
                          alt={imageAltText || "Large featured image"}
                          style={{ 
                            width: "100%", 
                            height: "200px", 
                            objectFit: "cover",
                            display: "block"
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <Box sx={{
                          position: "absolute",
                          bottom: 8,
                          right: 8,
                          bgcolor: "rgba(0,0,0,0.8)",
                          color: "white",
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: "0.75rem"
                        }}>
                          <LargeImageIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Large Image
                        </Box>
                      </Box>
                    ) : (
                      <Box 
                        sx={{ 
                          height: 200, 
                          bgcolor: "#f5f5f5", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: 1,
                          border: "2px dashed #ddd"
                        }}
                      >
                        <LargeImageIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                        <Typography color="text.secondary" variant="body2">
                          Large Featured Image
                        </Typography>
                        <Typography color="text.secondary" variant="caption">
                          2:1 aspect ratio recommended
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ p: 2, pt: 1 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                      {title || "Content Title"}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {description || "Content description will appear here..."}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Chip 
                        icon={<LargeImageIcon />}
                        label="Large Image Card" 
                        size="small" 
                        color="primary" 
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Paper>

            {/* Validation Status */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: isFormValid ? "success.main" : "error.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  VALIDATION STATUS
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={1}>
                  <Alert severity={title.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Title: {title.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={site.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Twitter Site: {site.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={description.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Description: {description.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={imageUrl.trim() ? "success" : "warning"} variant="outlined">
                    <Typography variant="caption">
                      Featured Image: {imageUrl.trim() ? "✓ Added" : "⚠ Highly recommended for large image cards"}
                    </Typography>
                  </Alert>

                  <Alert severity={imageAltText.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Alt Text: {imageAltText.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>

            {/* Twitter Large Image Card Info */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ABOUT LARGE IMAGE TWITTER CARDS
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      What it does:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Features a prominent large image that dominates the card
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Creates maximum visual impact in Twitter timeline
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Increases engagement with stunning visual content
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Perfect for showcasing photography and visual content
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Best Use Cases:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Photography portfolios and galleries
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • News articles with compelling hero images
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Blog posts with featured visuals
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Product showcases and announcements
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Visual storytelling and infographics
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Image Requirements:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Landscape images (2:1 ratio) work best
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Minimum size: 300×157 pixels
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Maximum size: 4096×4096 pixels
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • High-quality images recommended for impact
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Supported formats: JPG, PNG, WEBP, GIF
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryLargeImage;





// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const Summary = () => {
//   const [site, setSite] = useState("");
//   const [description, setDescription] = useState("");

//   const [title, setTitle] = useState("");

//   const [imageUrl, setImageUrl] = useState("");
//   const [imageAltText, setImageAltText] = useState("");

//   const generateMetaTags = () => {
//     let metaTags = "";
//     metaTags += `<meta name="twitter:card" content="summary">\n`;
//     metaTags += `<meta name="twitter:title" content="${title}">\n`;
//     if (site) metaTags += `<meta name="twitter:site" content="${site}">\n`;
//     if (description)
//       metaTags += `<meta name="twitter:description" content="${description}">\n`;

//     if (imageUrl)
//       metaTags += `<meta name="twitter:image" content="${imageUrl}">\n`;
//     if (imageAltText)
//       metaTags += `<meta name="twitter:image:alt" content="${imageAltText}">\n`;
//     return metaTags;
//   };
//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Summary with Large Image Twitter Card Generator
//       </h1>
//       <p className="text-white text-sm mt-2">
//         Title, description and a large featured image
//       </p>
//       <div className="flex mt-5">
//         <div className="w-full border">
//           <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//             OPTIONS
//           </h1>
//           <div className="py-4 px-5 bg-gray-800">
//             <form>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Site
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Site"
//                   value={site}
//                   onChange={(e) => setSite(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   The Twitter “@username” the card should be attributed to.
//                 </span>
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="message"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   id="message"
//                   rows="2"
//                   class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 ></textarea>
//                 <span className="text-white text-xs">Max 200 characters</span>
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Image URL
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Image Url"
//                   value={imageUrl}
//                   onChange={(e) => setImageUrl(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   Supports an aspect ratio of 2:1 with minimum dimensions of
//                   300x157 or maximum of 4096x4096 pixels. Image must be less
//                   then 5MB in size. JPG, PNG, WEBP and GIF formats are
//                   supported.
//                 </span>
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Image alt text
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Image Alt Text"
//                   value={imageAltText}
//                   onChange={(e) => setImageAltText(e.target.value)}
//                 />
//               </div>
//               {/* Other form fields go here */}
//             </form>
//           </div>
//         </div>
//         <div className="w-full border">
//           <div>
//             <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//               CODE
//             </h1>
//             <div className="text-white font-semibold py-2 pl-5 text-xs bg-slate-800">
//               <p className="bg">
//                 Copy this to the &lt;head&gt; section of your page.
//               </p>
//             </div>
//             <CopyToClipboard text={generateMetaTags()}>
//               <div className="ml-auto w-1/6 mt-2">
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                   Copy
//                 </button>
//               </div>
//             </CopyToClipboard>

//             <div className="space-y-2 mt-5 ml-4">
//               <pre className="text-white">{generateMetaTags()}</pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Summary;
