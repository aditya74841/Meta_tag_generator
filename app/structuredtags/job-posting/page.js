"use client";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { countries, currencies } from "@/app/constant";
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
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Work as JobIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Public as RemoteIcon,
  Place as OnsiteIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Description as DescriptionIcon,
  Link as LinkIcon,
  Home as AddressIcon,
  Public as PublicIcon,
} from "@mui/icons-material";

const JobPosting = () => {
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let day = d.getDate();
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  };

  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postedDate, setPostedDate] = useState(formatDate(new Date()));
  const [expiryDate, setExpiryDate] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [employmentType, setEmploymentType] = useState("FULL_TIME");
  const [includeSalary, setIncludeSalary] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [perTime, setPerTime] = useState("YEAR");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!description.trim())
      newErrors.description = "Job description is required";
    if (!companyName.trim()) newErrors.companyName = "Company name is required";
    if (!postedDate) newErrors.postedDate = "Posted date is required";
    if (!expiryDate) newErrors.expiryDate = "Expiry date is required";

    // Date validation
    if (
      postedDate &&
      expiryDate &&
      new Date(postedDate) >= new Date(expiryDate)
    ) {
      newErrors.expiryDate = "Expiry date must be after posted date";
    }

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (companyUrl && !urlPattern.test(companyUrl)) {
      newErrors.companyUrl =
        "Please enter a valid URL starting with http:// or https://";
    }

    // Country validation
    if (!country) newErrors.country = "Country is required";

    // Salary validation
    if (includeSalary) {
      if (!minSalary || minSalary <= 0)
        newErrors.minSalary = "Valid minimum salary is required";
      if (!maxSalary || maxSalary <= 0)
        newErrors.maxSalary = "Valid maximum salary is required";
      if (
        minSalary &&
        maxSalary &&
        parseFloat(minSalary) >= parseFloat(maxSalary)
      ) {
        newErrors.maxSalary =
          "Maximum salary must be higher than minimum salary";
      }
      if (!currency) newErrors.currency = "Currency is required";
      if (!perTime) newErrors.perTime = "Pay period is required";
    }

    // Location validation for non-remote jobs
    if (!isRemote) {
      if (!city.trim())
        newErrors.city = "City is required for office-based jobs";
      if (!state.trim())
        newErrors.state = "State/Province is required for office-based jobs";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [
    jobTitle,
    description,
    companyName,
    postedDate,
    expiryDate,
    companyUrl,
    country,
    includeSalary,
    minSalary,
    maxSalary,
    currency,
    perTime,
    isRemote,
    city,
    state,
  ]);

  const jsonData = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: jobTitle,
    description: description,
    datePosted: postedDate,
    validThrough: expiryDate,
    hiringOrganization: {
      "@type": "Organization",
      name: companyName,
      ...(companyUrl && { sameAs: companyUrl }),
    },
    employmentType: [employmentType],
    ...(includeSalary &&
      minSalary &&
      maxSalary && {
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: currency,
          value: {
            "@type": "QuantitativeValue",
            minValue: parseFloat(minSalary),
            maxValue: parseFloat(maxSalary),
            unitText: perTime,
          },
        },
      }),
    ...(isRemote
      ? {
          jobLocationType: "TELECOMMUTE",
          ...(country && {
            applicantLocationRequirements: {
              "@type": "Country",
              name: country,
            },
          }),
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              ...(streetAddress && { streetAddress: streetAddress }),
              ...(city && { addressLocality: city }),
              ...(state && { addressRegion: state }),
              ...(zipCode && { postalCode: zipCode }),
              ...(country && { addressCountry: country }),
            },
          },
        }),
  };

  const jsonText = JSON.stringify(jsonData, null, 2);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid =
    Object.keys(errors).length === 0 &&
    jobTitle.trim() &&
    description.trim() &&
    companyName.trim() &&
    postedDate &&
    expiryDate &&
    country;

  const getEmploymentTypeLabel = (type) => {
    const types = {
      FULL_TIME: "Full Time",
      PART_TIME: "Part Time",
      CONTRACTOR: "Contractor",
      TEMPORARY: "Temporary",
      INTERN: "Intern",
      VOLUNTEER: "Volunteer",
      PER_DIEM: "Per Diem",
      OTHER: "Other",
    };
    return types[type] || type;
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
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <JobIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Job Posting Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create structured data for job postings to enhance visibility in
              search results and job boards.
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
                JOB POSTING CONFIGURATION
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
                {/* Basic Information */}
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    color="primary"
                    fontWeight="bold"
                  >
                    Job Information
                  </Typography>
                </Grid>

                {/* Job Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Job Title *"
                    placeholder="e.g., Senior Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    error={!!errors.jobTitle}
                    helperText={
                      errors.jobTitle || `${jobTitle.length} characters`
                    }
                    InputProps={{
                      startAdornment: (
                        <JobIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Job Description *"
                    placeholder="Detailed job description, responsibilities, and requirements..."
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={!!errors.description}
                    helperText={
                      errors.description ||
                      `${description.length} characters (recommended: 200+ for better SEO)`
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

                {/* Employment Type */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Employment Type</InputLabel>
                    <Select
                      value={employmentType}
                      label="Employment Type"
                      onChange={(e) => setEmploymentType(e.target.value)}
                    >
                      <MenuItem value="FULL_TIME">Full Time</MenuItem>
                      <MenuItem value="PART_TIME">Part Time</MenuItem>
                      <MenuItem value="CONTRACTOR">Contractor</MenuItem>
                      <MenuItem value="TEMPORARY">Temporary</MenuItem>
                      <MenuItem value="INTERN">Intern</MenuItem>
                      <MenuItem value="VOLUNTEER">Volunteer</MenuItem>
                      <MenuItem value="PER_DIEM">Per Diem</MenuItem>
                      <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Work Location Type */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Work Location</InputLabel>
                    <Select
                      value={isRemote ? "remote" : "onsite"}
                      label="Work Location"
                      onChange={(e) => setIsRemote(e.target.value === "remote")}
                    >
                      <MenuItem value="onsite">
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <OnsiteIcon fontSize="small" />
                          On-site
                        </Box>
                      </MenuItem>
                      <MenuItem value="remote">
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <RemoteIcon fontSize="small" />
                          100% Remote
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Dates */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Posted Date *"
                    type="date"
                    value={postedDate}
                    onChange={(e) => setPostedDate(e.target.value)}
                    error={!!errors.postedDate}
                    helperText={errors.postedDate}
                    InputProps={{
                      startAdornment: (
                        <CalendarIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date *"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    error={!!errors.expiryDate}
                    helperText={errors.expiryDate}
                    InputProps={{
                      startAdornment: (
                        <CalendarIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                {/* Company Information */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Company Information" />
                  </Divider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Name *"
                    placeholder="Your Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    error={!!errors.companyName}
                    helperText={errors.companyName}
                    InputProps={{
                      startAdornment: (
                        <BusinessIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Website"
                    placeholder="https://company.com"
                    value={companyUrl}
                    onChange={(e) => setCompanyUrl(e.target.value)}
                    error={!!errors.companyUrl}
                    helperText={errors.companyUrl || "Optional but recommended"}
                    InputProps={{
                      startAdornment: (
                        <LinkIcon sx={{ mr: 1, color: "action.active" }} />
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
                  <FormControlLabel
                    control={
                      <Switch
                        checked={includeSalary}
                        onChange={(e) => setIncludeSalary(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <MoneyIcon fontSize="small" />
                        Include Salary Information
                      </Box>
                    }
                  />
                </Grid>

                {/* Salary Section */}
                <Collapse in={includeSalary} className="p-6">
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                      >
                        <MoneyIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Salary Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Minimum Salary *"
                        type="number"
                        placeholder="50000"
                        value={minSalary}
                        onChange={(e) => setMinSalary(e.target.value)}
                        error={!!errors.minSalary}
                        helperText={errors.minSalary}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Maximum Salary *"
                        type="number"
                        placeholder="80000"
                        value={maxSalary}
                        onChange={(e) => setMaxSalary(e.target.value)}
                        error={!!errors.maxSalary}
                        helperText={errors.maxSalary}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <FormControl fullWidth error={!!errors.currency}>
                        <InputLabel>Currency</InputLabel>
                        <Select
                          value={currency}
                          label="Currency"
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          {currencies.map((curr) => (
                            <MenuItem key={curr.value} value={curr.value}>
                              {curr.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <FormControl fullWidth error={!!errors.perTime}>
                        <InputLabel>Per</InputLabel>
                        <Select
                          value={perTime}
                          label="Per"
                          onChange={(e) => setPerTime(e.target.value)}
                        >
                          <MenuItem value="HOUR">Hour</MenuItem>
                          <MenuItem value="DAY">Day</MenuItem>
                          <MenuItem value="WEEK">Week</MenuItem>
                          <MenuItem value="MONTH">Month</MenuItem>
                          <MenuItem value="YEAR">Year</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Collapse>

                {/* Location Section */}
                {/* <Collapse in={!isRemote}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        <LocationIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Office Location
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Street Address"
                        placeholder="123 Main Street"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        InputProps={{
                          startAdornment: <AddressIcon sx={{ mr: 1, color: "action.active" }} />,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={isRemote ? "City" : "City *"}
                        placeholder="New York"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        error={!!errors.city}
                        helperText={errors.city}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={isRemote ? "State/Province" : "State/Province *"}
                        placeholder="NY"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        error={!!errors.state}
                        helperText={errors.state}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="ZIP/Postal Code"
                        placeholder="10001"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Collapse> */}
                {/* Location Section - Properly Aligned Design */}
                <Collapse in={!isRemote} className="p-6">
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}
                    
                    >
                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                      >
                        <LocationIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Office Location
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Provide the physical address where employees will work
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Street Address"
                        placeholder="123 Main Street, Suite 100"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        error={!!errors.streetAddress}
                        helperText={
                          errors.streetAddress ||
                          "Complete street address including suite/floor if applicable"
                        }
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
                        label={!isRemote ? "City *" : "City"}
                        placeholder="New York"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        error={!!errors.city}
                        helperText={errors.city}
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
                        label={
                          !isRemote ? "State/Province *" : "State/Province"
                        }
                        placeholder="New York"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        error={!!errors.state}
                        helperText={errors.state}
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
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        error={!!errors.zipCode}
                        helperText={errors.zipCode}
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
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{ mt: 0.5, ml: 1 }}
                          >
                            {errors.country}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Collapse>
                {/* Country (always shown) */}
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
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ mt: 0.5, ml: 1 }}
                      >
                        {errors.country}
                      </Typography>
                    )}
                  </FormControl>
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
            {/* Job Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  JOB POSTING PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {jobTitle || "Job Title"}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <BusinessIcon fontSize="small" />
                    <Typography variant="body2">
                      {companyName || "Company Name"}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    {isRemote ? (
                      <RemoteIcon fontSize="small" />
                    ) : (
                      <LocationIcon fontSize="small" />
                    )}
                    <Typography variant="body2">
                      {isRemote
                        ? `Remote • ${country || "Country"}`
                        : `${city ? `${city}, ` : ""}${state || "Location"}`}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                      label={getEmploymentTypeLabel(employmentType)}
                      size="small"
                      color="primary"
                    />
                    {isRemote && (
                      <Chip
                        icon={<RemoteIcon />}
                        label="Remote"
                        size="small"
                        color="info"
                      />
                    )}
                  </Stack>

                  {includeSalary && minSalary && maxSalary && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <MoneyIcon fontSize="small" />
                      <Typography variant="body2" fontWeight="bold">
                        {currency} {minSalary} - {maxSalary} per{" "}
                        {perTime.toLowerCase()}
                      </Typography>
                    </Box>
                  )}

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description
                      ? `${description.substring(0, 150)}${
                          description.length > 150 ? "..." : ""
                        }`
                      : "Job description will appear here..."}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <CalendarIcon fontSize="small" />
                    <Typography variant="caption" color="text.secondary">
                      Posted: {postedDate || "Not set"} • Expires:{" "}
                      {expiryDate || "Not set"}
                    </Typography>
                  </Box>
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
                    severity={jobTitle.trim() ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Job Title: {jobTitle.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={description.trim() ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Description:{" "}
                      {description.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={companyName.trim() ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Company: {companyName.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={postedDate && expiryDate ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Dates:{" "}
                      {postedDate && expiryDate
                        ? "✓ Set"
                        : "✗ Both dates required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={country ? "success" : "error"}
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Country: {country ? "✓ Selected" : "✗ Required"}
                    </Typography>
                  </Alert>

                  <Alert
                    severity={
                      includeSalary
                        ? minSalary && maxSalary
                          ? "success"
                          : "warning"
                        : "info"
                    }
                    variant="outlined"
                  >
                    <Typography variant="caption">
                      Salary:{" "}
                      {includeSalary
                        ? minSalary && maxSalary
                          ? "✓ Complete"
                          : "⚠ Incomplete"
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

export default JobPosting;

// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { countries, currencies, timezones } from "@/app/constant";
// const JobPosting = () => {
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     let month = d.getMonth() + 1;
//     if (month < 10) month = `0${month}`;
//     let day = d.getDate();
//     if (day < 10) day = `0${day}`;
//     return `${year}-${month}-${day}`;
//   };

//   const [jobTitle, setJobTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [postedDate, setPostedDate] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [companyName, setCompanyName] = useState("");
//   const [companyUrl, setCompanyUrl] = useState("");
//   const [employmentType, setEmploymentType] = useState("FULL TIME");
//   const [includeSalary, setIncludeSalary] = useState(false);
//   const [isRemote, setIsRemote] = useState(false);
//   const [minSalary, setMinSalary] = useState(0);
//   const [maxSalary, setMaxSalary] = useState(0);
//   const [currency, setCurrency] = useState("");
//   const [perTime, setPerTime] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [country, setCountry] = useState("");

//   const jsonData = {
//     "@context": "http://schema.org/",
//     "@type": "JobPosting",
//     title: jobTitle,
//     description: description,
//     datePosted: formatDate(postedDate),
//     validThrough: formatDate(expiryDate),
//     hiringOrganization: {
//       "@type": "Organization",
//       sameAs: companyUrl,
//       name: companyName,
//     },
//     employmentType: [employmentType],
//     // Check if includeSalary is true
//     ...(includeSalary && {
//       baseSalary: {
//         "@type": "MonetaryAmount",
//         currency: currency,
//         value: {
//           "@type": "QuantitativeValue",
//           minValue: minSalary,
//           maxValue: maxSalary,
//           unitText: perTime,
//         },
//       },
//     }),
//     // Check if isRemote is true
//     ...(isRemote
//       ? {
//           jobLocationType: "TELECOMMUTE",
//           applicantLocationRequirements: {
//             "@type": "Country",
//             name: country,
//           },
//         }
//       : {
//           jobLocation: {
//             "@type": "Place",
//             address: {
//               streetAddress: streetAddress,
//               addressLocality: city,
//               addressRegion: state,
//               postalCode: zipCode,
//               addressCountry: country,
//             },
//           },
//         }),
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
//                   Job Title
//                 </label>
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
//                   Posted Date
//                 </label>
//                 <input
//                   type="date"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={postedDate}
//                   onChange={(e) => setPostedDate(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Expiry Date
//                 </label>
//                 <input
//                   type="date"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={expiryDate}
//                   onChange={(e) => setExpiryDate(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Company Name
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Company Name"
//                   value={companyName}
//                   onChange={(e) => setCompanyName(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <label
//                   for="first_name"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Company Url
//                 </label>
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Company Url"
//                   value={companyUrl}
//                   onChange={(e) => setCompanyUrl(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <label
//                   htmlFor="type"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Employment Type
//                 </label>
//                 <select
//                   id="type"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={employmentType}
//                   onChange={(e) => setEmploymentType(e.target.value)}
//                 >
//                   <option value="Contractor">Contractor</option>
//                   <option value="Full time">Full time</option>
//                   <option value="Intern">Intern</option>
//                   <option value="Other">Other</option>
//                   <option value="Part time">Part time</option>
//                   <option value="Per diem">Per diem</option>
//                   <option value="Temporary">Temporary</option>
//                 </select>
//               </div>

//               <div class="flex items-center mb-4 mt-5">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => {
//                     setIncludeSalary(!includeSalary);
//                   }}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include Salary
//                 </label>
//               </div>

//               <div class="flex items-center mb-4">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => {
//                     setIsRemote(!isRemote);
//                   }}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   100% remote
//                 </label>
//               </div>

//               {includeSalary && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Salary </h1>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Minimum salary"
//                       value={minSalary}
//                       onChange={(e) => setMinSalary(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Maximum salary"
//                       value={maxSalary}
//                       onChange={(e) => setMaxSalary(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <select
//                       id="type"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={currency}
//                       onChange={(e) => setCurrency(e.target.value)}
//                     >
//                       <option>Select Currency</option>
//                       {currencies.map((currency) => (
//                         <option key={currency.value} value={currency.value}>
//                           {currency.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="mt-5">
//                     <select
//                       id="type"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={perTime}
//                       onChange={(e) => setPerTime(e.target.value)}
//                     >
//                       <option>Select Per Time</option>
//                       <option value="Hour">Hour</option>
//                       <option value="Day">Day</option>
//                       <option value="Week">Week</option>
//                       <option value="Month">Month</option>

//                       <option value="Year">Year</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               {!isRemote && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Location </h1>

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
//                       value={zipCode}
//                       onChange={(e) => setZipCode(e.target.value)}
//                     />
//                   </div>
//                 </>
//               )}
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

// export default JobPosting;
