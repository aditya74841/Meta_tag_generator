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
  PlayCircleOutline as PlayerIcon,
  CheckCircle as CheckIcon,
  Visibility as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Description as DescriptionIcon,
  Title as TitleIcon,
  Share as ShareIcon,
  CropFree as DimensionIcon, // Changed from AspectRatio
  Height as HeightIcon,
  CropPortrait as WidthIcon, // Changed from Width (doesn't exist)
  Twitter as TwitterIcon,
  VideoLibrary as MediaIcon,
  PlayArrow as PlayIcon,
  Fullscreen as FullscreenIcon,
} from "@mui/icons-material";

const Player = () => {
  const [site, setSite] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [playerUrl, setPlayerUrl] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAltText, setImageAltText] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!title.trim()) newErrors.title = "Title is required";
    if (!site.trim()) newErrors.site = "Twitter site is required";
    if (!playerUrl.trim()) newErrors.playerUrl = "Player URL is required";
    if (!height) newErrors.height = "Height is required";
    if (!width) newErrors.width = "Width is required";
    if (!imageUrl.trim()) newErrors.imageUrl = "Image URL is required";

    // Twitter handle validation
    if (site && !site.startsWith("@")) {
      newErrors.site = "Twitter handle should start with @";
    }

    // Description length validation
    if (description && description.length > 200) {
      newErrors.description = "Description must be 200 characters or less";
    }

    // HTTPS validation for player URL
    if (playerUrl && !playerUrl.startsWith("https://")) {
      newErrors.playerUrl = "Player URL must use HTTPS";
    }

    // URL validation for image
    const urlPattern = /^https?:\/\/.+/;
    if (imageUrl && !urlPattern.test(imageUrl)) {
      newErrors.imageUrl =
        "Please enter a valid image URL starting with http:// or https://";
    }

    // Dimension validation
    if (height && (height < 100 || height > 1000)) {
      newErrors.height = "Height should be between 100 and 1000 pixels";
    }
    if (width && (width < 100 || width > 1200)) {
      newErrors.width = "Width should be between 100 and 1200 pixels";
    }

    // Image dimension validation (Twitter requirement)
    const totalPixels = height * width;
    if (height && width && totalPixels < 68600) {
      newErrors.dimensions =
        "Total pixels must be at least 68,600 (e.g., 262x262 or 350x196)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [
    title,
    site,
    description,
    playerUrl,
    height,
    width,
    imageUrl,
    imageAltText,
  ]);

  const generateMetaTags = () => {
    const metaTags = [];

    metaTags.push('<meta name="twitter:card" content="player" />');
    if (title)
      metaTags.push(`<meta name="twitter:title" content="${title}" />`);
    if (site) metaTags.push(`<meta name="twitter:site" content="${site}" />`);
    if (description)
      metaTags.push(
        `<meta name="twitter:description" content="${description}" />`
      );
    if (playerUrl)
      metaTags.push(`<meta name="twitter:player" content="${playerUrl}" />`);
    if (height)
      metaTags.push(
        `<meta name="twitter:player:height" content="${height}" />`
      );
    if (width)
      metaTags.push(`<meta name="twitter:player:width" content="${width}" />`);
    if (imageUrl)
      metaTags.push(`<meta name="twitter:image" content="${imageUrl}" />`);
    if (imageAltText)
      metaTags.push(
        `<meta name="twitter:image:alt" content="${imageAltText}" />`
      );

    return metaTags.join("\n");
  };

  const metaTagsText = generateMetaTags();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    title.trim() &&
    site.trim() &&
    playerUrl.trim() &&
    height &&
    width &&
    imageUrl.trim();

  const getAspectRatio = () => {
    if (!height || !width) return "Not calculated";
    const ratio = (width / height).toFixed(2);
    if (Math.abs(ratio - 1.78) < 0.1) return "16:9 (Recommended)";
    if (Math.abs(ratio - 1.33) < 0.1) return "4:3";
    if (Math.abs(ratio - 1.0) < 0.1) return "1:1 (Square)";
    return `${ratio}:1 (Custom)`;
  };

  const getTotalPixels = () => {
    if (!height || !width) return 0;
    return height * width;
  };

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
          background: "linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <PlayerIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Player Twitter Card Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create Twitter Card meta tags for audio and video media players
              with embedded functionality.
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
                PLAYER TWITTER CARD CONFIGURATION
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
                {/* Basic Information Section */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                    fontWeight="bold"
                  >
                    <MediaIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Basic Information
                  </Typography>
                </Grid>

                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Player Title *"
                    placeholder="Amazing Video Player"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!!errors.title}
                    helperText={
                      errors.title ||
                      `${title.length} characters (recommended: 40-60 for social sharing)`
                    }
                    InputProps={{
                      startAdornment: (
                        <TitleIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Twitter Site */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Twitter Site *"
                    placeholder="@yourusername"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    error={!!errors.site}
                    helperText={
                      errors.site ||
                      "The Twitter @username the card should be attributed to"
                    }
                    InputProps={{
                      startAdornment: (
                        <TwitterIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Player Description"
                    placeholder="Watch this amazing video content with our interactive player..."
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={!!errors.description}
                    helperText={
                      errors.description ||
                      `${description.length}/200 characters (optional but recommended)`
                    }
                    InputProps={{
                      startAdornment: (
                        <DescriptionIcon
                          sx={{
                            mr: 1,
                            color: "action.active",
                            alignSelf: "flex-start",
                            mt: 1,
                          }}
                        />
                      ),
                    }}
                  />
                </Grid>

                {/* Player Configuration Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Player Configuration" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="bold"
                    gutterBottom
                  >
                    <PlayIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Player Settings
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Configure your embedded media player settings
                  </Typography>
                </Grid>

                {/* Player URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Player HTTPS URL *"
                    placeholder="https://player.example.com/embed/video123"
                    value={playerUrl}
                    onChange={(e) => setPlayerUrl(e.target.value)}
                    error={!!errors.playerUrl}
                    helperText={
                      errors.playerUrl ||
                      "Must be a secure HTTPS URL for the embedded player"
                    }
                    InputProps={{
                      startAdornment: (
                        <LinkIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Dimensions */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Player Height (px) *"
                    type="number"
                    placeholder="315"
                    inputProps={{ min: 100, max: 1000 }}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    error={!!errors.height}
                    helperText={
                      errors.height || "Player height in pixels (100-1000)"
                    }
                    InputProps={{
                      startAdornment: (
                        <HeightIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Player Width (px) *"
                    type="number"
                    placeholder="560"
                    inputProps={{ min: 100, max: 1200 }}
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    error={!!errors.width}
                    helperText={
                      errors.width || "Player width in pixels (100-1200)"
                    }
                    InputProps={{
                      startAdornment: (
                        <WidthIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Dimension Preview */}
                {height && width && (
                  <Grid item xs={12}>
                    <Box sx={{ p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Player Dimensions Preview:
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Chip
                          icon={<DimensionIcon />}
                          label={`${width}×${height}px`}
                          size="small"
                          color="primary"
                        />
                        <Chip
                          label={getAspectRatio()}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                        <Typography variant="body2" color="text.secondary">
                          Total: {getTotalPixels().toLocaleString()} pixels
                        </Typography>
                      </Stack>
                      {errors.dimensions && (
                        <Alert severity="error" sx={{ mt: 1 }}>
                          {errors.dimensions}
                        </Alert>
                      )}
                    </Box>
                  </Grid>
                )}

                {/* Image Configuration Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Fallback Image" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="bold"
                    gutterBottom
                  >
                    <ImageIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Fallback Image Settings
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {
                      "Image displayed on platforms that don't support embedded players"
                    }
                  </Typography>
                </Grid>

                {/* Image URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Fallback Image URL *"
                    placeholder="https://example.com/player-thumbnail.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    error={!!errors.imageUrl}
                    helperText={
                      errors.imageUrl ||
                      "Same dimensions as player. Min 68,600 pixels, Max 5MB (JPG, PNG, WEBP, GIF)"
                    }
                    InputProps={{
                      startAdornment: (
                        <ImageIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Image Alt Text */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image Alt Text"
                    placeholder="Video player showing amazing content"
                    value={imageAltText}
                    onChange={(e) => setImageAltText(e.target.value)}
                    helperText="Descriptive text for accessibility (recommended)"
                    InputProps={{
                      startAdornment: (
                        <DescriptionIcon
                          sx={{ mr: 1, color: "action.active" }}
                        />
                      ),
                    }}
                  />
                </Grid>

                {/* Benefits Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Benefits" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Twitter Player Card Benefits
                  </Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Embedded media playback directly in Twitter
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Higher engagement rates with interactive content
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Professional media presentation on social platforms
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckIcon color="success" fontSize="small" />
                      <Typography variant="body2">
                        Fallback image support for unsupported platforms
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
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
                {metaTagsText || "<!-- No meta tags generated yet -->"}
              </pre>
            </Box>
          </Paper>
        </Grid>

        {/* Preview Panel */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={2}>
            {/* Twitter Player Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "#1DA1F2", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  TWITTER PLAYER PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0, border: "1px solid #1DA1F2" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <TwitterIcon color="primary" />
                    <Typography variant="body2" color="primary">
                      {site || "@yourusername"}
                    </Typography>
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    {title || "Player Title"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description || "Player description will appear here..."}
                  </Typography>

                  {/* Player Preview */}
                  <Box
                    sx={{
                      position: "relative",
                      bgcolor: "#000",
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    {imageUrl ? (
                      <Box sx={{ position: "relative" }}>
                        <img
                          src={imageUrl}
                          alt={imageAltText || "Player preview"}
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            display: "block",
                          }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            bgcolor: "rgba(0,0,0,0.7)",
                            borderRadius: "50%",
                            p: 2,
                          }}
                        >
                          <PlayIcon sx={{ color: "white", fontSize: 32 }} />
                        </Box>
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 8,
                            right: 8,
                            bgcolor: "rgba(0,0,0,0.8)",
                            color: "white",
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: "0.75rem",
                          }}
                        >
                          <FullscreenIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          Player
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          height: 200,
                          bgcolor: "#333",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <PlayerIcon sx={{ fontSize: 48, color: "white" }} />
                        <Typography color="white" variant="body2">
                          Player Preview
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Player Info */}
                  {height && width && (
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <DimensionIcon fontSize="small" />
                      <Typography variant="body2">
                        {width}×{height}px • {getAspectRatio()}
                      </Typography>
                    </Box>
                  )}

                  {playerUrl && (
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <LinkIcon fontSize="small" />
                      <Typography
                        variant="body2"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {playerUrl}
                      </Typography>
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
                    severity={title.trim() ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Title: {title.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={site.trim() ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Twitter Site: {site.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={playerUrl.trim() ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Player URL: {playerUrl.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={height ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Height: {height ? `✓ ${height}px` : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={width ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Width: {width ? `✓ ${width}px` : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={imageUrl.trim() ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Fallback Image:{" "}
                      {imageUrl.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={description.trim() ? "success" : "info"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Description:{" "}
                      {description.trim()
                        ? "✓ Added"
                        : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={imageAltText.trim() ? "success" : "info"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Alt Text:{" "}
                      {imageAltText.trim()
                        ? "✓ Added"
                        : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>
                </Stack>
              </Box>
            </Paper>

            {/* Twitter Player Card Info */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "info.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ABOUT TWITTER PLAYER CARDS
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      What it does:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Embeds video/audio players directly in Twitter
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Provides interactive media experiences
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Shows fallback images on unsupported platforms
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Increases engagement with rich media content
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Requirements:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Player URL must use HTTPS protocol
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Minimum 68,600 pixels for fallback image
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Image must be less than 5MB in size
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Supported formats: JPG, PNG, WEBP, GIF
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Best Practices:
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Use 16:9 aspect ratio for video content
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Ensure player works on mobile devices
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      • Test fallback image displays properly
                    </Typography>
                    <Typography variant="caption" display="block">
                      • Include descriptive alt text for accessibility
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

export default Player;

// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

// const Player = () => {
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
//     metaTags += `<meta name="twitter:card" content="player">\n`;
//     metaTags += `<meta name="twitter:title" content="${title}">\n`;
//     metaTags += `<meta name="twitter:site" content="${site}">\n`;
//     if (description)
//       metaTags += `<meta name="twitter:description" content="${description}">\n`;

//     metaTags += `<meta name="twitter:player" content="${playerUrl}">\n`;
//     metaTags += `<meta name="twitter:player:height" content="${height}">\n`;
//     metaTags += `<meta name="twitter:player:width" content="${width}">\n`;
//     metaTags += `<meta name="twitter:image" content="${imageUrl}">\n`;
//     metaTags += `<meta name="twitter:image:alt" content="${imageAltText}">\n`;
//     return metaTags;
//   };
//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         App Twitter Card Generator
//       </h1>
//       <p className="text-white text-sm mt-2">Audio and video media

// </p>
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
//                   Player Url
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Player Url"
//                   value={playerUrl}
//                   onChange={(e) => setPlayerUrl(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   This must be a HTTPS URL.
//                 </span>
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Height (px)
//                 </label>
//                 <input
//                   type="number"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Height"
//                   value={height}
//                   onChange={(e) => setHeight(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Width (px)
//                 </label>
//                 <input
//                   type="number"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Width"
//                   value={width}
//                   onChange={(e) => setWidth(e.target.value)}
//                 />
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
//                   Image to be displayed in place of the player on platforms that
//                   don’t support iFrames or inline players. Image should be same
//                   dimensions as your player. Images with fewer than 68,600
//                   pixels (a 262x262 square image, or a 350x196 16:9 image) will
//                   cause the player card not to render. Image must be less then
//                   5MB in size. JPG, PNG, WEBP and GIF formats are supported.
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

// export default Player;
