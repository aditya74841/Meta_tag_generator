"use client";
import React, { useState, useEffect, useCallback } from "react";
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
  Chip,
  Alert,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  FormControlLabel,
  Checkbox,
  Collapse,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  PhoneAndroid as AndroidIcon,
  PhoneIphone as IPhoneIcon,
  Tablet as IPadIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Link as LinkIcon,
  Description as DescriptionIcon,
  Title as TitleIcon,
  Share as ShareIcon,
  Apps as AppIcon,
  Twitter as TwitterIcon,
  GetApp as DownloadIcon,
  Store as StoreIcon,
} from "@mui/icons-material";

const App = () => {
  const [site, setSite] = useState("");
  const [description, setDescription] = useState("");
  const [isIncludeAndroid, setIsIncludeAndroid] = useState(false);
  const [isIncludeiPhone, setIsIncludeiPhone] = useState(false);
  const [isIncludeiPad, setIsIncludeiPad] = useState(false);
  
  const [androidName, setAndroidName] = useState("");
  const [androidURL, setAndroidURL] = useState("");
  const [androidId, setAndroidId] = useState("");
  
  const [iPhoneName, setIPhoneName] = useState("");
  const [iPhoneURL, setIPhoneURL] = useState("");
  const [iPhoneId, setIPhoneId] = useState("");
  
  const [ipadName, setIpadName] = useState("");
  const [ipadURL, setIpadURL] = useState("");
  const [ipadId, setIpadId] = useState("");
  
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Basic validation
    if (site && !site.startsWith("@")) {
      newErrors.site = "Twitter handle should start with @";
    }
    
    if (description && description.length > 200) {
      newErrors.description = "Description must be 200 characters or less";
    }

    // Android validation
    if (isIncludeAndroid) {
      if (!androidName.trim()) newErrors.androidName = "Android app name is required";
      if (!androidURL.trim()) newErrors.androidURL = "Android URL is required";
      if (!androidId.trim()) newErrors.androidId = "Android ID is required";
      if (androidURL && !androidURL.includes("://")) {
        newErrors.androidURL = "URL must include '://' after scheme name";
      }
    }

    // iPhone validation
    if (isIncludeiPhone) {
      if (!iPhoneName.trim()) newErrors.iPhoneName = "iPhone app name is required";
      if (!iPhoneURL.trim()) newErrors.iPhoneURL = "iPhone URL is required";
      if (!iPhoneId.trim()) newErrors.iPhoneId = "iPhone ID is required";
      if (iPhoneURL && !iPhoneURL.includes("://")) {
        newErrors.iPhoneURL = "URL must include '://' after scheme name";
      }
    }

    // iPad validation
    if (isIncludeiPad) {
      if (!ipadName.trim()) newErrors.ipadName = "iPad app name is required";
      if (!ipadURL.trim()) newErrors.ipadURL = "iPad URL is required";
      if (!ipadId.trim()) newErrors.ipadId = "iPad ID is required";
      if (ipadURL && !ipadURL.includes("://")) {
        newErrors.ipadURL = "URL must include '://' after scheme name";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [site, description, isIncludeAndroid, isIncludeiPhone, isIncludeiPad, 
      androidName, androidURL, androidId, iPhoneName, iPhoneURL, iPhoneId, 
      ipadName, ipadURL, ipadId]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const generateMetaTags = () => {
    const metaTags = [];
    
    metaTags.push('<meta name="twitter:card" content="app" />');
    if (site) metaTags.push(`<meta name="twitter:site" content="${site}" />`);
    if (description) metaTags.push(`<meta name="twitter:description" content="${description}" />`);

    if (isIncludeAndroid && androidName && androidURL && androidId) {
      metaTags.push(`<meta name="twitter:app:name:googleplay" content="${androidName}" />`);
      metaTags.push(`<meta name="twitter:app:url:googleplay" content="${androidURL}" />`);
      metaTags.push(`<meta name="twitter:app:id:googleplay" content="${androidId}" />`);
    }

    if (isIncludeiPhone && iPhoneName && iPhoneURL && iPhoneId) {
      metaTags.push(`<meta name="twitter:app:name:iphone" content="${iPhoneName}" />`);
      metaTags.push(`<meta name="twitter:app:url:iphone" content="${iPhoneURL}" />`);
      metaTags.push(`<meta name="twitter:app:id:iphone" content="${iPhoneId}" />`);
    }

    if (isIncludeiPad && ipadName && ipadURL && ipadId) {
      metaTags.push(`<meta name="twitter:app:name:ipad" content="${ipadName}" />`);
      metaTags.push(`<meta name="twitter:app:url:ipad" content="${ipadURL}" />`);
      metaTags.push(`<meta name="twitter:app:id:ipad" content="${ipadId}" />`);
    }

    return metaTags.join('\n');
  };

  const metaTagsText = generateMetaTags();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0;

  const getSelectedPlatformsCount = () => {
    return [isIncludeAndroid, isIncludeiPhone, isIncludeiPad].filter(Boolean).length;
  };

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
          <TwitterIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              App Twitter Card Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create Twitter Card meta tags for mobile apps to drive direct downloads from tweets.
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
                APP TWITTER CARD CONFIGURATION
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
                    <AppIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Basic Information
                  </Typography>
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
                    helperText={errors.site || "The Twitter @username the card should be attributed to"}
                    InputProps={{
                      startAdornment: <TwitterIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="App Description"
                    placeholder="Download our amazing mobile app for the best user experience..."
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={!!errors.description}
                    helperText={errors.description || `${description.length}/200 characters`}
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* Platform Selection */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label={`Platform Selection (${getSelectedPlatformsCount()} selected)`} />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <StoreIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Select App Platforms
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {"Choose which platforms your app is available on"}
                  </Typography>

                  <Stack spacing={2}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={isIncludeAndroid} 
                          onChange={(e) => setIsIncludeAndroid(e.target.checked)}
                          icon={<AndroidIcon />}
                          checkedIcon={<AndroidIcon color="success" />}
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <AndroidIcon color="success" />
                          <Typography>Android (Google Play Store)</Typography>
                        </Box>
                      }
                    />

                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={isIncludeiPhone} 
                          onChange={(e) => setIsIncludeiPhone(e.target.checked)}
                          icon={<IPhoneIcon />}
                          checkedIcon={<IPhoneIcon color="primary" />}
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <IPhoneIcon color="primary" />
                          <Typography>iPhone (App Store)</Typography>
                        </Box>
                      }
                    />

                    <FormControlLabel
                      control={
                        <Checkbox 
                          checked={isIncludeiPad} 
                          onChange={(e) => setIsIncludeiPad(e.target.checked)}
                          icon={<IPadIcon />}
                          checkedIcon={<IPadIcon color="secondary" />}
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <IPadIcon color="secondary" />
                          <Typography>iPad (App Store)</Typography>
                        </Box>
                      }
                    />
                  </Stack>
                </Grid>

                {/* Android Section */}
                <Grid item xs={12}>
                  <Collapse in={isIncludeAndroid}>
                    <Card variant="outlined" sx={{ mt: 2, border: "2px solid #4CAF50" }}>
                      <CardContent>
                        <Typography variant="h6" color="success.main" fontWeight="bold" gutterBottom>
                          <AndroidIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                          Android App Details
                        </Typography>
                        
                        <Stack spacing={2} sx={{ mt: 2 }}>
                          <TextField
                            fullWidth
                            label="App Name *"
                            placeholder="My Awesome App"
                            value={androidName}
                            onChange={(e) => setAndroidName(e.target.value)}
                            error={!!errors.androidName}
                            helperText={errors.androidName || "Your app name as it appears on Google Play"}
                            size="small"
                          />
                          
                          <TextField
                            fullWidth
                            label="Custom URL Scheme *"
                            placeholder="myapp://open"
                            value={androidURL}
                            onChange={(e) => setAndroidURL(e.target.value)}
                            error={!!errors.androidURL}
                            helperText={errors.androidURL || "Your app's custom URL scheme (must include '://')"} 
                            size="small"
                          />
                          
                          <TextField
                            fullWidth
                            label="Package Name *"
                            placeholder="com.example.myapp"
                            value={androidId}
                            onChange={(e) => setAndroidId(e.target.value)}
                            error={!!errors.androidId}
                            helperText={errors.androidId || "Your app's package name from Google Play"}
                            size="small"
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Collapse>
                </Grid>

                {/* iPhone Section */}
                <Grid item xs={12}>
                  <Collapse in={isIncludeiPhone}>
                    <Card variant="outlined" sx={{ mt: 2, border: "2px solid #2196F3" }}>
                      <CardContent>
                        <Typography variant="h6" color="primary.main" fontWeight="bold" gutterBottom>
                          <IPhoneIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                          iPhone App Details
                        </Typography>
                        
                        <Stack spacing={2} sx={{ mt: 2 }}>
                          <TextField
                            fullWidth
                            label="App Name *"
                            placeholder="My Awesome App"
                            value={iPhoneName}
                            onChange={(e) => setIPhoneName(e.target.value)}
                            error={!!errors.iPhoneName}
                            helperText={errors.iPhoneName || "Your app name as it appears on the App Store"}
                            size="small"
                          />
                          
                          <TextField
                            fullWidth
                            label="Custom URL Scheme *"
                            placeholder="myapp://open"
                            value={iPhoneURL}
                            onChange={(e) => setIPhoneURL(e.target.value)}
                            error={!!errors.iPhoneURL}
                            helperText={errors.iPhoneURL || "Your app's custom URL scheme (must include '://')"} 
                            size="small"
                          />
                          
                          <TextField
                            fullWidth
                            label="App Store ID *"
                            placeholder="123456789"
                            value={iPhoneId}
                            onChange={(e) => setIPhoneId(e.target.value)}
                            error={!!errors.iPhoneId}
                            helperText={errors.iPhoneId || "Your app's numeric ID from the App Store"}
                            size="small"
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Collapse>
                </Grid>

                {/* iPad Section */}
                <Grid item xs={12}>
                  <Collapse in={isIncludeiPad}>
                    <Card variant="outlined" sx={{ mt: 2, border: "2px solid #9C27B0" }}>
                      <CardContent>
                        <Typography variant="h6" color="secondary.main" fontWeight="bold" gutterBottom>
                          <IPadIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                          iPad App Details
                        </Typography>
                        
                        <Stack spacing={2} sx={{ mt: 2 }}>
                          <TextField
                            fullWidth
                            label="App Name *"
                            placeholder="My Awesome App"
                            value={ipadName}
                            onChange={(e) => setIpadName(e.target.value)}
                            error={!!errors.ipadName}
                            helperText={errors.ipadName || "Your app name as it appears on the App Store"}
                            size="small"
                          />
                          
                          <TextField
                            fullWidth
                            label="Custom URL Scheme *"
                            placeholder="myapp://open"
                            value={ipadURL}
                            onChange={(e) => setIpadURL(e.target.value)}
                            error={!!errors.ipadURL}
                            helperText={errors.ipadURL || "Your app's custom URL scheme (must include '://')"} 
                            size="small"
                          />
                          
                          <TextField
                            fullWidth
                            label="App Store ID *"
                            placeholder="123456789"
                            value={ipadId}
                            onChange={(e) => setIpadId(e.target.value)}
                            error={!!errors.ipadId}
                            helperText={errors.ipadId || "Your app's numeric ID from the App Store"}
                            size="small"
                          />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Collapse>
                </Grid>

                {/* Benefits Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Benefits" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    Twitter App Card Benefits
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Direct download buttons on Twitter
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Higher app download conversion rates
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Professional app promotion on social media
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Support for multiple platforms simultaneously
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
            {/* Twitter Card Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "#1DA1F2", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  TWITTER CARD PREVIEW
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
                  
                  <Typography variant="body1" gutterBottom>
                    {description || "Your app description will appear here..."}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Available on:
                    </Typography>
                    
                    <Stack spacing={1}>
                      {isIncludeAndroid && androidName && (
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: 1, 
                          p: 1, 
                          bgcolor: "#f5f5f5", 
                          borderRadius: 1 
                        }}>
                          <AndroidIcon color="success" />
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {androidName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Google Play Store
                            </Typography>
                          </Box>
                          <Button 
                            size="small" 
                            variant="contained" 
                            color="success"
                            startIcon={<DownloadIcon />}
                            sx={{ ml: "auto" }}
                          >
                            Install
                          </Button>
                        </Box>
                      )}

                      {isIncludeiPhone && iPhoneName && (
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: 1, 
                          p: 1, 
                          bgcolor: "#f5f5f5", 
                          borderRadius: 1 
                        }}>
                          <IPhoneIcon color="primary" />
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {iPhoneName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              App Store
                            </Typography>
                          </Box>
                          <Button 
                            size="small" 
                            variant="contained" 
                            color="primary"
                            startIcon={<DownloadIcon />}
                            sx={{ ml: "auto" }}
                          >
                            Install
                          </Button>
                        </Box>
                      )}

                      {isIncludeiPad && ipadName && (
                        <Box sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: 1, 
                          p: 1, 
                          bgcolor: "#f5f5f5", 
                          borderRadius: 1 
                        }}>
                          <IPadIcon color="secondary" />
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {ipadName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              App Store (iPad)
                            </Typography>
                          </Box>
                          <Button 
                            size="small" 
                            variant="contained" 
                            color="secondary"
                            startIcon={<DownloadIcon />}
                            sx={{ ml: "auto" }}
                          >
                            Install
                          </Button>
                        </Box>
                      )}

                      {getSelectedPlatformsCount() === 0 && (
                        <Typography variant="body2" color="text.secondary" textAlign="center">
                          Select platforms to show download options
                        </Typography>
                      )}
                    </Stack>
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
                  <Alert severity={site ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Twitter Site: {site ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={description ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Description: {description ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={getSelectedPlatformsCount() > 0 ? "success" : "warning"} variant="outlined">
                    <Typography variant="caption">
                      Platforms: {getSelectedPlatformsCount() > 0 ? `✓ ${getSelectedPlatformsCount()} selected` : "⚠ Select at least one platform"}
                    </Typography>
                  </Alert>

                  {isIncludeAndroid && (
                    <Alert severity={androidName && androidURL && androidId ? "success" : "error"} variant="outlined">
                      <Typography variant="caption">
                        Android: {androidName && androidURL && androidId ? "✓ Complete" : "✗ Missing required fields"}
                      </Typography>
                    </Alert>
                  )}

                  {isIncludeiPhone && (
                    <Alert severity={iPhoneName && iPhoneURL && iPhoneId ? "success" : "error"} variant="outlined">
                      <Typography variant="caption">
                        iPhone: {iPhoneName && iPhoneURL && iPhoneId ? "✓ Complete" : "✗ Missing required fields"}
                      </Typography>
                    </Alert>
                  )}

                  {isIncludeiPad && (
                    <Alert severity={ipadName && ipadURL && ipadId ? "success" : "error"} variant="outlined">
                      <Typography variant="caption">
                        iPad: {ipadName && ipadURL && ipadId ? "✓ Complete" : "✗ Missing required fields"}
                      </Typography>
                    </Alert>
                  )}
                </Stack>
              </Box>
            </Paper>

            {/* Twitter App Card Info */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ABOUT TWITTER APP CARDS
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      What it does:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Adds direct download buttons to your tweets
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Shows app name, description, and store badges
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Increases app download conversion rates
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Supports deep linking to specific app content
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Requirements:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • App must be published on respective stores
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Custom URL scheme must be configured
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Twitter account for attribution (recommended)
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Valid package/bundle IDs from app stores
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

export default App;



// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import {
//   businessCategories,
//   countries,
//   currencies,
//   organizations,
//   timezones,
// } from "@/app/constant";
// const App = () => {
//   const [site, setSite] = useState("");
//   const [description, setDescription] = useState("");

//   const [isIncludeAndroid, setIsIncludeAndroid] = useState("");
//   const [isIncludeiPhone, setIsIncludeiPhone] = useState("");
//   const [isIncludeiPad, setIsIncludeiPad] = useState("");

//   const [androidName, setAndroidName] = useState("");
//   const [androidURL, setAndroidURL] = useState("");
//   const [androidId, setAndroidId] = useState("");

//   const [iPhoneName, setIPhoneName] = useState("");
//   const [iPhoneURL, setIPhoneURL] = useState("");
//   const [iPhoneId, setIPhoneId] = useState("");

//   const [ipadName, setIpadName] = useState("");
//   const [ipadURL, setIpadURL] = useState("");
//   const [ipadId, setIpadId] = useState("");

//   const generateMetaTags = () => {
//     let metaTags = "";
//     metaTags += `<meta name="twitter:card" content="app">\n`;
//     if (site) metaTags += `<meta name="twitter:site" content="${site}">\n`;
//     if (description)
//       metaTags += `<meta name="twitter:description" content="${description}">\n`;

//     if (isIncludeAndroid) {
//       metaTags += `<meta name="twitter:app:name:googleplay" content="${androidName}">\n`;
//       metaTags += `<meta name="twitter:app:url:googleplay" content="${androidURL}">\n`;
//       metaTags += `<meta name="twitter:app:id:googleplay" content="${androidId}">\n`;
//     }

//     if (isIncludeiPhone) {
//       metaTags += `<meta name="twitter:app:name:iphone" content="${iPhoneName}">\n`;
//       metaTags += `<meta name="twitter:app:url:iphone" content="${iPhoneURL}">\n`;
//       metaTags += `<meta name="twitter:app:id:iphone" content="${iPhoneId}">\n`;
//     }

//     if (isIncludeiPad) {
//       metaTags += `<meta name="twitter:app:name:ipad" content="${ipadName}">\n`;
//       metaTags += `<meta name="twitter:app:url:ipad" content="${ipadURL}">\n`;
//       metaTags += `<meta name="twitter:app:id:ipad" content="${ipadId}">\n`;
//     }

//     return metaTags;
//   };

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         App Twitter Card Generator
//       </h1>
//       <p className="text-white text-sm mt-2">Direct download to a mobile app</p>
//       <div className="flex mt-5">
//         <div className="w-full border">
//           <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//             OPTIONS
//           </h1>
//           <div className="py-4 px-5 bg-gray-800">
//             <form>
//               <h1 className="text-white font-semibold mt-5">Person Details </h1>

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
//                   placeholder="Enter Title"
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
//                   placeholder="Enter Url"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 ></textarea>
//                 <span className="text-white text-xs">Max 200 characters</span>
//               </div>

//               <div class="flex items-center mb-4 mt-5">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => setIsIncludeAndroid(!isIncludeAndroid)}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include Android
//                 </label>
//               </div>
//               <div class="flex items-center mb-4 mt-5">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => setIsIncludeiPhone(!isIncludeiPhone)}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include iPhone
//                 </label>
//               </div>
//               <div class="flex items-center mb-4 mt-5">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => setIsIncludeiPad(!isIncludeiPad)}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include iPad
//                 </label>
//               </div>

//               {isIncludeAndroid && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Android </h1>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Name"
//                       value={androidName}
//                       onChange={(e) => setAndroidName(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Url"
//                       value={androidURL}
//                       onChange={(e) => setAndroidURL(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       Your app’s custom URL scheme (you must include “://” after
//                       your scheme name).
//                     </span>
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Url"
//                       value={androidId}
//                       onChange={(e) => setAndroidId(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       The numeric representation of your app ID in Google Play
//                       (i.e. “com.android.app”).
//                     </span>
//                   </div>
//                 </>
//               )}
//               {isIncludeiPhone && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">iPhone </h1>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Name"
//                       value={iPhoneName}
//                       onChange={(e) => setIPhoneName(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Url"
//                       value={iPhoneURL}
//                       onChange={(e) => setIPhoneURL(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       Your app’s custom URL scheme (you must include “://” after
//                       your scheme name).
//                     </span>
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Url"
//                       value={iPhoneId}
//                       onChange={(e) => setIPhoneId(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       The numeric representation of your app ID in Google Play
//                       (i.e. “com.android.app”).
//                     </span>
//                   </div>
//                 </>
//               )}

//               {isIncludeiPad && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">iPad </h1>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Name"
//                       value={ipadName}
//                       onChange={(e) => setIpadName(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Url"
//                       value={ipadURL}
//                       onChange={(e) => setIpadURL(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       Your app’s custom URL scheme (you must include “://” after
//                       your scheme name).
//                     </span>
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Url"
//                       value={ipadId}
//                       onChange={(e) => setIpadId(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       The numeric representation of your app ID in Google Play
//                       (i.e. “com.android.app”).
//                     </span>
//                   </div>
//                 </>
//               )}
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

// export default App;
