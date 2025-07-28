
"use client";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { currencies, timezones } from "@/app/constant";
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
  FormControlLabel,
  Checkbox,
  Collapse,
  Switch,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Event as EventIcon,
  CheckCircle as CheckIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  Preview as PreviewIcon,
  Description as DescriptionIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  Group as GroupIcon,
  Star as StarIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  ConfirmationNumber as TicketIcon,
  Public as OnlineIcon,
  Place as OfflineIcon,
  Blended as MixedIcon,
} from "@mui/icons-material";

const Event = () => {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day = d.getDate();
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}T${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [attendanceMode, setAttendanceMode] = useState("Online");
  const [timeZone, setTimeZone] = useState("America/New_York");
  const [eventStatus, setEventStatus] = useState("EventScheduled");
  const [startDate, setStartDate] = useState(formatDate(Date.now()));
  const [endDate, setEndDate] = useState(formatDate(Date.now() + 3600000));
  const [locationUrl, setLocationUrl] = useState("");
  const [offerUrl, setOfferUrl] = useState("");
  const [price, setPrice] = useState("");
  const [currencyType, setCurrencyType] = useState("USD");
  const [availability, setAvailability] = useState("InStock");
  const [validFromDate, setValidFromDate] = useState(formatDate(Date.now()));
  const [organizerName, setOrganizerName] = useState("");
  const [organizerUrl, setOrganizerUrl] = useState("");
  const [organizerType, setOrganizerType] = useState("Organization");
  const [isIncludeOffer, setIsIncludeOffer] = useState(false);
  const [isIncludeOrganizer, setIsIncludeOrganizer] = useState(false);
  const [isIncludePerformer, setIsIncludePerformer] = useState(false);
  const [performerType, setPerformerType] = useState("PerformingGroup");
  const [performerName, setPerformerName] = useState("");
  const [copied, setCopied] = useState(false);

  // Validation states
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!eventName.trim()) newErrors.eventName = "Event name is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!locationUrl.trim()) newErrors.locationUrl = "Location URL is required";

    // Date validation
    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      newErrors.endDate = "End date must be after start date";
    }

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (locationUrl && !urlPattern.test(locationUrl)) {
      newErrors.locationUrl = "Please enter a valid URL starting with http:// or https://";
    }

    if (isIncludeOffer) {
      if (!price || price <= 0) newErrors.price = "Valid price is required for offers";
      if (!offerUrl.trim()) newErrors.offerUrl = "Offer URL is required";
      if (offerUrl && !urlPattern.test(offerUrl)) {
        newErrors.offerUrl = "Please enter a valid URL starting with http:// or https://";
      }
    }

    if (isIncludeOrganizer) {
      if (!organizerName.trim()) newErrors.organizerName = "Organizer name is required";
      if (!organizerUrl.trim()) newErrors.organizerUrl = "Organizer URL is required";
      if (organizerUrl && !urlPattern.test(organizerUrl)) {
        newErrors.organizerUrl = "Please enter a valid URL starting with http:// or https://";
      }
    }

    if (isIncludePerformer) {
      if (!performerName.trim()) newErrors.performerName = "Performer name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [eventName, startDate, endDate, locationUrl, price, offerUrl, organizerName, organizerUrl, performerName, isIncludeOffer, isIncludeOrganizer, isIncludePerformer]);

  const jsonData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: eventName,
    ...(description && { description: description }),
    ...(imageUrl && { image: imageUrl }),
    eventAttendanceMode: `https://schema.org/${attendanceMode}EventAttendanceMode`,
    eventStatus: `https://schema.org/${eventStatus}`,
    startDate: startDate,
    ...(endDate && { endDate: endDate }),
    location: [
      {
        "@type": "VirtualLocation",
        url: locationUrl,
      },
    ],
    ...(isIncludeOrganizer && organizerName && {
      organizer: {
        "@type": organizerType,
        name: organizerName,
        ...(organizerUrl && { url: organizerUrl }),
      },
    }),
    ...(isIncludePerformer && performerName && {
      performer: {
        "@type": performerType,
        name: performerName,
      },
    }),
    ...(isIncludeOffer && price && {
      offers: {
        "@type": "Offer",
        ...(offerUrl && { url: offerUrl }),
        price: price,
        priceCurrency: currencyType,
        availability: `https://schema.org/${availability}`,
        validFrom: validFromDate,
      },
    }),
  };

  const jsonText = JSON.stringify(jsonData, null, 2);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAttendanceModeIcon = (mode) => {
    switch (mode) {
      case "Online": return <OnlineIcon />;
      case "Offline": return <OfflineIcon />;
      case "Mixed": return <MixedIcon />;
      default: return <OnlineIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "EventScheduled": return "success";
      case "EventCancelled": return "error";
      case "EventMovedOnline": return "info";
      case "EventPostponed": return "warning";
      case "EventRescheduled": return "warning";
      default: return "default";
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && eventName.trim() && startDate && locationUrl.trim();

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
          <EventIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Event Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create structured data for events to enhance visibility in search results and event listings.
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
                EVENT CONFIGURATION
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
                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    Basic Information
                  </Typography>
                </Grid>

                {/* Event Name */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Event Name *"
                    placeholder="Enter your event name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    error={!!errors.eventName}
                    helperText={errors.eventName || `${eventName.length} characters`}
                    InputProps={{
                      startAdornment: <EventIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    placeholder="Describe your event"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    helperText={`${description.length} characters (recommended: 50-160 for SEO)`}
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* Image URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Event Image URL"
                    placeholder="https://example.com/event-image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                    helperText="High-quality image for better visibility (recommended: 1200x630px)"
                  />
                </Grid>

                {/* Event Details */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Event Details" />
                  </Divider>
                </Grid>

                {/* Attendance Mode */}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Attendance Mode</InputLabel>
                    <Select
                      value={attendanceMode}
                      label="Attendance Mode"
                      onChange={(e) => setAttendanceMode(e.target.value)}
                    >
                      <MenuItem value="Online">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <OnlineIcon fontSize="small" />
                          Online
                        </Box>
                      </MenuItem>
                      <MenuItem value="Offline">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <OfflineIcon fontSize="small" />
                          Offline
                        </Box>
                      </MenuItem>
                      <MenuItem value="Mixed">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <MixedIcon fontSize="small" />
                          Mixed
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Event Status */}
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Event Status</InputLabel>
                    <Select
                      value={eventStatus}
                      label="Event Status"
                      onChange={(e) => setEventStatus(e.target.value)}
                    >
                      <MenuItem value="EventScheduled">Scheduled</MenuItem>
                      <MenuItem value="EventCancelled">Cancelled</MenuItem>
                      <MenuItem value="EventMovedOnline">Moved Online</MenuItem>
                      <MenuItem value="EventPostponed">Postponed</MenuItem>
                      <MenuItem value="EventRescheduled">Rescheduled</MenuItem>
                    </Select>
                  </FormControl>
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

                {/* Dates */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date & Time *"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                    InputProps={{
                      startAdornment: <ScheduleIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Date & Time"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                    InputProps={{
                      startAdornment: <ScheduleIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Location */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location URL *"
                    placeholder="https://meet.google.com/xyz or https://venue-website.com"
                    value={locationUrl}
                    onChange={(e) => setLocationUrl(e.target.value)}
                    error={!!errors.locationUrl}
                    helperText={errors.locationUrl || "Virtual meeting link or venue website"}
                    InputProps={{
                      startAdornment: <LocationIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Optional Sections */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Optional Information" />
                  </Divider>
                </Grid>

                {/* Toggles */}
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isIncludeOffer}
                          onChange={(e) => setIsIncludeOffer(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <TicketIcon fontSize="small" />
                          Include Pricing
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isIncludeOrganizer}
                          onChange={(e) => setIsIncludeOrganizer(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <BusinessIcon fontSize="small" />
                          Include Organizer
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isIncludePerformer}
                          onChange={(e) => setIsIncludePerformer(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <GroupIcon fontSize="small" />
                          Include Performer
                        </Box>
                      }
                    />
                  </Stack>
                </Grid>

                {/* Offer Section */}
                <Collapse in={isIncludeOffer}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        <TicketIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Pricing Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Availability</InputLabel>
                        <Select
                          value={availability}
                          label="Availability"
                          onChange={(e) => setAvailability(e.target.value)}
                        >
                          <MenuItem value="InStock">In Stock</MenuItem>
                          <MenuItem value="SoldOut">Sold Out</MenuItem>
                          <MenuItem value="PreOrder">Pre-order</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Price *"
                        type="number"
                        placeholder="0.00"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        error={!!errors.price}
                        helperText={errors.price}
                        InputProps={{
                          startAdornment: <MoneyIcon sx={{ mr: 1, color: "action.active" }} />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Currency</InputLabel>
                        <Select
                          value={currencyType}
                          label="Currency"
                          onChange={(e) => setCurrencyType(e.target.value)}
                        >
                          {currencies.map((currency) => (
                            <MenuItem key={currency.value} value={currency.value}>
                              {currency.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Valid From"
                        type="datetime-local"
                        value={validFromDate}
                        onChange={(e) => setValidFromDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Offer URL *"
                        placeholder="https://tickets.example.com"
                        value={offerUrl}
                        onChange={(e) => setOfferUrl(e.target.value)}
                        error={!!errors.offerUrl}
                        helperText={errors.offerUrl}
                        InputProps={{
                          startAdornment: <LinkIcon sx={{ mr: 1, color: "action.active" }} />,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Collapse>

                {/* Organizer Section */}
                <Collapse in={isIncludeOrganizer}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        <BusinessIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Organizer Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth>
                        <InputLabel>Organizer Type</InputLabel>
                        <Select
                          value={organizerType}
                          label="Organizer Type"
                          onChange={(e) => setOrganizerType(e.target.value)}
                        >
                          <MenuItem value="Organization">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <BusinessIcon fontSize="small" />
                              Organization
                            </Box>
                          </MenuItem>
                          <MenuItem value="Person">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <PersonIcon fontSize="small" />
                              Person
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Organizer Name *"
                        placeholder="Event Organizer"
                        value={organizerName}
                        onChange={(e) => setOrganizerName(e.target.value)}
                        error={!!errors.organizerName}
                        helperText={errors.organizerName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Organizer URL *"
                        placeholder="https://organizer-website.com"
                        value={organizerUrl}
                        onChange={(e) => setOrganizerUrl(e.target.value)}
                        error={!!errors.organizerUrl}
                        helperText={errors.organizerUrl}
                        InputProps={{
                          startAdornment: <LinkIcon sx={{ mr: 1, color: "action.active" }} />,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Collapse>

                {/* Performer Section */}
                <Collapse in={isIncludePerformer}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        <GroupIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Performer Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Performer Type</InputLabel>
                        <Select
                          value={performerType}
                          label="Performer Type"
                          onChange={(e) => setPerformerType(e.target.value)}
                        >
                          <MenuItem value="PerformingGroup">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <GroupIcon fontSize="small" />
                              Performing Group
                            </Box>
                          </MenuItem>
                          <MenuItem value="Person">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <PersonIcon fontSize="small" />
                              Person
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Performer Name *"
                        placeholder="Artist or Band Name"
                        value={performerName}
                        onChange={(e) => setPerformerName(e.target.value)}
                        error={!!errors.performerName}
                        helperText={errors.performerName}
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
            {/* Event Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  EVENT PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                {imageUrl ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt="Event image"
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
                    <EventIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No image selected
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                    <Chip 
                      icon={getAttendanceModeIcon(attendanceMode)} 
                      label={attendanceMode} 
                      size="small" 
                      color="primary"
                    />
                    <Chip 
                      label={eventStatus.replace('Event', '')} 
                      size="small" 
                      color={getStatusColor(eventStatus)}
                    />
                  </Box>
                  
                  <Typography variant="h6" gutterBottom>
                    {eventName || "Event Name"}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description || "Event description will appear here..."}
                  </Typography>
                  
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <ScheduleIcon fontSize="small" />
                    <Typography variant="body2">
                      {startDate ? new Date(startDate).toLocaleString() : "Start date not set"}
                    </Typography>
                  </Box>

                  {isIncludeOffer && price && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <MoneyIcon fontSize="small" />
                      <Typography variant="body2" fontWeight="bold">
                        {price} {currencyType}
                      </Typography>
                    </Box>
                  )}

                  {isIncludeOrganizer && organizerName && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <BusinessIcon fontSize="small" />
                      <Typography variant="body2">
                        Organized by {organizerName}
                      </Typography>
                    </Box>
                  )}

                  {isIncludePerformer && performerName && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <GroupIcon fontSize="small" />
                      <Typography variant="body2">
                        Featuring {performerName}
                      </Typography>
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
                  <Alert severity={eventName.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Event Name: {eventName.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={startDate ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Start Date: {startDate ? "✓ Set" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={locationUrl.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Location: {locationUrl.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert severity={description.length >= 50 ? "success" : "warning"} variant="outlined">
                    <Typography variant="caption">
                      Description: {description.length >= 50 ? "✓ Good length" : "⚠ Consider adding more detail"}
                    </Typography>
                  </Alert>

                  <Alert severity={imageUrl ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Image: {imageUrl ? "✓ Added" : "ℹ Optional but recommended"}
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

export default Event;



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

//   const [eventName, setEventName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [attendanceMode, setAttendanceMode] = useState("Online");
//   const [timeZone, setTimeZone] = useState("");
//   const [eventStatus, setEventStatus] = useState("EventMovedOnline");
//   const [startDate, setStartDate] = useState(formatDate(Date.now()));
//   const [endDate, setEndDate] = useState(formatDate(Date.now()));
//   const [locationUrl, setLocationUrl] = useState("");
//   const [offerUrl, setOfferUrl] = useState("");
//   const [price, setPrice] = useState("");
//   const [currencyType, setCurrencyType] = useState("USD");
//   const [availability, setAvailability] = useState("In Stock");
//   const [validFromDate, setValidFromDate] = useState(formatDate(Date.now()));
//   const [organizerName, setOrganizerName] = useState("");
//   const [organizerUrl, setOrganizerUrl] = useState("");
//   const [organizerType, setOrganizerType] = useState("");
//   const [isIncludeOffer, setIsIncludeOffer] = useState(false);
//   const [isIncludeOrganizer, setIsIncludeOrganizer] = useState(false);
//   const [isIncludePerformer, setIsIncludePerformer] = useState(false);

//   const [performerType, setPerformerType] = useState("PerformingGroup");
//   const [performerName, setPerformerName] = useState("");

//   const jsonData = {
//     "@context": "http://schema.org/",
//     "@type": "Event",
//     name: eventName,
//     ...(description && { description: description }),
//     ...(imageUrl && { image: imageUrl }),
//     eventAttendanceMode: `https://schema.org/${attendanceMode}EventAttendanceMode`,
//     eventStatus: `https://schema.org/${eventStatus}`,
//     startDate: startDate,
//     location: [
//       {
//         "@type": "VirtualLocation",
//         url: locationUrl,
//       },
//     ],
//     ...(isIncludeOrganizer && {
//       organizer: {
//         "@type": organizerType,
//         name: organizerName,
//         url: organizerUrl,
//       },
//     }),
//     ...(isIncludePerformer && {
//       performer: {
//         "@type": performerType,
//         name: performerName,
//       },
//     }),
//     ...(isIncludeOffer && {
//       offers: {
//         "@type": "Offer",
//         url: offerUrl,
//         price: price,
//         priceCurrency: currencyType,
//         availability: `https://schema.org/${availability}`,
//         validFrom: validFromDate,
//       },
//     }),
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
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Enter Event Name
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Event Name"
//                   value={eventName}
//                   onChange={(e) => setEventName(e.target.value)}
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
//                   placeholder="Enter Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 ></textarea>
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
//                   htmlFor="type"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Attendance Mode
//                 </label>
//                 <select
//                   id="type"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={attendanceMode}
//                   onChange={(e) => setAttendanceMode(e.target.value)}
//                 >
//                   <option value="Mixed">Mixed</option>
//                   <option value="Offline">Offline</option>
//                   <option value="Online">Online</option>
//                 </select>
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
//                   htmlFor="type"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Status
//                 </label>
//                 <select
//                   id="type"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={eventStatus}
//                   onChange={(e) => setEventStatus(e.target.value)}
//                 >
//                   <option value="Cancelled">Cancelled</option>
//                   <option value="Moved online">Moved online</option>
//                   <option value="Postponed">Postponed</option>
//                   <option value="Rescheduled">Rescheduled</option>
//                   <option value="Scheduled">Scheduled</option>
//                 </select>
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Start Date & time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   End Date & time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                 />
//               </div>

//               <div class="flex items-center mb-4 mt-5">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => {
//                     setIsIncludeOffer(!isIncludeOffer);
//                   }}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include Offer
//                 </label>
//               </div>

//               <div class="flex items-center mb-4">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => {
//                     setIsIncludeOrganizer(!isIncludeOrganizer);
//                   }}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include organizer
//                 </label>
//               </div>

//               <div class="flex items-center mb-4">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => {
//                     setIsIncludePerformer(!isIncludePerformer);
//                   }}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include performer
//                 </label>
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Url"
//                   value={locationUrl}
//                   onChange={(e) => setLocationUrl(e.target.value)}
//                 />
//               </div>

//               {isIncludeOffer && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Offer </h1>
//                   <div className="mt-5">
//                     <label
//                       htmlFor="type"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Availability
//                     </label>
//                     <select
//                       id="type"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={availability}
//                       onChange={(e) => setAvailability(e.target.value)}
//                     >
//                       <option value="In Stock">In Stock</option>
//                       <option value="Sold out">Sold out</option>
//                       <option value="Pre-order">Pre-order</option>
//                     </select>
//                   </div>

//                   <div className="mt-5 flex justify-between">
//                     <div className="w-4/6">
//                       <label
//                         for="first_name"
//                         class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Price
//                       </label>
//                       <input
//                         type="number"
//                         id="first_name"
//                         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Enter Headline"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                       />
//                     </div>
//                     <div className="w-1/4 ml-auto">
//                       <label
//                         htmlFor="type"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Currency Type
//                       </label>
//                       <select
//                         id="type"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         value={currencyType}
//                         onChange={(e) => setCurrencyType(e.target.value)}
//                       >
//                         {currencies.map((currency) => (
//                           <option key={currency.value} value={currency.value}>
//                             {currency.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="mt-5">
//                     <label
//                       for="first_name"
//                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Price valid from date
//                     </label>
//                     <input
//                       type="datetime-local"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={validFromDate}
//                       onChange={(e) => setValidFromDate(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <label
//                       for="first_name"
//                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Url
//                     </label>
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Paste Image Url"
//                       value={offerUrl}
//                       onChange={(e) => setOfferUrl(e.target.value)}
//                     />
//                   </div>
//                 </>
//               )}

//               {isIncludeOrganizer && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Organizer </h1>

//                   <div className="mt-5">
//                     <label
//                       htmlFor="type"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Type
//                     </label>
//                     <select
//                       id="type"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={organizerType}
//                       onChange={(e) => setOrganizerType(e.target.value)}
//                     >
//                       <option value="Organization">Organization</option>
//                       <option value="Person">Person</option>
//                     </select>
//                   </div>

//                   <div className="mt-5">
//                     <label
//                       for="first_name"
//                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Paste Image Url"
//                       value={organizerName}
//                       onChange={(e) => setOrganizerName(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <label
//                       for="first_name"
//                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Url
//                     </label>
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Paste Image Url"
//                       value={organizerUrl}
//                       onChange={(e) => setOrganizerUrl(e.target.value)}
//                     />
//                   </div>
//                 </>
//               )}

//               {isIncludePerformer && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Performer </h1>

//                   <div className="mt-5">
//                     <label
//                       htmlFor="type"
//                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Type
//                     </label>
//                     <select
//                       id="type"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={performerType}
//                       onChange={(e) => setPerformerType(e.target.value)}
//                     >
//                       <option value="PerformingGroup">PerformingGroup</option>
//                       <option value="Person">Person</option>
//                     </select>
//                   </div>

//                   <div className="mt-5">
//                     <label
//                       for="first_name"
//                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Paste Image Url"
//                       value={performerName}
//                       onChange={(e) => setPerformerName(e.target.value)}
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
//             </div>
//             <CopyToClipboard
//               text={`<script type="application/ld+json">\n${jsonText}\n</script>`}
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
