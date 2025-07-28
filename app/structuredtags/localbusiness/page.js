"use client";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  businessCategories,
  countries,
  currencies,
  timezones,
} from "@/app/constant";
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
  FormControlLabel,
  Switch,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  FormGroup,
  Checkbox,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Business as BusinessIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  Image as ImageIcon,
  AttachMoney as PriceIcon,
  Schedule as ScheduleIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Pinterest as PinterestIcon,
  YouTube as YouTubeIcon,
  Share as SocialIcon,
  AccessTime as TimeIcon,
  Category as CategoryIcon,
  Store as StoreIcon,
  Home as AddressIcon,
  Public as CountryIcon,
} from "@mui/icons-material";

const LocalBusiness = () => {
  const [businessType, setBusinessType] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [telephone, setTelephone] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [showSocialProfile, setShowSocialProfile] = useState(false);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [pintrest, setPintrest] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [youtube, setYouTube] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const [items, setItems] = useState([
    { daysoftheweek: [], openTime: "", closeTime: "" },
  ]);

  const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...items];
    if (name === "daysoftheweek") {
      const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
      list[index][name] = selectedOptions;
    } else {
      list[index][name] = value;
    }
    setItems(list);
  };

  const handleAddItem = () => {
    setItems([...items, { daysoftheweek: [], openTime: "", closeTime: "" }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const list = [...items];
      list.splice(index, 1);
      setItems(list);
    }
  };

  const handleDayChange = (index, day) => {
    const list = [...items];
    const dayIndex = list[index].daysoftheweek.indexOf(day);
    if (dayIndex > -1) {
      list[index].daysoftheweek.splice(dayIndex, 1);
    } else {
      list[index].daysoftheweek.push(day);
    }
    setItems(list);
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!businessName.trim()) newErrors.businessName = "Business name is required";
    if (!businessType) newErrors.businessType = "Business type is required";
    if (!telephone.trim()) newErrors.telephone = "Phone number is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State/Province is required";
    if (!country) newErrors.country = "Country is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (websiteUrl && !urlPattern.test(websiteUrl)) {
      newErrors.websiteUrl = "Please enter a valid URL starting with http:// or https://";
    }
    if (imageUrl && !urlPattern.test(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL starting with http:// or https://";
    }

    // Social media URL validation
    if (showSocialProfile) {
      if (facebook && !urlPattern.test(facebook)) {
        newErrors.facebook = "Please enter a valid Facebook URL";
      }
      if (instagram && !urlPattern.test(instagram)) {
        newErrors.instagram = "Please enter a valid Instagram URL";
      }
      if (twitter && !urlPattern.test(twitter)) {
        newErrors.twitter = "Please enter a valid Twitter URL";
      }
      if (linkedIn && !urlPattern.test(linkedIn)) {
        newErrors.linkedIn = "Please enter a valid LinkedIn URL";
      }
      if (pintrest && !urlPattern.test(pintrest)) {
        newErrors.pintrest = "Please enter a valid Pinterest URL";
      }
      if (youtube && !urlPattern.test(youtube)) {
        newErrors.youtube = "Please enter a valid YouTube URL";
      }
    }

    // Opening hours validation
    items.forEach((item, index) => {
      if (item.openTime && item.closeTime && item.openTime >= item.closeTime) {
        newErrors[`hours_${index}`] = "Close time must be after open time";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [businessName, businessType, telephone, city, state, country, websiteUrl, imageUrl, items, showSocialProfile, facebook, instagram, twitter, linkedIn, pintrest, youtube]);

  const socialProfiles = [
    facebook,
    instagram,
    linkedIn,
    twitter,
    pintrest,
    youtube,
  ].filter((profile) => profile.trim());

  const generateJSON = () => {
    const validHours = items.filter(item => 
      item.daysoftheweek.length > 0 && item.openTime && item.closeTime
    );

    return {
      "@context": "https://schema.org",
      "@type": businessType || "LocalBusiness",
      name: businessName,
      ...(imageUrl && { image: imageUrl }),
      ...(priceRange && { priceRange: priceRange }),
      ...(telephone && { telephone: telephone }),
      ...(websiteUrl && { url: websiteUrl }),
      address: {
        "@type": "PostalAddress",
        ...(streetAddress && { streetAddress: streetAddress }),
        ...(city && { addressLocality: city }),
        ...(state && { addressRegion: state }),
        ...(zip && { postalCode: zip }),
        ...(country && { addressCountry: country }),
      },
      ...(validHours.length > 0 && {
        openingHoursSpecification: validHours.map((item) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: item.daysoftheweek,
          opens: item.openTime,
          closes: item.closeTime,
        }))
      }),
      ...(showSocialProfile && socialProfiles.length > 0 && { sameAs: socialProfiles }),
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && 
    businessName.trim() && businessType && telephone.trim() && 
    city.trim() && state.trim() && country;

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <FacebookIcon />;
      case 'instagram': return <InstagramIcon />;
      case 'twitter': return <TwitterIcon />;
      case 'linkedin': return <LinkedInIcon />;
      case 'pinterest': return <PinterestIcon />;
      case 'youtube': return <YouTubeIcon />;
      default: return <SocialIcon />;
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
          <BusinessIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Local Business Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create structured data for local businesses and restaurants to enhance local search visibility.
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

                {/* Business Type */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.businessType}>
                    <InputLabel>Business Type *</InputLabel>
                    <Select
                      value={businessType}
                      label="Business Type *"
                      onChange={(e) => setBusinessType(e.target.value)}
                      startAdornment={<CategoryIcon sx={{ mr: 1, color: "action.active" }} />}
                    >
                      <MenuItem value="">Select Business Type</MenuItem>
                      {businessCategories.map((category) => (
                        <MenuItem key={category.value} value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.businessType && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                        {errors.businessType}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Business Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Business Name *"
                    placeholder="Your Business Name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    error={!!errors.businessName}
                    helperText={errors.businessName || `${businessName.length} characters`}
                    InputProps={{
                      startAdornment: <BusinessIcon sx={{ mr: 1, color: "action.active" }} />,
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
                    helperText={errors.imageUrl || "High-quality image of your business"}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Price Range and Phone */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price Range"
                    placeholder="$ - $$$$ or $10-50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    helperText="Price range indication (e.g., $$, $10-50, Budget-Friendly)"
                    InputProps={{
                      startAdornment: <PriceIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number *"
                    placeholder="+1-555-123-4567"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    error={!!errors.telephone}
                    helperText={errors.telephone}
                    InputProps={{
                      startAdornment: <PhoneIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Website URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Website URL"
                    placeholder="https://yourbusiness.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    error={!!errors.websiteUrl}
                    helperText={errors.websiteUrl}
                    InputProps={{
                      startAdornment: <WebsiteIcon sx={{ mr: 1, color: "action.active" }} />,
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
                    Address Information
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    placeholder="123 Main Street, Suite 100"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    helperText="Complete street address including suite/floor if applicable"
                    InputProps={{
                      startAdornment: <AddressIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City *"
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    error={!!errors.city}
                    helperText={errors.city}
                    InputProps={{
                      startAdornment: <LocationIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State/Province *"
                    placeholder="New York"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    error={!!errors.state}
                    helperText={errors.state}
                    InputProps={{
                      startAdornment: <LocationIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ZIP/Postal Code"
                    placeholder="10001"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    InputProps={{
                      startAdornment: <AddressIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.country}>
                    <InputLabel>Country *</InputLabel>
                    <Select
                      value={country}
                      label="Country *"
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <MenuItem value="">Select Country</MenuItem>
                      {countries.map((country) => (
                        <MenuItem key={country.value} value={country.value}>
                          {country.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.country && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                        {errors.country}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Opening Hours Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Business Hours" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <ScheduleIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Opening Hours
                  </Typography>
                  
                  <Stack spacing={2}>
                    {items.map((item, index) => (
                      <Card key={index} variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Hours #{index + 1}
                          </Typography>
                          {items.length > 1 && (
                            <IconButton
                              onClick={() => handleRemoveItem(index)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>

                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="body2" gutterBottom>
                              Select Days of the Week:
                            </Typography>
                            <FormGroup row>
                              {daysOfWeek.map((day) => (
                                <FormControlLabel
                                  key={day}
                                  control={
                                    <Checkbox
                                      checked={item.daysoftheweek.includes(day)}
                                      onChange={() => handleDayChange(index, day)}
                                      size="small"
                                    />
                                  }
                                  label={day.slice(0, 3)}
                                />
                              ))}
                            </FormGroup>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Opening Time"
                              type="time"
                              value={item.openTime}
                              onChange={(e) => handleInputChange(index, e)}
                              name="openTime"
                              InputLabelProps={{ shrink: true }}
                              InputProps={{
                                startAdornment: <TimeIcon sx={{ mr: 1, color: "action.active" }} />,
                              }}
                            />
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Closing Time"
                              type="time"
                              value={item.closeTime}
                              onChange={(e) => handleInputChange(index, e)}
                              name="closeTime"
                              error={!!errors[`hours_${index}`]}
                              helperText={errors[`hours_${index}`]}
                              InputLabelProps={{ shrink: true }}
                              InputProps={{
                                startAdornment: <TimeIcon sx={{ mr: 1, color: "action.active" }} />,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Card>
                    ))}

                    <Button
                      onClick={handleAddItem}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{ borderStyle: "dashed", py: 1.5 }}
                    >
                      Add Another Time Period
                    </Button>
                  </Stack>
                </Grid>

                {/* Social Profiles Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Social Media" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showSocialProfile}
                        onChange={(e) => setShowSocialProfile(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <SocialIcon fontSize="small" />
                        Include Social Media Profiles
                      </Box>
                    }
                  />
                </Grid>

                <Collapse in={showSocialProfile} className="px-4">
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                        <SocialIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Social Media Profiles
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Add your business social media profiles (leave empty if not available)
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Facebook URL"
                        placeholder="https://facebook.com/yourbusiness"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        error={!!errors.facebook}
                        helperText={errors.facebook}
                        InputProps={{
                          startAdornment: <FacebookIcon sx={{ mr: 1, color: "#1877F2" }} />,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Instagram URL"
                        placeholder="https://instagram.com/yourbusiness"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        error={!!errors.instagram}
                        helperText={errors.instagram}
                        InputProps={{
                          startAdornment: <InstagramIcon sx={{ mr: 1, color: "#E4405F" }} />,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Twitter URL"
                        placeholder="https://twitter.com/yourbusiness"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        error={!!errors.twitter}
                        helperText={errors.twitter}
                        InputProps={{
                          startAdornment: <TwitterIcon sx={{ mr: 1, color: "#1DA1F2" }} />,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="LinkedIn URL"
                        placeholder="https://linkedin.com/company/yourbusiness"
                        value={linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                        error={!!errors.linkedIn}
                        helperText={errors.linkedIn}
                        InputProps={{
                          startAdornment: <LinkedInIcon sx={{ mr: 1, color: "#0A66C2" }} />,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Pinterest URL"
                        placeholder="https://pinterest.com/yourbusiness"
                        value={pintrest}
                        onChange={(e) => setPintrest(e.target.value)}
                        error={!!errors.pintrest}
                        helperText={errors.pintrest}
                        InputProps={{
                          startAdornment: <PinterestIcon sx={{ mr: 1, color: "#BD081C" }} />,
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="YouTube URL"
                        placeholder="https://youtube.com/yourbusiness"
                        value={youtube}
                        onChange={(e) => setYouTube(e.target.value)}
                        error={!!errors.youtube}
                        helperText={errors.youtube}
                        InputProps={{
                          startAdornment: <YouTubeIcon sx={{ mr: 1, color: "#FF0000" }} />,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Collapse>
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
            {/* Business Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  BUSINESS PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                {imageUrl ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt="Business image"
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
                      No image selected
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {businessName || "Your Business Name"}
                  </Typography>
                  
                  {businessType && (
                    <Chip 
                      label={businessType} 
                      size="small" 
                      color="primary" 
                      sx={{ mb: 2 }}
                    />
                  )}
                  
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <LocationIcon fontSize="small" />
                    <Typography variant="body2">
                      {city && state ? `${city}, ${state}` : "Location not set"}
                    </Typography>
                  </Box>

                  {telephone && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <PhoneIcon fontSize="small" />
                      <Typography variant="body2">
                        {telephone}
                      </Typography>
                    </Box>
                  )}

                  {priceRange && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <PriceIcon fontSize="small" />
                      <Typography variant="body2">
                        {priceRange}
                      </Typography>
                    </Box>
                  )}

                  {items.filter(item => item.daysoftheweek.length > 0).length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Opening Hours:
                      </Typography>
                      {items.filter(item => item.daysoftheweek.length > 0).slice(0, 2).map((item, index) => (
                        <Typography key={index} variant="caption" display="block">
                          {item.daysoftheweek.join(', ')}: {item.openTime} - {item.closeTime}
                        </Typography>
                      ))}
                    </Box>
                  )}

                  {socialProfiles.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Social Media:
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        {facebook && <FacebookIcon sx={{ color: "#1877F2" }} />}
                        {instagram && <InstagramIcon sx={{ color: "#E4405F" }} />}
                        {twitter && <TwitterIcon sx={{ color: "#1DA1F2" }} />}
                        {linkedIn && <LinkedInIcon sx={{ color: "#0A66C2" }} />}
                        {pintrest && <PinterestIcon sx={{ color: "#BD081C" }} />}
                        {youtube && <YouTubeIcon sx={{ color: "#FF0000" }} />}
                      </Stack>
                    </Box>
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
                  <Alert severity={businessName.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Business Name: {businessName.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={businessType ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Business Type: {businessType ? "✓ Selected" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={telephone.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Phone: {telephone.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert severity={city.trim() && state.trim() && country ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Address: {city.trim() && state.trim() && country ? "✓ Complete" : "✗ City, State & Country required"}
                    </Typography>
                  </Alert>

                  <Alert severity={items.filter(item => item.daysoftheweek.length > 0 && item.openTime && item.closeTime).length > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Hours: {items.filter(item => item.daysoftheweek.length > 0 && item.openTime && item.closeTime).length > 0 ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={socialProfiles.length > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Social Media: {socialProfiles.length > 0 ? `✓ ${socialProfiles.length} profile${socialProfiles.length !== 1 ? 's' : ''}` : "ℹ Optional"}
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

export default LocalBusiness;




// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import {
//   businessCategories,
//   countries,
//   currencies,
//   timezones,
// } from "@/app/constant";
// const LocalBusiness = () => {
//   const [showSocialProfile, setShowSocialProfile] = useState(false);

//   const [businessType, setBusinessType] = useState("");
//   const [businessName, setBusinessName] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [priceRange, setPriceRange] = useState("");
//   const [telephone, setTelephone] = useState("");
//   const [websiteUrl, setWebsiteUrl] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [zip, setZip] = useState("");
//   const [facebook, setFacebook] = useState("");
//   const [instagram, setInstagram] = useState("");
//   const [twitter, setTwitter] = useState("");
//   const [pintrest, setPintrest] = useState("");
//   const [linkedIn, setLinkedIn] = useState("");
//   const [youtube, setYouTube] = useState("");

//   const socialProfiles = [
//     facebook,
//     instagram,
//     linkedIn,
//     twitter,
//     pintrest,
//     youtube,
//   ].filter((profile) => profile);

//   const [items, setItems] = useState([
//     { daysoftheweek: [], openTime: "", closeTime: "" },
//   ]);

//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const list = [...items];
//     if (name === "daysoftheweek") {
//       list[index][name] = value.split(","); // Split the value into an array
//     } else {
//       list[index][name] = value;
//     }
//     setItems(list);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { daysoftheweek: [], openTime: "", closeTime: "" }]);
//   };

//   const handleRemoveItem = (index) => {
//     const list = [...items];
//     list.splice(index, 1);
//     setItems(list);
//   };

//   const jsonText = JSON.stringify(
//     {
//       "@context": "http://schema.org/",
//       "@type": "LocalBusiness",
//       name: businessName,
//       image: imageUrl,
//       priceRange: priceRange,
//       telephone: telephone,
//       url: websiteUrl,
//       address: {
//         "@type": "PostalAddress",
//         streetAddress: streetAddress,
//         addressLocality: city,
//         addressRegion: state,
//         postalCode: zip,
//         addressCountry: country,
//       },
//       openingHoursSpecification: items.map((item) => ({
//         "@type": "OpeningHoursSpecification",
//         dayOfWeek: item.daysoftheweek,
//         opens: item.openTime,
//         closes: item.closeTime,
//       })),
//       sameAs: showSocialProfile ? socialProfiles : [],
//     },
//     null,
//     2
//   );
//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Local Business Structured Data Generator
//       </h1>
//       <p className="text-white text-sm mt-2">LocalBusiness and Restaurant</p>
//       <div className="flex mt-5">
//         <div className="w-full border">
//           <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//             OPTIONS
//           </h1>
//           <div className="py-4 px-5 bg-gray-800">
//             <form>
//               <h1 className="text-white font-semibold mt-5">
//                 Business Detail{" "}
//               </h1>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Type
//                 </label>
//                 <select
//                   id="type"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={businessType}
//                   onChange={(e) => setBusinessType(e.target.value)}
//                 >
//                   <option>Select Business Type</option>
//                   {businessCategories.map((category) => (
//                     <option key={category.value} value={category.value}>
//                       {category.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Business Name"
//                   value={businessName}
//                   onChange={(e) => setBusinessName(e.target.value)}
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
//                   placeholder="Enter Image Url"
//                   value={imageUrl}
//                   onChange={(e) => setImageUrl(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Price Range
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Price Range"
//                   value={priceRange}
//                   onChange={(e) => setPriceRange(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Telephone
//                 </label>
//                 <input
//                   type="tel"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Telphone Number"
//                   value={telephone}
//                   onChange={(e) => setTelephone(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Website Url
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Website Url"
//                   value={websiteUrl}
//                   onChange={(e) => setWebsiteUrl(e.target.value)}
//                 />
//               </div>
//               <div class="flex items-center mb-4 mt-5">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => setShowSocialProfile(!showSocialProfile)}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include Social Profile
//                 </label>
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
//               <h1 className="text-white font-semibold mt-5">Opening Houres </h1>
//               {items.map((item, index) => (
//                 <div key={index} className="mt-5">
//                   <div className="mt-5">
//                     <select
//                       id={`daysoftheweek${index}`}
//                       name="daysoftheweek"
//                       multiple
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={item.daysoftheweek}
//                       onChange={(e) => {
//                         // console.log(e.target.value)
//                         handleInputChange(index, e);
//                       }}
//                       // onChange={(e) => {
//                       //   const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
//                       //   handleInputChange(index, { target: { name: 'daysoftheweek', value: selectedOptions } });
//                       // }}
//                     >
//                       <option>Select Day's of the week</option>
//                       <option value="Sunday">Sunday</option>
//                       <option value="Monday">Monday</option>
//                       <option value="Tuesday">Tuesday</option>
//                       <option value="Wednesday">Wednesday</option>
//                       <option value="Thursday">Thursday</option>
//                       <option value="Friday">Friday</option>
//                       <option value="Saturday">Saturday</option>
//                     </select>
//                   </div>

//                   <label
//                     htmlFor={`url${index}`}
//                     className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Open Time
//                   </label>
//                   <input
//                     type="time"
//                     id={`openTime${index}`} // Use unique id for each time input
//                     name="openTime" // Change name attribute for openTime
//                     value={item.openTime}
//                     onChange={(e) => handleInputChange(index, e)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Open Time"
//                   />
//                   <label
//                     htmlFor={`url${index}`}
//                     className="block mt-3 mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Close Time
//                   </label>
//                   <input
//                     type="time"
//                     id={`closeTime${index}`} // Use unique id for each time input
//                     name="closeTime" // Change name attribute for closeTime
//                     value={item.closeTime}
//                     onChange={(e) => handleInputChange(index, e)}
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Close Time"
//                   />
//                   {index !== 0 && (
//                     <button
//                       type="button"
//                       className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       onClick={() => handleRemoveItem(index)}
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <div className="mt-5">
//                 <button
//                   type="button"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   onClick={handleAddItem}
//                 >
//                   Add Item
//                 </button>
//               </div>
//               {showSocialProfile && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">
//                     Social Profile{" "}
//                   </h1>
//                   <p className="text-white font-semibold mt-2 text-xs">
//                     If your business doesn’t have a profile, leave the field
//                     empty.
//                   </p>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder=" Facebook"
//                       value={facebook}
//                       onChange={(e) => setFacebook(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder=" Instagram"
//                       value={instagram}
//                       onChange={(e) => setInstagram(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="LinkedIn"
//                       value={linkedIn}
//                       onChange={(e) => setLinkedIn(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Twitter"
//                       value={twitter}
//                       onChange={(e) => setTwitter(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Pintrest"
//                       value={pintrest}
//                       onChange={(e) => setPintrest(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Youtube"
//                       value={youtube}
//                       onChange={(e) => setYouTube(e.target.value)}
//                     />
//                   </div>
//                 </>
//               )}{" "}
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

// export default LocalBusiness;
