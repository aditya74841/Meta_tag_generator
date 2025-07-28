// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const Video = () => {
//   const [websiteUrl, setWebsiteUrl] = useState("");
//   const [description, setDescription] = useState("");

//   const jsonData = {
//     "@context": "http://schema.org/",
//     "@type": "WebSite",
//     url: websiteUrl,
//     potentialAction: {
//       "@type": "SearchAction",
//       target: `${description}?q={search_term_string}`,
//       "query-input": "required name=search_term_string",
//     },
//   };

//   const jsonText = JSON.stringify(jsonData, null, 2);

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Website (Sitelinks) Structured Data Generator
//       </h1>
//       <p className="text-white text-sm mt-2">
//         Job information and social profiles
//       </p>
//       <div className="flex mt-5">
//         <div className="w-full border">
//           <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//             OPTIONS
//           </h1>
//           <div className="py-4 px-5 bg-gray-800">
//             <form>
//               <h1 className="text-white font-semibold mt-5">
//                 Website Details{" "}
//               </h1>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Website Url"
//                   value={websiteUrl}
//                   onChange={(e) => setWebsiteUrl(e.target.value)}
//                 />
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
//                   placeholder="Enter SiteSearch Url"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 ></textarea>
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
//               text={`<script type="application/ld+json">\n${jsonText}\n</script>`}
//             >
//               <div className="ml-auto w-1/6">
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                   Copy
//                 </button>
//               </div>
//             </CopyToClipboard>

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

// export default Video;


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
  Language as WebsiteIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Search as SearchIcon,
  Link as LinkIcon,
  Description as DescriptionIcon,
  Public as GlobalIcon,
  FindInPage as SitelinksIcon,
} from "@mui/icons-material";

const Website = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [websiteDescription, setWebsiteDescription] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!websiteUrl.trim()) newErrors.websiteUrl = "Website URL is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (websiteUrl && !urlPattern.test(websiteUrl)) {
      newErrors.websiteUrl = "Please enter a valid URL starting with http:// or https://";
    }
    if (searchUrl && !urlPattern.test(searchUrl)) {
      newErrors.searchUrl = "Please enter a valid search URL starting with http:// or https://";
    }

    // Search URL should contain search parameter placeholder
    if (searchUrl && !searchUrl.includes("{search_term_string}")) {
      newErrors.searchUrl = "Search URL should contain {search_term_string} placeholder";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [websiteUrl, searchUrl]);

  const generateJSON = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      ...(websiteName && { name: websiteName }),
      url: websiteUrl,
      ...(websiteDescription && { description: websiteDescription }),
      ...(searchUrl && {
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: searchUrl
          },
          "query-input": "required name=search_term_string",
        }
      }),
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && websiteUrl.trim();

  const getSearchExample = () => {
    if (!searchUrl) return "No search URL configured";
    return searchUrl.replace("{search_term_string}", "your search term");
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
          <SitelinksIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Website (Sitelinks) Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create structured data for your website to enable sitelinks and search functionality in search results.
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
                WEBSITE CONFIGURATION
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
                {/* Website Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <WebsiteIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Website Details
                  </Typography>
                </Grid>

                {/* Website URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Website URL *"
                    placeholder="https://example.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    error={!!errors.websiteUrl}
                    helperText={errors.websiteUrl || "The main URL of your website"}
                    InputProps={{
                      startAdornment: <WebsiteIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Website Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Website Name"
                    placeholder="My Awesome Website"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    helperText="The name of your website or organization"
                    InputProps={{
                      startAdornment: <GlobalIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Website Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Website Description"
                    placeholder="A comprehensive platform for learning web development..."
                    multiline
                    rows={3}
                    value={websiteDescription}
                    onChange={(e) => setWebsiteDescription(e.target.value)}
                    helperText={`${websiteDescription.length} characters (recommended: 50-160 for SEO)`}
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* Search Functionality Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Search Functionality" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <SearchIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Site Search Configuration
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Configure the search functionality to enable the search box in Google results
                  </Typography>
                </Grid>

                {/* Search URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Search URL Template"
                    placeholder="https://example.com/search?q={search_term_string}"
                    value={searchUrl}
                    onChange={(e) => setSearchUrl(e.target.value)}
                    error={!!errors.searchUrl}
                    helperText={errors.searchUrl || "URL template for search functionality. Use {search_term_string} as placeholder"}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Search URL Examples */}
                <Grid item xs={12}>
                  <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Search URL Examples:
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="caption" color="text.secondary">
                        • WordPress: https://yoursite.com/?s={`{search_term_string}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        • Custom: https://yoursite.com/search?query={`{search_term_string}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        • E-commerce: https://yourstore.com/products?search={`{search_term_string}`}
                      </Typography>
                    </Stack>
                    {searchUrl && (
                      <Box sx={{ mt: 2, p: 1, bgcolor: "#e3f2fd", borderRadius: 1 }}>
                        <Typography variant="caption" fontWeight="bold">
                          Preview: {getSearchExample()}
                        </Typography>
                      </Box>
                    )}
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
                    Benefits of Website Structured Data
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Enable sitelinks in Google search results
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Add search box functionality to search results
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Improve website visibility and click-through rates
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Better user experience with direct search access
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
            
            {!isFormValid && (
              <Alert severity="warning" sx={{ m: 0, borderRadius: 0 }}>
                Please fix the errors above to generate valid structured data.
              </Alert>
            )}
            
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
            {/* Website Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  SEARCH RESULT PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                <CardContent>
                  {/* Main Website Result */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ color: "#1a0dab", mb: 1 }}>
                      {websiteName || "Website Name"}
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ mb: 1 }}>
                      {websiteUrl || "https://example.com"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {websiteDescription || "Website description will appear here in search results..."}
                    </Typography>
                  </Box>

                  {/* Search Box Preview */}
                  {searchUrl && (
                    <Box sx={{ p: 2, bgcolor: "#f8f9fa", borderRadius: 1, mb: 2 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <SearchIcon fontSize="small" color="action" />
                        <TextField
                          size="small"
                          placeholder="Search this site..."
                          disabled
                          sx={{ flexGrow: 1 }}
                        />
                        <Button size="small" variant="outlined" disabled>
                          Search
                        </Button>
                      </Stack>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                        This search box may appear in Google results
                      </Typography>
                    </Box>
                  )}

                  {/* Sitelinks Preview */}
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Potential Sitelinks:
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#1a0dab", display: "block" }}>
                          About Us
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Learn more about our company
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#1a0dab", display: "block" }}>
                          Contact
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Get in touch with us
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#1a0dab", display: "block" }}>
                          Services
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Explore our services
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" sx={{ color: "#1a0dab", display: "block" }}>
                          Blog
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Read our latest articles
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: "block", fontStyle: "italic" }}>
                      * Sitelinks are automatically generated by Google based on your site structure
                    </Typography>
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
                  <Alert severity={websiteUrl.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Website URL: {websiteUrl.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={websiteName.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Website Name: {websiteName.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={websiteDescription.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Description: {websiteDescription.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={searchUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Search URL: {searchUrl.trim() ? "✓ Configured" : "ℹ Optional - enables search box"}
                    </Typography>
                  </Alert>

                  <Alert severity="info" variant="outlined">
                    <Typography variant="caption">
                      Schema Type: WebSite with SearchAction
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>

            {/* Implementation Tips */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  IMPLEMENTATION TIPS
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      For best results:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Place this code on your homepage
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Ensure your search functionality works properly
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Use descriptive website name and description
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Test your search URL template before publishing
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

export default Website;
