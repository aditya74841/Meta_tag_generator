"use client";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { timezones } from "@/app/constant";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  Article as ArticleIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  DateRange as DateIcon,
  Schedule as TimeIcon,
  Category as SectionIcon,
  LocalOffer as TagIcon,
  Title as TitleIcon,
  Share as ShareIcon,
  Public as PublicIcon,
} from "@mui/icons-material";

const Article = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [timeZone, setTimeZone] = useState("UTC");
  const [datePublished, setDatePublished] = useState("");
  const [dateModified, setDateModified] = useState("");
  const [section, setSection] = useState("");
  const [tags, setTags] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  // Helper function to safely extract hostname
  const getHostname = (url) => {
    if (!url) return "example.com";
    
    // Simple URL validation
    const urlPattern = /^https?:\/\/.+\..+/;
    if (!urlPattern.test(url)) {
      return "Enter valid URL";
    }
    
    try {
      return new URL(url).hostname;
    } catch (error) {
      return "Invalid URL format";
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!url.trim()) newErrors.url = "URL is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (url && !urlPattern.test(url)) {
      newErrors.url = "Please enter a valid URL starting with http:// or https://";
    }
    if (imageUrl && !urlPattern.test(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL starting with http:// or https://";
    }

    // Date validation
    if (datePublished && dateModified && new Date(datePublished) > new Date(dateModified)) {
      newErrors.dateModified = "Modified date cannot be earlier than published date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [title, url, imageUrl, datePublished, dateModified]);

  const generateMetaTags = () => {
    const metaTags = [];
    
    metaTags.push('<meta property="og:type" content="article" />');
    if (title) metaTags.push(`<meta property="og:title" content="${title}" />`);
    if (url) metaTags.push(`<meta property="og:url" content="${url}" />`);
    if (imageUrl) metaTags.push(`<meta property="og:image" content="${imageUrl}" />`);
    if (description) metaTags.push(`<meta property="og:description" content="${description}" />`);
    if (author) metaTags.push(`<meta property="article:author" content="${author}" />`);
    if (datePublished) metaTags.push(`<meta property="article:published_time" content="${datePublished}" />`);
    if (dateModified) metaTags.push(`<meta property="article:modified_time" content="${dateModified}" />`);
    if (section) metaTags.push(`<meta property="article:section" content="${section}" />`);
    if (tags) metaTags.push(`<meta property="article:tag" content="${tags}" />`);

    return metaTags.join('\n');
  };

  const metaTagsText = generateMetaTags();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && title.trim() && url.trim();

  const getTagsArray = () => {
    return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleString();
  };

  return (
    <Box sx={{ p: 3, background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
      {/* Header Section */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ShareIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Article Open Graph Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create Open Graph meta tags for articles to optimize social media sharing and SEO.
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
                ARTICLE CONFIGURATION
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
                {/* Article Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <ArticleIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Article Details
                  </Typography>
                </Grid>

                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Article Title *"
                    placeholder="How to Build a Modern Web Application"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!!errors.title}
                    helperText={errors.title || `${title.length} characters (recommended: 40-60 for social sharing)`}
                    InputProps={{
                      startAdornment: <TitleIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Article URL *"
                    placeholder="https://example.com/my-article"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    error={!!errors.url}
                    helperText={errors.url || "Must include http:// or https://"}
                    InputProps={{
                      startAdornment: <LinkIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>
                
                {/* Image URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Featured Image URL"
                    placeholder="https://example.com/featured-image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl || "Recommended size: 1200x627 pixels for optimal social sharing"}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Article Description"
                    placeholder="A comprehensive guide on building modern web applications with the latest technologies..."
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    helperText={`${description.length} characters (recommended: 150-160 for SEO)`}
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* Author */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Author"
                    placeholder="John Doe"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    helperText="Article author name"
                    InputProps={{
                      startAdornment: <PersonIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Section */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Section"
                    placeholder="Technology"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    helperText="High-level category (e.g., Technology, Sports)"
                    InputProps={{
                      startAdornment: <SectionIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Tags */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tags"
                    placeholder="web development, javascript, react, tutorial"
                    multiline
                    rows={2}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    helperText="Comma-separated list of tags associated with this article"
                    InputProps={{
                      startAdornment: <TagIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* DateTime Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Publication Details" />
                  </Divider>
                </Grid>

                {/* Timezone */}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={timeZone}
                      label="Timezone"
                      onChange={(e) => setTimeZone(e.target.value)}
                    >
                      {timezones.map((timezone) => (
                        <MenuItem key={timezone.value} value={timezone.value}>
                          {timezone.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Published Date */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Date Published"
                    type="datetime-local"
                    value={datePublished}
                    onChange={(e) => setDatePublished(e.target.value)}
                    error={!!errors.datePublished}
                    helperText={errors.datePublished || "24-hour format"}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <DateIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Modified Date */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Date Modified"
                    type="datetime-local"
                    value={dateModified}
                    onChange={(e) => setDateModified(e.target.value)}
                    error={!!errors.dateModified}
                    helperText={errors.dateModified || "24-hour format"}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <TimeIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Tags Preview */}
                {tags && getTagsArray().length > 0 && (
                  <Grid item xs={12}>
                    <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Tags Preview:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {getTagsArray().map((tag, index) => (
                          <Chip 
                            key={index} 
                            label={tag} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Paper>

          {/* Generated Code */}
          <Paper elevation={3} sx={{ mt: 3, borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "success.main", color: "white", p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                GENERATED OPEN GRAPH META TAGS
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
            {/* Social Media Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  SOCIAL MEDIA PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                {imageUrl ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt="Article preview"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <Box 
                    sx={{ 
                      height: 200, 
                      bgcolor: "#f5f5f5", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 1
                    }}
                  >
                    <ArticleIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No featured image
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {title || "Article Title"}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description ? 
                      `${description.substring(0, 160)}${description.length > 160 ? "..." : ""}` : 
                      "Article description will appear here..."
                    }
                  </Typography>

                  {/* FIXED: Safe hostname extraction */}
                  <Typography variant="caption" color="primary" sx={{ textTransform: "uppercase" }}>
                    {getHostname(url)}
                  </Typography>

                  {author && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                      <PersonIcon fontSize="small" />
                      <Typography variant="body2">
                        By {author}
                      </Typography>
                    </Box>
                  )}

                  {section && (
                    <Chip 
                      label={section} 
                      size="small" 
                      color="secondary" 
                      sx={{ mt: 1 }}
                    />
                  )}
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
                  
                  <Alert severity={url.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      URL: {url.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={imageUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Featured Image: {imageUrl.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={description.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Description: {description.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={author.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Author: {author.trim() ? "✓ Added" : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={datePublished ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Published Date: {datePublished ? "✓ Set" : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert severity={tags.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Tags: {tags.trim() ? `✓ ${getTagsArray().length} tag${getTagsArray().length !== 1 ? 's' : ''}` : "ℹ Optional"}
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>

            {/* Meta Tags Info */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ABOUT OPEN GRAPH
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Benefits:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Better social media sharing appearance
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Improved SEO and search visibility
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Enhanced user engagement
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Consistent branding across platforms
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Best Practices:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Use 1200x627px images for best results
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Keep titles under 60 characters
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Write compelling descriptions (150-160 chars)
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

export default Article;


// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { currencies, timezones } from "@/app/constant";
// const Article = () => {
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     let month = d.getMonth() + 1;
//     if (month < 10) month = `0${month}`;
//     let day = d.getDate();
//     if (day < 10) day = `0${day}`;
//     return `${year}-${month}-${day}`;
//   };

//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [description, setDescription] = useState("");
//   const [author, setAuthor] = useState("");
//   const [timeZone, setTimeZone] = useState("");
//   const [datePublished, setDatePublished] = useState("");
//   const [dateModified, setDateModified] = useState("");
//   const [section, setSection] = useState("");
//   const [tags, setTags] = useState("");

// //   const generateMetaData = () => {
// //     return (
// //       <>
// //         <meta property="og:type" content="article" />
// //         <meta property="og:title" content={title} />
// //         <meta property="og:url" content={url} />
// //         <meta property="og:image" content={imageUrl} />
// //         <meta property="og:description" content={description} />
// //         <meta property="article:author" content={author} />
// //         <meta property="article:published_time" content={datePublished} />
// //         <meta property="article:modified_time" content={dateModified} />
// //         <meta property="article:section" content={section} />
// //         <meta property="article:tag" content={tags} />
// //       </>
// //     );
// //   };

// const metaOGType = `<meta property="og:type" content="article" />`;
// const metaOGTitle = `<meta property="og:title" content="${title}" />`;
// const metaOGUrl = `<meta property="og:url" content="${url}" />`;
// const metaOGImage = `<meta property="og:image" content="${imageUrl}" />`;
// const metaOGDescription = `<meta property="og:description" content="${description}" />`;
// const metaArticleAuthor = `<meta property="article:author" content="${author}" />`;
// const metaArticlePublishedTime = `<meta property="article:published_time" content="${datePublished}" />`;
// const metaArticleModifiedTime = `<meta property="article:modified_time" content="${dateModified}" />`;
// const metaArticleSection = `<meta property="article:section" content="${section}" />`;
// const metaArticleTag = `<meta property="article:tag" content="${tags}" />`;





//   //   const jsonText = JSON.stringify(generateMetaData(), null, 2);

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Article Open Graph Generator
//       </h1>

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
//                   URL
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Url"
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   Must include http(s)://.
//                 </span>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Image Url
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Paste Image Url"
//                   value={imageUrl}
//                   onChange={(e) => setImageUrl(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   Must include http(s)://. The recommended size is 1200x627
//                   pixels.
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
//                   placeholder="Enter Url"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 ></textarea>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Author
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Title"
//                   value={author}
//                   onChange={(e) => setAuthor(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <label
//                   htmlFor="type"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Time Zone
//                 </label>
//                 <select
//                   id="type"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={timeZone}
//                   onChange={(e) => setTimeZone(e.target.value)}
//                 >
//                   {timezones.map((timizone) => (
//                     <option key={timizone.value} value={timizone.value}>
//                       {timizone.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Date Published
//                 </label>
//                 <input
//                   type="datetime-local"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={datePublished}
//                   onChange={(e) => setDatePublished(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   Time must be in 24-hour format.
//                 </span>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Date Modified
//                 </label>
//                 <input
//                   type="datetime-local"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={dateModified}
//                   onChange={(e) => setDateModified(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   Time must be in 24-hour format.
//                 </span>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Section
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Url"
//                   value={section}
//                   onChange={(e) => setSection(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   A high-level section name. For example, “Technology.”
//                 </span>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="message"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Tags
//                 </label>
//                 <textarea
//                   id="message"
//                   rows="2"
//                   class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Url"
//                   value={tags}
//                   onChange={(e) => setTags(e.target.value)}
//                 ></textarea>
//                 <span className="text-white text-xs">
//                   Comma separated list of tags words associated with this
//                   article.
//                 </span>
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
//             <CopyToClipboard
//               text={`<meta property="og:type" content="article">
//               <meta property="og:title" content=${title} />
//               <meta property="og:url" content=${url} />
//               <meta property="og:image" content=${imageUrl} />
//               <meta property="og:description" content=${description} />
//               <meta property="article:author" content=${author} />
//               <meta property="article:published_time" content=${datePublished} />
//               <meta property="article:modified_time" content=${dateModified} />
//               <meta property="article:section" content=${section} />
//               <meta property="article:tag" content=${tags} />`}
//             >
//               <div className="ml-auto w-1/6 mt-2">
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                   Copy
//                 </button>
//               </div>
//             </CopyToClipboard>

//             <div className="space-y-2 mt-5 ml-4">
//               <pre className="text-white">
//                 <pre className="text-white">
//                   {`<meta property="og:type" content="article">
// <meta property="og:title" content=${title} />
// <meta property="og:url" content=${url} />
// <meta property="og:image" content=${imageUrl} />
// <meta property="og:description" content=${description} />
// <meta property="article:author" content=${author} />
// <meta property="article:published_time" content=${datePublished} />
// <meta property="article:modified_time" content=${dateModified} />
// <meta property="article:section" content=${section} />
// <meta property="article:tag" content=${tags} />`}
//                 </pre>
//               </pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Article;
