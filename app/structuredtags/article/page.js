
"use client";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
  Divider,
  Alert,
  IconButton,
  Tooltip,
  Avatar,
  Stack,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Article as ArticleIcon,
  CheckCircle as CheckIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  Preview as PreviewIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";

const Article = () => {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day = d.getDate();
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  };

  const [type, setType] = useState("Article");
  const [url, setUrl] = useState("");
  const [headline, setHeadline] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [datePublished, setDatePublished] = useState(formatDate(Date.now()));
  const [dateModified, setDateModified] = useState(formatDate(Date.now()));
  const [authorType, setAuthorType] = useState("Person");
  const [publisherName, setPublisherName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [copied, setCopied] = useState(false);

  const jsonData = {
    "@context": "https://schema.org",
    "@type": type,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": authorType,
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    headline: headline,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified,
  };

  const jsonText = JSON.stringify(jsonData, null, 2);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Article":
        return <ArticleIcon />;
      case "BlogPosting":
        return <DescriptionIcon />;
      case "NewsArticle":
        return <ArticleIcon />;
      default:
        return <ArticleIcon />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Article":
        return "#2196F3";
      case "BlogPosting":
        return "#9C27B0";
      case "NewsArticle":
        return "#FF5722";
      default:
        return "#2196F3";
    }
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
          <ArticleIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Article Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Generate structured data for Article, BlogPosting, and NewsArticle content types.
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
            </Box>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Article Type */}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Content Type</InputLabel>
                    <Select
                      value={type}
                      label="Content Type"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <MenuItem value="Article">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <ArticleIcon fontSize="small" />
                          Article
                        </Box>
                      </MenuItem>
                      <MenuItem value="BlogPosting">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <DescriptionIcon fontSize="small" />
                          Blog Posting
                        </Box>
                      </MenuItem>
                      <MenuItem value="NewsArticle">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <ArticleIcon fontSize="small" />
                          News Article
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* URL */}
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Article URL"
                    placeholder="https://example.com/article"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    InputProps={{
                      startAdornment: <LinkIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                    helperText="The canonical URL of the article"
                  />
                </Grid>

                {/* Headline */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Headline"
                    placeholder="Enter your article headline"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    helperText={`${headline.length} characters (recommended: 30-60 for SEO)`}
                    inputProps={{ maxLength: 110 }}
                  />
                </Grid>

                {/* Image URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Featured Image URL"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                    helperText="Main image for the article (recommended: 1200x630px)"
                  />
                </Grid>

                {/* Dates */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date Published"
                    type="date"
                    value={datePublished}
                    onChange={(e) => setDatePublished(e.target.value)}
                    InputProps={{
                      startAdornment: <CalendarIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date Modified"
                    type="date"
                    value={dateModified}
                    onChange={(e) => setDateModified(e.target.value)}
                    InputProps={{
                      startAdornment: <CalendarIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Author Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }}>
                    <Chip label="Author Information" />
                  </Divider>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Author Type</InputLabel>
                    <Select
                      value={authorType}
                      label="Author Type"
                      onChange={(e) => setAuthorType(e.target.value)}
                    >
                      <MenuItem value="Person">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <PersonIcon fontSize="small" />
                          Person
                        </Box>
                      </MenuItem>
                      <MenuItem value="Organization">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <BusinessIcon fontSize="small" />
                          Organization
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Author Name"
                    placeholder={authorType === "Person" ? "John Doe" : "Company Name"}
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    InputProps={{
                      startAdornment: authorType === "Person" ? 
                        <PersonIcon sx={{ mr: 1, color: "action.active" }} /> :
                        <BusinessIcon sx={{ mr: 1, color: "action.active" }} />
                    }}
                  />
                </Grid>

                {/* Publisher Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }}>
                    <Chip label="Publisher Information" />
                  </Divider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Publisher Name"
                    placeholder="Your Website/Company Name"
                    value={publisherName}
                    onChange={(e) => setPublisherName(e.target.value)}
                    InputProps={{
                      startAdornment: <BusinessIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Publisher Logo URL"
                    placeholder="https://example.com/logo.png"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                    helperText="Square logo (recommended: 112x112px)"
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Generated Code */}
          <Paper elevation={3} sx={{ mt: 3, borderRadius: 2, overflow: "hidden" }}>
            <Box sx={{ bgcolor: "success.main", color: "white", p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                GENERATED JSON-LD CODE
              </Typography>
              <CopyToClipboard text={`<script type="application/ld+json">\n${jsonText}\n</script>`} onCopy={handleCopy}>
                <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                  <IconButton sx={{ color: "white" }}>
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </Box>
            
            <Alert severity="info" sx={{ m: 0, borderRadius: 0 }}>
              Add this JSON-LD script to the &lt;head&gt; section of your HTML page.
            </Alert>

            <Box sx={{ p: 3, bgcolor: "#1e1e1e", color: "#f8f8f2", maxHeight: 500, overflow: "auto" }}>
              <pre style={{ 
                fontFamily: "'Fira Code', monospace", 
                fontSize: "0.875rem", 
                lineHeight: "1.5",
                margin: 0,
                whiteSpace: "pre-wrap"
              }}>
                {`<script type="application/ld+json">
${jsonText}
</script>`}
              </pre>
            </Box>
          </Paper>
        </Grid>

        {/* Preview Panel */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            {/* Article Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  ARTICLE PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                {imageUrl ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt="Article featured image"
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
                    <ImageIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No image selected
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <Chip 
                      icon={getTypeIcon(type)} 
                      label={type} 
                      size="small" 
                      sx={{ bgcolor: getTypeColor(type), color: "white" }}
                    />
                  </Box>
                  
                  <Typography variant="h6" gutterBottom>
                    {headline || "Article Headline Goes Here"}
                  </Typography>
                  
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    {authorType === "Person" ? <PersonIcon fontSize="small" /> : <BusinessIcon fontSize="small" />}
                    <Typography variant="body2" color="text.secondary">
                      By {authorName || "Author Name"}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <BusinessIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Published by {publisherName || "Publisher Name"}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarIcon fontSize="small" />
                    <Typography variant="caption" color="text.secondary">
                      Published: {datePublished} | Modified: {dateModified}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Paper>

            {/* SEO Tips */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  SEO OPTIMIZATION TIPS
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={1}>
                  <Alert severity={headline.length >= 30 && headline.length <= 60 ? "success" : "warning"} variant="outlined">
                    <Typography variant="caption">
                      Headline: {headline.length >= 30 && headline.length <= 60 ? "✓ Optimal length" : "⚠ Recommended 30-60 chars"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={imageUrl ? "success" : "warning"} variant="outlined">
                    <Typography variant="caption">
                      Featured Image: {imageUrl ? "✓ Added" : "⚠ Recommended for better visibility"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={url ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Canonical URL: {url ? "✓ Added" : "✗ Required field"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={authorName && publisherName ? "success" : "warning"} variant="outlined">
                    <Typography variant="caption">
                      Author & Publisher: {authorName && publisherName ? "✓ Complete" : "⚠ Fill both fields"}
                    </Typography>
                  </Alert>
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

//   const [type, setType] = useState("Article");
//   const [url, setUrl] = useState("");
//   const [headline, setHeadline] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [datePublished, setDatePublished] = useState(formatDate(Date.now()));
//   const [dateModified, setDateModified] = useState(formatDate(Date.now()));
//   const [authorType, setAuthorType] = useState("Person");
//   const [publisherName, setPublisherName] = useState("");
//   const [logoUrl, setLogoUrl] = useState("");
//   const [authorName, setAuthorName] = useState("");
//   const jsonData = {
//     "@context": "http://schema.org/",
//     "@type": type,
//     mainEntityOfPage: {
//       "@type": "WebPage",
//       "@id": url,
//     },
//     author: {
//       "@type": authorType,
//       name: authorName,
//     },
//     publisher: {
//       "@type": "Organization",
//       name: publisherName,
//       logo: {
//         "@type": "ImageObject",
//         url: logoUrl,
//       },
//     },
//     headline: headline,
//     image: imageUrl,
//     datePublished: datePublished,
//     dateModified: dateModified,
//   };

//   const jsonText = JSON.stringify(jsonData, null, 2);

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Article Structured Data Generator
//       </h1>
//       <p className="text-white text-sm mt-2">
//         Article, BlogPosting and NewsArticle
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
//                   htmlFor="type"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Type
//                 </label>
//                 <select
//                   id="type"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={type}
//                   onChange={(e) => setType(e.target.value)}
//                 >
//                   <option value="">Select Type</option>
//                   <option value="Article">Article</option>
//                   <option value="BlogPosting">BlogPosting</option>
//                   <option value="NewsArticle">NewsArticle</option>
//                 </select>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Url
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Url"
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Headline
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Headline"
//                   value={headline}
//                   onChange={(e) => setHeadline(e.target.value)}
//                 />
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
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Date Published
//                 </label>
//                 <input
//                   type="date"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={datePublished}
//                   onChange={(e) => setDatePublished(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Date Modified
//                 </label>
//                 <input
//                   type="date"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={dateModified}
//                   onChange={(e) => setDateModified(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="countries"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Author
//                 </label>
//                 <select
//                   id="countries"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={authorType}
//                   onChange={(e) => setAuthorType(e.target.value)}
//                 >
//                   <option value="Organization">Organization</option>
//                   <option value="Person">Person</option>
//                 </select>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Author Name
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Publisher Name"
//                   value={authorName}
//                   onChange={(e) => setAuthorName(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Publisher Name
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Publisher Name"
//                   value={publisherName}
//                   onChange={(e) => setPublisherName(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Logo Url
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Paste Image Url"
//                   value={logoUrl}
//                   onChange={(e) => setLogoUrl(e.target.value)}
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
//               <CopyToClipboard
//                 text={`<script type="application/ld+json">\n${jsonText}\n</script>`}
//               >
//                 <div className="ml-auto w-1/6">
//                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                     Copy
//                   </button>
//                 </div>
//               </CopyToClipboard>
//             </div>
//             <div className="space-y-2 mt-5 ml-4">
//               <pre className="text-white">
//                 <pre className="text-white">
//                   {`<script type="application/ld+json">\n`}
//                   {jsonText}
//                   {`\n</script>`}
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
