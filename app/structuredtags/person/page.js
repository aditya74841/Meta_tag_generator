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
  FormControlLabel,
  Switch,
  Collapse,
  Divider,
  Avatar,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Person as PersonIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  LocationOn as LocationIcon,
  Language as WebsiteIcon,
  Image as ImageIcon,
  Work as JobIcon,
  Business as CompanyIcon,
  Share as SocialIcon,
  Home as AddressIcon,
  Public as CountryIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Pinterest as PinterestIcon,
  YouTube as YouTubeIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";

const Person = () => {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [showSocialProfile, setShowSocialProfile] = useState(false);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [pintrest, setPintrest] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [youtube, setYouTube] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (websiteUrl && !urlPattern.test(websiteUrl)) {
      newErrors.websiteUrl =
        "Please enter a valid URL starting with http:// or https://";
    }
    if (photoUrl && !urlPattern.test(photoUrl)) {
      newErrors.photoUrl =
        "Please enter a valid URL starting with http:// or https://";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [
    name,
    websiteUrl,
    photoUrl,
    showSocialProfile,
    facebook,
    instagram,
    twitter,
    linkedIn,
    pintrest,
    youtube,
  ]);

  const socialProfiles = [
    facebook,
    instagram,
    linkedIn,
    twitter,
    pintrest,
    youtube,
  ].filter((profile) => profile.trim());

  const generateJSON = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: name,
      ...(photoUrl && { image: photoUrl }),
      ...(websiteUrl && { url: websiteUrl }),
      ...(jobTitle && { jobTitle: jobTitle }),
      ...(company && {
        worksFor: {
          "@type": "Organization",
          name: company,
        },
      }),
      ...(showAddress &&
        (streetAddress || city || state || zip || country) && {
          address: {
            "@type": "PostalAddress",
            ...(streetAddress && { streetAddress: streetAddress }),
            ...(city && { addressLocality: city }),
            ...(state && { addressRegion: state }),
            ...(zip && { postalCode: zip }),
            ...(country && { addressCountry: country }),
          },
        }),
      ...(showSocialProfile &&
        socialProfiles.length > 0 && { sameAs: socialProfiles }),
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && name.trim();

  return (
    <Box
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PersonIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Person Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create structured data for people with job information, contact
              details, and social profiles.
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Configuration Panel */}
        <Grid item xs={12} lg={8}>
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "white",
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CodeIcon />
              <Typography variant="h6" fontWeight="bold">
                PERSON CONFIGURATION
              </Typography>
              {isFormValid && (
                <Chip
                  icon={<CheckIcon />}
                  label="Valid"
                  sx={{
                    bgcolor: "rgba(76, 175, 80, 0.8)",
                    color: "white",
                    ml: "auto",
                  }}
                />
              )}
            </Box>

            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Person Details Section */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                    fontWeight="bold"
                  >
                    <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Person Details
                  </Typography>
                </Grid>

                {/* Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name *"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name || `${name.length} characters`}
                    InputProps={{
                      startAdornment: (
                        <PersonIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Photo URL */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Photo URL"
                    placeholder="https://example.com/photo.jpg"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    error={!!errors.photoUrl}
                    helperText={
                      errors.photoUrl ||
                      "Professional headshot or profile picture"
                    }
                    InputProps={{
                      startAdornment: (
                        <ImageIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Website URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Website URL"
                    placeholder="https://yourwebsite.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    error={!!errors.websiteUrl}
                    helperText={
                      errors.websiteUrl || "Personal website or portfolio"
                    }
                    InputProps={{
                      startAdornment: (
                        <WebsiteIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Professional Information */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Professional Information" />
                  </Divider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    placeholder="Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    helperText="Current position or role"
                    InputProps={{
                      startAdornment: (
                        <JobIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    helperText="Current employer or organization"
                    InputProps={{
                      startAdornment: (
                        <CompanyIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Optional Sections */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Additional Information" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={showAddress}
                          onChange={(e) => setShowAddress(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <LocationIcon fontSize="small" />
                          Include Address
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={showSocialProfile}
                          onChange={(e) =>
                            setShowSocialProfile(e.target.checked)
                          }
                          color="primary"
                        />
                      }
                      label={
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <SocialIcon fontSize="small" />
                          Include Social Profiles
                        </Box>
                      }
                    />
                  </Stack>
                </Grid>

                {/* Address Section */}
                <Collapse in={showAddress} className="px-4">
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                        gutterBottom
                      >
                        <LocationIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Address Information
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {" Provide the person's address information"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Street Address"
                        placeholder="123 Main Street, Apt 4B"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <AddressIcon
                              sx={{ mr: 1, color: "action.active" }}
                            />
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="City"
                        placeholder="New York"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <LocationIcon
                              sx={{ mr: 1, color: "action.active" }}
                            />
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="State/Province"
                        placeholder="New York"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <LocationIcon
                              sx={{ mr: 1, color: "action.active" }}
                            />
                          ),
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
                          startAdornment: (
                            <AddressIcon
                              sx={{ mr: 1, color: "action.active" }}
                            />
                          ),
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
                          {countries.map((country) => (
                            <MenuItem key={country.value} value={country.value}>
                              {country.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Collapse>

                {/* Social Profiles Section */}
                <Collapse in={showSocialProfile} className="px-4">
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                        gutterBottom
                      >
                        <SocialIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Social Media Profiles
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Add social media profiles (leave empty if not available)
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Facebook URL"
                        placeholder="https://facebook.com/username"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                        error={!!errors.facebook}
                        helperText={errors.facebook}
                        InputProps={{
                          startAdornment: (
                            <FacebookIcon sx={{ mr: 1, color: "#1877F2" }} />
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Instagram URL"
                        placeholder="https://instagram.com/username"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        error={!!errors.instagram}
                        helperText={errors.instagram}
                        InputProps={{
                          startAdornment: (
                            <InstagramIcon sx={{ mr: 1, color: "#E4405F" }} />
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Twitter URL"
                        placeholder="https://twitter.com/username"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                        error={!!errors.twitter}
                        helperText={errors.twitter}
                        InputProps={{
                          startAdornment: (
                            <TwitterIcon sx={{ mr: 1, color: "#1DA1F2" }} />
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="LinkedIn URL"
                        placeholder="https://linkedin.com/in/username"
                        value={linkedIn}
                        onChange={(e) => setLinkedIn(e.target.value)}
                        error={!!errors.linkedIn}
                        helperText={errors.linkedIn}
                        InputProps={{
                          startAdornment: (
                            <LinkedInIcon sx={{ mr: 1, color: "#0A66C2" }} />
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Pinterest URL"
                        placeholder="https://pinterest.com/username"
                        value={pintrest}
                        onChange={(e) => setPintrest(e.target.value)}
                        error={!!errors.pintrest}
                        helperText={errors.pintrest}
                        InputProps={{
                          startAdornment: (
                            <PinterestIcon sx={{ mr: 1, color: "#BD081C" }} />
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="YouTube URL"
                        placeholder="https://youtube.com/c/username"
                        value={youtube}
                        onChange={(e) => setYouTube(e.target.value)}
                        error={!!errors.youtube}
                        helperText={errors.youtube}
                        InputProps={{
                          startAdornment: (
                            <YouTubeIcon sx={{ mr: 1, color: "#FF0000" }} />
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Collapse>
              </Grid>
            </Box>
          </Paper>

          {/* Generated Code */}
          <Paper
            elevation={3}
            sx={{ mt: 3, borderRadius: 2, overflow: "hidden" }}
          >
            <Box
              sx={{
                bgcolor: "success.main",
                color: "white",
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                GENERATED JSON-LD CODE
              </Typography>
              <CopyToClipboard
                text={`<script type="application/ld+json">\n${jsonText}\n</script>`}
                onCopy={handleCopy}
              >
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
              Add this JSON-LD script to the &lt;head&gt; section of your HTML
              page.
            </Alert>

            <Box
              sx={{
                p: 3,
                bgcolor: "#1e1e1e",
                color: "#f8f8f2",
                maxHeight: 500,
                overflow: "auto",
              }}
            >
              <pre
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                }}
              >
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
            {/* Person Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  PERSON PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    {photoUrl ? (
                      <Avatar
                        src={photoUrl}
                        alt={name}
                        sx={{ width: 64, height: 64 }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{ width: 64, height: 64, bgcolor: "primary.main" }}
                      >
                        <PersonIcon sx={{ fontSize: 40 }} />
                      </Avatar>
                    )}
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {name || "Person Name"}
                      </Typography>
                      {jobTitle && (
                        <Typography variant="body2" color="text.secondary">
                          {jobTitle}
                        </Typography>
                      )}
                      {company && (
                        <Typography variant="body2" color="text.secondary">
                          at {company}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {websiteUrl && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <WebsiteIcon fontSize="small" />
                      <Typography
                        variant="body2"
                        component="a"
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener"
                      >
                        {websiteUrl}
                      </Typography>
                    </Box>
                  )}

                  {showAddress && (city || state || country) && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <LocationIcon fontSize="small" />
                      <Typography variant="body2">
                        {[city, state, country].filter(Boolean).join(", ") ||
                          "Address not provided"}
                      </Typography>
                    </Box>
                  )}

                  {socialProfiles.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Social Media:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {facebook && <FacebookIcon sx={{ color: "#1877F2" }} />}
                        {instagram && (
                          <InstagramIcon sx={{ color: "#E4405F" }} />
                        )}
                        {twitter && <TwitterIcon sx={{ color: "#1DA1F2" }} />}
                        {linkedIn && <LinkedInIcon sx={{ color: "#0A66C2" }} />}
                        {pintrest && (
                          <PinterestIcon sx={{ color: "#BD081C" }} />
                        )}
                        {youtube && <YouTubeIcon sx={{ color: "#FF0000" }} />}
                      </Stack>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Paper>

            {/* Validation Status */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box
                sx={{
                  bgcolor: isFormValid ? "success.main" : "error.main",
                  color: "white",
                  p: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  VALIDATION STATUS
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={1}>
                  <Alert
                    severity={name.trim() ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Name: {name.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={photoUrl ? "success" : "info"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Photo:{" "}
                      {photoUrl ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={websiteUrl ? "success" : "info"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Website: {websiteUrl ? "✓ Added" : "ℹ Optional"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={jobTitle && company ? "success" : "info"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Professional Info:{" "}
                      {jobTitle && company
                        ? "✓ Complete"
                        : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={
                      showAddress
                        ? city || state || country
                          ? "success"
                          : "warning"
                        : "info"
                    }
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Address:{" "}
                      {showAddress
                        ? city || state || country
                          ? "✓ Added"
                          : "⚠ Incomplete"
                        : "ℹ Not included"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={
                      showSocialProfile
                        ? socialProfiles.length > 0
                          ? "success"
                          : "warning"
                        : "info"
                    }
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Social Media:{" "}
                      {showSocialProfile
                        ? socialProfiles.length > 0
                          ? `✓ ${socialProfiles.length} profile${
                              socialProfiles.length !== 1 ? "s" : ""
                            }`
                          : "⚠ No profiles added"
                        : "ℹ Not included"}
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

export default Person;

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
// const Person = () => {
//   const [showAddress, setShowAddress] = useState(false);
//   const [showSocialProfile, setShowSocialProfile] = useState(false);
//   const [name, setName] = useState("");
//   const [photoUrl, setPhotoUrl] = useState("");
//   const [websiteUrl, setWebsiteUrl] = useState("");
//   const [jobTitle, setJobTitle] = useState("");
//   const [company, setCompany] = useState("");
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

//   const jsonText = JSON.stringify(
//     {
//       "@context": "http://schema.org/",
//       "@type": "Person",
//       "name": name,
//       "image": photoUrl,
//       "url": websiteUrl,
//       "jobTitle": jobTitle,
//       "worksFor": {
//         "@type": "Organization",
//         "name": company
//       },
//       ...(showAddress && {
//         "address": {
//           "@type": "PostalAddress",
//           "streetAddress": streetAddress,
//           "addressLocality": city,
//           "addressRegion": state,
//           "postalCode": zip,
//           "addressCountry": country
//         }
//       }),
//       "sameAs": showSocialProfile ? [facebook, instagram, linkedIn, twitter, pintrest, youtube] : undefined
//     },
//     null,
//     2
//   );

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Person Structured Data Generator
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
//               <h1 className="text-white font-semibold mt-5">Person Details </h1>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter  Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Photo Url"
//                   value={photoUrl}
//                   onChange={(e) => setPhotoUrl(e.target.value)}
//                 />
//               </div>

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
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Job Title"
//                   value={jobTitle}
//                   onChange={(e) => setJobTitle(e.target.value)}
//                 />
//               </div>
//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Company"
//                   value={company}
//                   onChange={(e) => setCompany(e.target.value)}
//                 />
//               </div>

//               <div class="flex items-center mb-4 mt-5">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => setShowAddress(!showAddress)}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include address
//                 </label>
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

//               {showAddress && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Address </h1>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter street address"
//                       value={streetAddress}
//                       onChange={(e) => setStreetAddress(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter city"
//                       value={city}
//                       onChange={(e) => setCity(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter state/province/region"
//                       value={state}
//                       onChange={(e) => setState(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter zip/postal/code"
//                       value={zip}
//                       onChange={(e) => setZip(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <select
//                       id="type"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={country}
//                       onChange={(e) => setCountry(e.target.value)}
//                     >
//                       <option>Select Country</option>
//                       {countries.map((country) => (
//                         <option key={country.value} value={country.value}>
//                           {country.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </>
//               )}
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
//               </div>
//               <CopyToClipboard
//                 text={`<script type="application/ld+json">\n${jsonText}\n</script>`}
//               >
//                 <div className="ml-auto w-1/6 mt-2">
//                   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                     Copy
//                   </button>
//                 </div>
//               </CopyToClipboard>

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

// export default Person;
