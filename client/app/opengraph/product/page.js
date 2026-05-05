"use client";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { currencies } from "@/app/constant";
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
  ShoppingCart as ProductIcon,
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
  AttachMoney as PriceIcon,
  Store as StoreIcon,
  LocalOffer as OfferIcon,
  ShoppingBag as BagIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";

const Product = () => {
  const [title, setTitle] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
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

    if (!title.trim()) newErrors.title = "Product title is required";
    if (!url.trim()) newErrors.url = "URL is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (url && !urlPattern.test(url)) {
      newErrors.url = "Please enter a valid URL starting with http:// or https://";
    }
    if (imageUrl && !urlPattern.test(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL starting with http:// or https://";
    }

    // Price validation
    if (price && (price < 0 || price > 999999)) {
      newErrors.price = "Price must be between 0 and 999,999";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [title, url, imageUrl, price]);

  const generateMetaTags = () => {
    const metaTags = [];
    
    metaTags.push('<meta property="og:type" content="product" />');
    if (title) metaTags.push(`<meta property="og:title" content="${title}" />`);
    if (url) metaTags.push(`<meta property="og:url" content="${url}" />`);
    if (imageUrl) metaTags.push(`<meta property="og:image" content="${imageUrl}" />`);
    if (description) metaTags.push(`<meta property="og:description" content="${description}" />`);
    if (productTitle) metaTags.push(`<meta property="product:plural_title" content="${productTitle}" />`);
    if (price) metaTags.push(`<meta property="product:price:amount" content="${price}" />`);
    if (currency && price) metaTags.push(`<meta property="product:price:currency" content="${currency}" />`);

    return metaTags.join('\n');
  };

  const metaTagsText = generateMetaTags();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && title.trim() && url.trim();

  const formatPrice = (price, currency) => {
    if (!price) return "No price set";
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    });
    return formatter.format(price);
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
          <ProductIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Product Open Graph Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create Open Graph meta tags for products to optimize social media sharing and e-commerce SEO.
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
                PRODUCT CONFIGURATION
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
                {/* Product Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <StoreIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Product Details
                  </Typography>
                </Grid>

                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Title *"
                    placeholder="iPhone 15 Pro Max 256GB"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!!errors.title}
                    helperText={errors.title || `${title.length} characters (recommended: 40-60 for social sharing)`}
                    InputProps={{
                      startAdornment: <TitleIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Plural Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Plural Title"
                    placeholder="iPhone 15 Pro Max 256GB Units"
                    value={productTitle}
                    onChange={(e) => setProductTitle(e.target.value)}
                    helperText="Title when quantity more than 1 is purchased (e.g., 'Phones' instead of 'Phone')"
                    InputProps={{
                      startAdornment: <CategoryIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product URL *"
                    placeholder="https://store.example.com/iphone-15-pro-max"
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
                    label="Product Image URL"
                    placeholder="https://example.com/product-image.jpg"
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
                    label="Product Description"
                    placeholder="The most advanced iPhone ever with titanium design, powerful A17 Pro chip, and revolutionary camera system..."
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

                {/* Pricing Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Pricing Information" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <PriceIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Product Pricing
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Set the price and currency for your product
                  </Typography>
                </Grid>

                {/* Price and Currency */}
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Price"
                    type="number"
                    placeholder="999.99"
                    inputProps={{ min: 0, max: 999999, step: 0.01 }}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    error={!!errors.price}
                    helperText={errors.price || "Enter the product price (0-999,999)"}
                    InputProps={{
                      startAdornment: <PriceIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={currency}
                      label="Currency"
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      {currencies.map((currencyOption) => (
                        <MenuItem key={currencyOption.value} value={currencyOption.value}>
                          {currencyOption.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Price Preview */}
                {price && (
                  <Grid item xs={12}>
                    <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Price Preview:
                      </Typography>
                      <Typography variant="h6" color="primary">
                        {formatPrice(price, currency)}
                      </Typography>
                    </Box>
                  </Grid>
                )}

                {/* Product Benefits */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Benefits" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    Product Open Graph Benefits
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Enhanced product sharing on social media
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Better e-commerce SEO and visibility
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Rich previews with product images and pricing
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Increased click-through rates and conversions
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
            {/* Product Preview */}
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
                    alt="Product preview"
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
                    <ProductIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No product image
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {title || "Product Name"}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description ? 
                      `${description.substring(0, 160)}${description.length > 160 ? "..." : ""}` : 
                      "Product description will appear here..."
                    }
                  </Typography>

                  <Typography variant="caption" color="primary" sx={{ textTransform: "uppercase" }}>
                    {getHostname(url)}
                  </Typography>

                  {price && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h5" color="primary" fontWeight="bold">
                        {formatPrice(price, currency)}
                      </Typography>
                    </Box>
                  )}

                  {productTitle && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Multiple units: {productTitle}
                      </Typography>
                    </Box>
                  )}

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Chip 
                      icon={<ProductIcon />}
                      label="Product" 
                      size="small" 
                      color="primary" 
                    />
                    {price && (
                      <Chip 
                        icon={<PriceIcon />}
                        label="Priced" 
                        size="small" 
                        color="success" 
                      />
                    )}
                  </Stack>
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
                      Product Title: {title.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={url.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      URL: {url.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={imageUrl.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Product Image: {imageUrl.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={description.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Description: {description.trim() ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={price ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Price: {price ? `✓ ${formatPrice(price, currency)}` : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={productTitle.trim() ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Plural Title: {productTitle.trim() ? "✓ Added" : "ℹ Optional"}
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>

            {/* Product Meta Tags Info */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ABOUT PRODUCT OPEN GRAPH
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Benefits:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Enhanced product sharing on social media
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Better e-commerce SEO and visibility
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Rich previews with pricing information
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Increased conversion rates
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Product-Specific Tags:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • product:plural_title - Multiple unit title
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • product:price:amount - Product price
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • product:price:currency - Price currency
                    </Typography>
                    <Typography variant="caption" display="block">
                      • og:type - product classification
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

export default Product;




// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { currencies, timezones } from "@/app/constant";
// const Product = () => {
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
//   const [producttitle, setProductTitle] = useState("");

//   const [url, setUrl] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [currency, setCurrency] = useState("USD");
//   const [isbn, setIsbn] = useState("");
//   const [author, setAuthor] = useState("");
//   const [dateReleased, setDateReleased] = useState("");
//   const [tags, setTags] = useState("");

//   const generateMetaTags = () => {
//     let metaTags = `<meta property="og:type" content="product">\n`;
//     metaTags += `<meta property="og:title" content="${title}" />\n`;
//     metaTags += `<meta property="og:url" content="${url}" />\n`;
//     metaTags += `<meta property="og:image" content="${imageUrl}" />\n`;
//     metaTags += `<meta property="og:description" content="${description}" />\n`;
//     metaTags += `<meta property="product:plural_title" content="${producttitle}" />\n`;

//     if (price)
//       metaTags += `<meta property="music:release_date" content="${price}" />\n`;

//     if (currency && price)
//       metaTags += `<meta property="music:release_date" content="${currency}" />\n`;

//     return metaTags;
//   };

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Book Open Graph Generator
//       </h1>

//       <div className=" w-full flex mt-5">
//         <div className=" w-1/2 border">
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
//                   Plural Title
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Title"
//                   value={producttitle}
//                   onChange={(e) => setProductTitle(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   Title of the product when a quantity more than 1 is purchased.
//                 </span>
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
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Title"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <label
//                   htmlFor="type"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Currency
//                 </label>
//                 <select
//                   id="type"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={currency}
//                   onChange={(e) => setCurrency(e.target.value)}
//                 >
//                   {currencies.map((currency) => (
//                     <option key={currency.value} value={currency.value}>
//                       {currency.label}
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

//             <div className="space-y-2 mt-5 ">
//               <pre className="text-white ml-5">{generateMetaTags()}</pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;
