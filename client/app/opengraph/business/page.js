"use client";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { countries } from "@/app/constant";
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
  Business as BusinessIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Description as DescriptionIcon,
  LocationOn as LocationIcon,
  Title as TitleIcon,
  Share as ShareIcon,
  Store as StoreIcon,
  Public as PublicIcon,
  Home as AddressIcon,
  LocationCity as CityIcon,
  Map as StateIcon,
  LocalPostOffice as ZipIcon,
} from "@mui/icons-material";

const Business = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
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

    if (!title.trim()) newErrors.title = "Business title is required";
    if (!url.trim()) newErrors.url = "URL is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (url && !urlPattern.test(url)) {
      newErrors.url = "Please enter a valid URL starting with http:// or https://";
    }
    if (imageUrl && !urlPattern.test(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL starting with http:// or https://";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [title, url, imageUrl]);

  const generateMetaTags = () => {
    const metaTags = [];
    
    metaTags.push('<meta property="og:type" content="business.business" />');
    if (title) metaTags.push(`<meta property="og:title" content="${title}" />`);
    if (url) metaTags.push(`<meta property="og:url" content="${url}" />`);
    if (imageUrl) metaTags.push(`<meta property="og:image" content="${imageUrl}" />`);
    if (description) metaTags.push(`<meta property="og:description" content="${description}" />`);
    if (streetAddress) metaTags.push(`<meta property="business:contact_data:street_address" content="${streetAddress}" />`);
    if (city) metaTags.push(`<meta property="business:contact_data:locality" content="${city}" />`);
    if (state) metaTags.push(`<meta property="business:contact_data:region" content="${state}" />`);
    if (zip) metaTags.push(`<meta property="business:contact_data:postal_code" content="${zip}" />`);
    if (country) metaTags.push(`<meta property="business:contact_data:country_name" content="${country}" />`);

    return metaTags.join('\n');
  };

  const metaTagsText = generateMetaTags();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && title.trim() && url.trim();

  const getCompleteAddress = () => {
    const addressParts = [streetAddress, city, state, zip, country].filter(part => part.trim());
    return addressParts.length > 0 ? addressParts.join(", ") : "No address provided";
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
          <BusinessIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Business Open Graph Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create Open Graph meta tags for businesses to optimize social media sharing and local SEO.
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
                BUSINESS CONFIGURATION
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
                {/* Business Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <StoreIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Business Details
                  </Typography>
                </Grid>

                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Business Title *"
                    placeholder="Joe's Pizza Restaurant"
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
                    label="Business URL *"
                    placeholder="https://joespizza.com"
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
                    label="Business Image URL"
                    placeholder="https://example.com/business-image.jpg"
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
                    label="Business Description"
                    placeholder="Authentic Italian pizza made with fresh ingredients, serving the community since 1985..."
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

                {/* Address Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Business Address" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <LocationIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Location Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Provide your business address for better local SEO and social sharing
                  </Typography>
                </Grid>

                {/* Street Address */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    placeholder="123 Main Street, Suite 100"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    helperText="Full street address including suite/unit number"
                    InputProps={{
                      startAdornment: <AddressIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* City and State */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    InputProps={{
                      startAdornment: <CityIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State/Province/Region"
                    placeholder="New York"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    InputProps={{
                      startAdornment: <StateIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* ZIP and Country */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ZIP/Postal Code"
                    placeholder="10001"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    InputProps={{
                      startAdornment: <ZipIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      value={country}
                      label="Country"
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <MenuItem value="">Select Country</MenuItem>
                      {countries.map((countryOption) => (
                        <MenuItem key={countryOption.value} value={countryOption.value}>
                          {countryOption.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Address Preview */}
                {(streetAddress || city || state || zip || country) && (
                  <Grid item xs={12}>
                    <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Address Preview:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {getCompleteAddress()}
                      </Typography>
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
            {/* Business Preview */}
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
                    alt="Business preview"
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
                    <BusinessIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No business image
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {title || "Business Name"}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description ? 
                      `${description.substring(0, 160)}${description.length > 160 ? "..." : ""}` : 
                      "Business description will appear here..."
                    }
                  </Typography>

                  <Typography variant="caption" color="primary" sx={{ textTransform: "uppercase" }}>
                    {getHostname(url)}
                  </Typography>

                  {(streetAddress || city || state) && (
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mt: 2 }}>
                      <LocationIcon fontSize="small" sx={{ mt: 0.5 }} />
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          Location:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getCompleteAddress()}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  <Chip 
                    icon={<BusinessIcon />}
                    label="Business" 
                    size="small" 
                    color="primary" 
                    sx={{ mt: 2 }}
                  />
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
                      Business Title: {title.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={url.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      URL: {url.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={imageUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Business Image: {imageUrl.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={description.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Description: {description.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={(streetAddress || city || state) ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Address: {(streetAddress || city || state) ? "✓ Added" : "ℹ Optional but good for local SEO"}
                    </Typography>
                  </Alert>

                  <Alert severity={country ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Country: {country ? "✓ Selected" : "ℹ Optional"}
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>

            {/* Business Meta Tags Info */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ABOUT BUSINESS OPEN GRAPH
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Benefits:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Enhanced business sharing on social media
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Better local SEO visibility
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Rich previews with business information
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Improved local discovery
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Business-Specific Tags:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • business:contact_data:street_address
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • business:contact_data:locality (city)
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • business:contact_data:region (state)
                    </Typography>
                    <Typography variant="caption" display="block">
                      • business:contact_data:country_name
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

export default Business;


// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { countries, currencies, timezones } from "@/app/constant";
// const Business = () => {
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
//   const [streetAddress, setStreetAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [zip, setZip] = useState("");

//   // This is used to conditional show
//   // const generateMetaTags = () => {
//   //   let metaTags = `<meta property="og:type" content="business.business">\n`;
//   //   metaTags += title ? `<meta property="og:title" content="${title}">\n` : '';
//   //   metaTags += url ? `<meta property="og:url" content="${url}">\n` : '';
//   //   metaTags += imageUrl ? `<meta property="og:image" content="${imageUrl}">\n` : '';
//   //   metaTags += description ? `<meta property="og:description" content="${description}">\n` : '';
//   //   metaTags += streetAddress ? `<meta property="business:contact_data:street_address" content="${streetAddress}">\n` : '';
//   //   metaTags += city ? `<meta property="business:contact_data:locality" content="${city}">\n` : '';
//   //   metaTags += state ? `<meta property="business:contact_data:region" content="${state}">\n` : '';
//   //   metaTags += zip ? `<meta property="business:contact_data:postal_code" content="${zip}">\n` : '';
//   //   metaTags += country ? `<meta property="business:contact_data:country_name" content="${country}">\n` : '';
//   //   return metaTags;
//   // }

//   const generateMetaTags = () => {
//     let metaTags = `<meta property="og:type" content="business.business">\n`;
//     metaTags += `<meta property="og:title" content="${title}">\n`;
//     metaTags += `<meta property="og:url" content="${url}">\n`;
//     metaTags += `<meta property="og:image" content="${imageUrl}">\n`;

//     metaTags += `<meta property="og:description" content="${description}">\n`;
//     metaTags += `<meta property="business:contact_data:street_address" content="${streetAddress}">\n`;

//     metaTags += `<meta property="business:contact_data:locality" content="${city}">\n`;

//     metaTags += `<meta property="business:contact_data:region" content="${state}">\n`;

//     metaTags += `<meta property="business:contact_data:postal_code" content="${zip}">\n`;

//     metaTags += `<meta property="business:contact_data:country_name" content="${country}">\n`;

//     return metaTags;
//   };
//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Book Open Graph Generator
//       </h1>

//       <div className="w-full flex mt-5">
//         <div className="w-1/2 border">
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

//               <h1 className="text-white font-semibold mt-5">Address </h1>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter street address"
//                   value={streetAddress}
//                   onChange={(e) => setStreetAddress(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter city"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter state/province/region"
//                   value={state}
//                   onChange={(e) => setState(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter zip/postal/code"
//                   value={zip}
//                   onChange={(e) => setZip(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <select
//                   id="type"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={country}
//                   onChange={(e) => setCountry(e.target.value)}
//                 >
//                   <option>Select Country</option>
//                   {countries.map((country) => (
//                     <option key={country.value} value={country.value}>
//                       {country.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="w-1/2 border">
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

// export default Business;
