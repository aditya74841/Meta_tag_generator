

"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
  Article as SummaryIcon,
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
  PhotoSizeSelectActual as PhotoIcon,
  AspectRatio as AspectRatioIcon,
  Public as PublicIcon,
} from "@mui/icons-material";

const Summary = () => {
  const [site, setSite] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAltText, setImageAltText] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = useCallback(() => {
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
  }, [title, site, description, imageUrl, imageAltText]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const generateMetaTags = () => {
    const metaTags = [];
    
    metaTags.push('<meta name="twitter:card" content="summary" />');
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
          <SummaryIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Summary Twitter Card Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create Twitter Card meta tags for content summaries with images and descriptions.
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
                SUMMARY TWITTER CARD CONFIGURATION
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
                    placeholder="Amazing Article About Web Development"
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
                    placeholder="Discover the latest trends and best practices in modern web development with practical examples and expert insights..."
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

                {/* Image Configuration Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Image Configuration" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <PhotoIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Summary Image Settings
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Configure the image that appears with your content summary
                  </Typography>
                </Grid>

                {/* Image URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Summary Image URL"
                    placeholder="https://example.com/summary-image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl || "1:1 aspect ratio, 144x144px minimum, 4096x4096px maximum, Max 5MB (JPG, PNG, WEBP, GIF)"}
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
                    placeholder="Web development code on computer screen"
                    value={imageAltText}
                    onChange={(e) => setImageAltText(e.target.value)}
                    helperText="Descriptive text for accessibility (recommended)"
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Image Requirements Info */}
                <Grid item xs={12}>
                  <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      <AspectRatioIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                      Twitter Summary Image Requirements:
                    </Typography>
                    <Stack spacing={1}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckIcon color="success" fontSize="small" />
                        <Typography variant="body2">
                          Square aspect ratio (1:1) recommended
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CheckIcon color="success" fontSize="small" />
                        <Typography variant="body2">
                          Minimum size: 144×144 pixels
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
                    Twitter Summary Card Benefits
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Clean, professional content presentation on Twitter
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Higher click-through rates with rich previews
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Better social media engagement and visibility
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Perfect for articles, blog posts, and general content
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
            {/* Twitter Summary Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "#1DA1F2", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  TWITTER SUMMARY PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0, border: "1px solid #1DA1F2" }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <TwitterIcon color="primary" />
                    <Typography variant="body2" color="primary">
                      {site || "@yourusername"}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h6" gutterBottom>
                    {title || "Content Title"}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description || "Content description will appear here..."}
                  </Typography>

                  {/* Summary Image Preview */}
                  <Box sx={{ mt: 2 }}>
                    {imageUrl ? (
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 2,
                        p: 1,
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        bgcolor: "#fafafa"
                      }}>
                        <Image 
                          src={imageUrl} 
                          alt={imageAltText || "Summary image"}
                          width={80}
                          height={80}
                          style={{ 
                            width: "80px", 
                            height: "80px", 
                            objectFit: "cover",
                            borderRadius: "8px",
                            display: "block"
                          }}
                          unoptimized
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight="bold" gutterBottom>
                            {title || "Content Title"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {description ? 
                              `${description.substring(0, 60)}${description.length > 60 ? "..." : ""}` : 
                              "Content preview..."
                            }
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box 
                        sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: 2,
                          p: 2,
                          border: "1px solid #e0e0e0",
                          borderRadius: 1,
                          bgcolor: "#fafafa"
                        }}
                      >
                        <Box sx={{ 
                          width: 80, 
                          height: 80, 
                          bgcolor: "#e0e0e0", 
                          borderRadius: 1,
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center" 
                        }}>
                          <ImageIcon sx={{ fontSize: 32, color: "text.secondary" }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight="bold" gutterBottom>
                            {title || "Content Title"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Summary preview without image
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip 
                      icon={<SummaryIcon />}
                      label="Summary Card" 
                      size="small" 
                      color="primary" 
                    />
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

                  <Alert severity={imageUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Summary Image: {imageUrl.trim() ? "✓ Added" : "ℹ Optional but recommended"}
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

            {/* Twitter Summary Card Info */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ABOUT TWITTER SUMMARY CARDS
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      What it does:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Creates clean, professional content previews
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Shows title, description, and optional image
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Increases click-through rates from Twitter
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Perfect for articles, blog posts, and general content
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Best Use Cases:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Blog articles and news stories
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Product pages and landing pages
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Documentation and tutorials
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Company announcements and updates
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Image Requirements:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Square images (1:1 ratio) work best
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Minimum size: 144×144 pixels
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Maximum size: 4096×4096 pixels
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

export default Summary;


// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const Summary = () => {
//   const [site, setSite] = useState("");
//   const [description, setDescription] = useState("");

//   const [title, setTitle] = useState("");
//   const [playerUrl, setPlayerUrl] = useState("");
//   const [height, setHeight] = useState("");
//   const [width, setWidth] = useState("");
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
//         App Twitter Card Generator
//       </h1>
//       <p className="text-white text-sm mt-2">Audio and video media</p>
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
//                   Supports an aspect ratio of 1:1 with minimum dimensions of
//                   144x144 or maximum of 4096x4096 pixels. Image must be less
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
