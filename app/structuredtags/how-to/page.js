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
  FormControlLabel,
  Switch,
  Collapse,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  PlaylistAddCheck as HowToIcon,
  CheckCircle as CheckIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Build as ToolIcon,
  Inventory as SupplyIcon,
  Schedule as TimeIcon,
  AttachMoney as MoneyIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  List as StepIcon,
  Description as InstructionIcon,
  Timeline as TimelineIcon,
  CheckBox as CheckBoxIcon,
} from "@mui/icons-material";

const HowTo = () => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [currencyType, setCurrencyType] = useState("USD");
  const [totalTime, setTotalTime] = useState("");
  const [timeType, setTimeType] = useState("Minutes");
  const [isIncludeTools, setIsIncludeTools] = useState(false);
  const [isIncludeSupply, setIsIncludeSupply] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const [supplies, setSupplies] = useState([{ name: "" }]);
  const [tools, setTools] = useState([{ name: "" }]);
  const [steps, setSteps] = useState([
    { name: "", instructions: "", imageUrl: "", url: "" },
  ]);

  // Supply handlers
  const handleAddSupply = () => {
    setSupplies([...supplies, { name: "" }]);
  };

  const handleDeleteSupply = (index) => {
    if (supplies.length > 1) {
      const updatedSupplies = [...supplies];
      updatedSupplies.splice(index, 1);
      setSupplies(updatedSupplies);
    }
  };

  const handleSupplyChange = (index, value) => {
    const updatedSupplies = [...supplies];
    updatedSupplies[index].name = value;
    setSupplies(updatedSupplies);
  };

  // Tool handlers
  const handleAddTools = () => {
    setTools([...tools, { name: "" }]);
  };

  const handleDeleteTools = (index) => {
    if (tools.length > 1) {
      const updatedTools = [...tools];
      updatedTools.splice(index, 1);
      setTools(updatedTools);
    }
  };

  const handleToolChange = (index, value) => {
    const updatedTools = [...tools];
    updatedTools[index].name = value;
    setTools(updatedTools);
  };

  // Step handlers
  const handleAddStep = () => {
    setSteps([...steps, { name: "", instructions: "", imageUrl: "", url: "" }]);
  };

  const handleDeleteStep = (index) => {
    if (steps.length > 1) {
      const updatedSteps = [...steps];
      updatedSteps.splice(index, 1);
      setSteps(updatedSteps);
    }
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!eventName.trim()) newErrors.eventName = "How-to title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (totalTime && totalTime <= 0) newErrors.totalTime = "Valid time duration is required";
    if (price && price <= 0) newErrors.price = "Valid cost is required";

    // Validate URL format
    const urlPattern = /^https?:\/\/.+/;
    if (imageUrl && !urlPattern.test(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL starting with http:// or https://";
    }

    // Validate steps
    steps.forEach((step, index) => {
      if (!step.name.trim()) newErrors[`step_name_${index}`] = "Step name is required";
      if (!step.instructions.trim()) newErrors[`step_instructions_${index}`] = "Instructions are required";
      if (step.url && !urlPattern.test(step.url)) {
        newErrors[`step_url_${index}`] = "Please enter a valid URL";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [eventName, description, totalTime, price, imageUrl, steps]);

  const generateJSON = () => {
    const supplyArray = isIncludeSupply
      ? supplies.filter(supply => supply.name.trim()).map((supply) => ({
          "@type": "HowToSupply",
          name: supply.name,
        }))
      : [];
    
    const toolArray = isIncludeTools
      ? tools.filter(tool => tool.name.trim()).map((tool) => ({ 
          "@type": "HowToTool", 
          name: tool.name 
        }))
      : [];
    
    const stepArray = steps.filter(step => step.name.trim() && step.instructions.trim()).map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.instructions,
      ...(step.imageUrl && { image: step.imageUrl }),
      ...(step.url && { url: step.url }),
    }));

    const json = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: eventName,
      description: description,
      ...(imageUrl && { image: imageUrl }),
      ...(totalTime && timeType && { 
        totalTime: `PT${totalTime}${timeType.charAt(0).toUpperCase()}` 
      }),
      ...(price && {
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: currencyType,
          value: price,
        },
      }),
      ...(isIncludeSupply && supplyArray.length > 0 && { supply: supplyArray }),
      ...(isIncludeTools && toolArray.length > 0 && { tool: toolArray }),
      step: stepArray,
    };

    return JSON.stringify(json, null, 2);
  };

  const jsonText = generateJSON();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validStepsCount = steps.filter(step => step.name.trim() && step.instructions.trim()).length;
  const isFormValid = Object.keys(errors).length === 0 && eventName.trim() && description.trim() && validStepsCount > 0;

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
          <HowToIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              How-To Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create structured data for step-by-step guides and tutorials to enhance search visibility.
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
                HOW-TO CONFIGURATION
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

                {/* Title */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="How-To Title *"
                    placeholder="How to..."
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    error={!!errors.eventName}
                    helperText={errors.eventName || `${eventName.length} characters`}
                    InputProps={{
                      startAdornment: <HowToIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description *"
                    placeholder="Describe what this guide teaches..."
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={!!errors.description}
                    helperText={errors.description || `${description.length} characters (recommended: 50-160 for SEO)`}
                    InputProps={{
                      startAdornment: <InstructionIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* Image URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Featured Image URL"
                    placeholder="https://example.com/how-to-image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    error={!!errors.imageUrl}
                    helperText={errors.imageUrl || "Main image for the how-to guide"}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Time and Cost */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Time & Cost Estimation" />
                  </Divider>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Total Time"
                    type="number"
                    placeholder="30"
                    value={totalTime}
                    onChange={(e) => setTotalTime(e.target.value)}
                    error={!!errors.totalTime}
                    helperText={errors.totalTime}
                    InputProps={{
                      startAdornment: <TimeIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={2}>
                  <FormControl fullWidth>
                    <InputLabel>Time Unit</InputLabel>
                    <Select
                      value={timeType}
                      label="Time Unit"
                      onChange={(e) => setTimeType(e.target.value)}
                    >
                      <MenuItem value="Minutes">Minutes</MenuItem>
                      <MenuItem value="Hours">Hours</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Estimated Cost"
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

                <Grid item xs={12} sm={2}>
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

                {/* Optional Sections */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Optional Resources" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isIncludeSupply}
                          onChange={(e) => setIsIncludeSupply(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <SupplyIcon fontSize="small" />
                          Include Supplies
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isIncludeTools}
                          onChange={(e) => setIsIncludeTools(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <ToolIcon fontSize="small" />
                          Include Tools
                        </Box>
                      }
                    />
                  </Stack>
                </Grid>

                {/* Supplies Section */}
                <Collapse in={isIncludeSupply} className="px-4">
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        <SupplyIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Supplies (Consumed Items)
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Items that will be used up during the process
                      </Typography>
                    </Grid>
                    {supplies.map((supply, index) => (
                      <Grid item xs={12} key={index}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <TextField
                              fullWidth
                              label={`Supply #${index + 1}`}
                              placeholder="e.g., Paint, Glue, Paper"
                              value={supply.name}
                              onChange={(e) => handleSupplyChange(index, e.target.value)}
                              size="small"
                            />
                            {supplies.length > 1 && (
                              <IconButton
                                onClick={() => handleDeleteSupply(index)}
                                color="error"
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Button
                        onClick={handleAddSupply}
                        variant="outlined"
                        startIcon={<AddIcon />}
                        fullWidth
                        sx={{ borderStyle: "dashed" }}
                      >
                        Add Supply
                      </Button>
                    </Grid>
                  </Grid>
                </Collapse>

                {/* Tools Section */}
                <Collapse in={isIncludeTools} className="px-4">
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        <ToolIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Tools (Reusable Items)
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Tools and equipment needed but not consumed
                      </Typography>
                    </Grid>
                    {tools.map((tool, index) => (
                      <Grid item xs={12} key={index}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            <TextField
                              fullWidth
                              label={`Tool #${index + 1}`}
                              placeholder="e.g., Hammer, Screwdriver, Measuring tape"
                              value={tool.name}
                              onChange={(e) => handleToolChange(index, e.target.value)}
                              size="small"
                            />
                            {tools.length > 1 && (
                              <IconButton
                                onClick={() => handleDeleteTools(index)}
                                color="error"
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Button
                        onClick={handleAddTools}
                        variant="outlined"
                        startIcon={<AddIcon />}
                        fullWidth
                        sx={{ borderStyle: "dashed" }}
                      >
                        Add Tool
                      </Button>
                    </Grid>
                  </Grid>
                </Collapse>

                {/* Steps Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Step-by-Step Instructions" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <StepIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Steps ({validStepsCount} valid)
                  </Typography>
                  
                  <Stack spacing={2}>
                    {steps.map((step, index) => (
                      <Card 
                        key={index} 
                        variant="outlined" 
                        sx={{ 
                          border: step.name.trim() && step.instructions.trim() ? "2px solid #4CAF50" : "1px solid #e0e0e0",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <CardContent>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight="bold" color="primary">
                              Step {index + 1}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                              {step.name.trim() && step.instructions.trim() ? (
                                <Chip icon={<CheckIcon />} label="Complete" color="success" size="small" />
                              ) : (
                                <Chip icon={<WarningIcon />} label="Incomplete" color="warning" size="small" />
                              )}
                              {steps.length > 1 && (
                                <IconButton
                                  onClick={() => handleDeleteStep(index)}
                                  color="error"
                                  size="small"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              )}
                            </Box>
                          </Box>

                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Step Name *"
                                placeholder="Brief description of this step"
                                value={step.name}
                                onChange={(e) => handleStepChange(index, "name", e.target.value)}
                                error={!!errors[`step_name_${index}`]}
                                helperText={errors[`step_name_${index}`]}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Instructions *"
                                placeholder="Detailed instructions for this step"
                                multiline
                                rows={3}
                                value={step.instructions}
                                onChange={(e) => handleStepChange(index, "instructions", e.target.value)}
                                error={!!errors[`step_instructions_${index}`]}
                                helperText={errors[`step_instructions_${index}`] || `${step.instructions.length} characters`}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Step Image URL"
                                placeholder="https://example.com/step-image.jpg"
                                value={step.imageUrl}
                                onChange={(e) => handleStepChange(index, "imageUrl", e.target.value)}
                                size="small"
                                InputProps={{
                                  startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Step URL"
                                placeholder="https://example.com#step1"
                                value={step.url}
                                onChange={(e) => handleStepChange(index, "url", e.target.value)}
                                error={!!errors[`step_url_${index}`]}
                                helperText={errors[`step_url_${index}`] || "Optional anchor link to this step"}
                                size="small"
                                InputProps={{
                                  startAdornment: <LinkIcon sx={{ mr: 1, color: "action.active" }} />,
                                }}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    ))}

                    <Button
                      onClick={handleAddStep}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{ borderStyle: "dashed", py: 1.5 }}
                    >
                      Add Step
                    </Button>
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
            {/* How-To Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  HOW-TO PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                {imageUrl ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={imageUrl}
                    alt="How-to guide image"
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
                    <HowToIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No image selected
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {eventName || "How-To Guide Title"}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description || "Guide description will appear here..."}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {totalTime && (
                      <Chip 
                        icon={<TimeIcon />} 
                        label={`${totalTime} ${timeType.toLowerCase()}`} 
                        size="small" 
                        color="primary" 
                      />
                    )}
                    {price && (
                      <Chip 
                        icon={<MoneyIcon />} 
                        label={`${price} ${currencyType}`} 
                        size="small" 
                        color="secondary" 
                      />
                    )}
                  </Stack>

                  <Typography variant="subtitle2" gutterBottom>
                    Steps ({validStepsCount}):
                  </Typography>
                  
                  <Stepper orientation="vertical" sx={{ pl: 0 }}>
                    {steps.filter(step => step.name.trim()).slice(0, 3).map((step, index) => (
                      <Step key={index} active={true}>
                        <StepLabel>
                          <Typography variant="body2" fontWeight="bold">
                            {step.name}
                          </Typography>
                        </StepLabel>
                        <StepContent>
                          <Typography variant="caption" color="text.secondary">
                            {step.instructions.substring(0, 100)}{step.instructions.length > 100 ? "..." : ""}
                          </Typography>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  
                  {validStepsCount > 3 && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                      +{validStepsCount - 3} more steps...
                    </Typography>
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
                      Title: {eventName.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={description.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Description: {description.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={validStepsCount >= 2 ? "success" : "warning"} variant="outlined">
                    <Typography variant="caption">
                      Steps: {validStepsCount >= 2 ? `✓ ${validStepsCount} steps` : `⚠ ${validStepsCount} step${validStepsCount !== 1 ? 's' : ''} (2+ recommended)`}
                    </Typography>
                  </Alert>

                  <Alert severity={totalTime ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Duration: {totalTime ? `✓ ${totalTime} ${timeType.toLowerCase()}` : "ℹ Optional but recommended"}
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

export default HowTo;



// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { currencies, timezones } from "@/app/constant";
// const HowTo = () => {
//   const [isIncludeTools, setIsIncludeTools] = useState(false);
//   const [isIncludeSupply, setIsIncludeSupply] = useState(false);
//   const [eventName, setEventName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [price, setPrice] = useState("");
//   const [currencyType, setCurrencyType] = useState("USD");
//   const [totalTime, setTotalTime] = useState(0);
//   const [timeType, setTimeType] = useState("");

//   const [supplies, setSupplies] = useState([{ name: "" }]);

//   const handleAddSupply = () => {
//     setSupplies([...supplies, { name: "" }]);
//   };

//   const handleDeleteSupply = (index) => {
//     const updatedsupplies = [...supplies];
//     updatedsupplies.splice(index, 1);
//     setSupplies(updatedsupplies);
//   };

//   const [tools, setTools] = useState([{ name: "" }]);

//   const handleAddTools = () => {
//     setTools([...tools, { name: "" }]);
//   };

//   const handleDeleteTools = (index) => {
//     const updatedtools = [...tools];
//     updatedtools.splice(index, 1);
//     setTools(updatedtools);
//   };

//   const [steps, setSteps] = useState([
//     { name: "", instructions: "", imageUrl: "", url: "" },
//   ]);

//   const handleAddStep = () => {
//     setSteps([...steps, { name: "", instructions: "", imageUrl: "", url: "" }]);
//   };

//   const handleDeleteStep = (index) => {
//     const updatedSteps = [...steps];
//     updatedSteps.splice(index, 1);
//     setSteps(updatedSteps);
//   };

//   const generateJSON = () => {
//     const supplyArray = isIncludeSupply
//       ? supplies.map((supply) => ({
//           "@type": "HowToSupply",
//           name: supply.name,
//         }))
//       : [];
//     const toolArray = isIncludeTools
//       ? tools.map((tool) => ({ "@type": "HowToTool", name: tool.name }))
//       : [];
//     const stepArray = steps.map((step) => ({
//       "@type": "HowToStep",
//       name: step.name,
//       text: step.instructions,
//       image: step.imageUrl,
//       url: step.url,
//     }));

//     const json = {
//       "@context": "http://schema.org/",
//       "@type": "HowTo",
//       name: eventName,
//       description: description,
//       image: imageUrl,
//       totalTime: `PT${totalTime}${timeType.charAt(0).toUpperCase()}`,
//       estimatedCost: {
//         "@type": "MonetaryAmount",
//         currency: currencyType,
//         value: price,
//       },
//       ...(isIncludeSupply && { supply: supplyArray }),
//       ...(isIncludeTools && { tool: toolArray }),
//       step: stepArray,
//     };

//     return JSON.stringify(json, null, 2);
//   };
//   const jsonText = generateJSON();

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//       How-to Structured Data Generator

//       </h1>
  
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

//               <div className="mt-5 flex justify-between">
//                 <div className="w-4/6">
//                   <label
//                     for="first_name"
//                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Estimate Cost
//                   </label>
//                   <input
//                     type="number"
//                     id="first_name"
//                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Estimate Cost"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                   />
//                 </div>
//                 <div className="w-1/4 ml-auto">
//                   <label
//                     htmlFor="type"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Currency Type
//                   </label>
//                   <select
//                     id="type"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     value={currencyType}
//                     onChange={(e) => setCurrencyType(e.target.value)}
//                   >
//                     {currencies.map((currency) => (
//                       <option key={currency.value} value={currency.value}>
//                         {currency.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
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

//               <div className="mt-5 flex justify-between">
//                 <div className="w-4/6">
//                   <label
//                     for="first_name"
//                     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Total Time
//                   </label>
//                   <input
//                     type="number"
//                     id="first_name"
//                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Estimate Cost"
//                     value={totalTime}
//                     onChange={(e) => setTotalTime(e.target.value)}
//                   />
//                 </div>
//                 <div className="w-1/4 ml-auto">
//                   <label
//                     htmlFor="type"
//                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     Time Type
//                   </label>
//                   <select
//                     id="type"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     value={timeType}
//                     onChange={(e) => setTimeType(e.target.value)}
//                   >
//                     <option value="Minutes">Minutes</option>
//                     <option value="Hours">Hours</option>
//                   </select>
//                 </div>
//               </div>

//               <div class="flex mt-5 ">
//                 <div class="flex items-center h-5 mt-1">
//                   <input
//                     id="helper-checkbox"
//                     aria-describedby="helper-checkbox-text"
//                     type="checkbox"
//                     class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     value={isIncludeSupply}
//                     // defaultChecked
//                     onChange={(e) => setIsIncludeSupply(!isIncludeSupply)}
//                   />
//                 </div>
//                 <div class="ml-4 ">
//                   <label
//                     for="helper-checkbox"
//                     class="font-medium text-gray-900 dark:text-gray-300 text-lg"
//                   >
//                     Include Supplies
//                   </label>
//                   <p
//                     id="helper-checkbox-text"
//                     class="text-xs font-normal text-gray-500 dark:text-gray-300"
//                   >
//                     A supply consumed when performing the instructions.
//                   </p>
//                 </div>
//               </div>

//               <div class="flex mt-5 ">
//                 <div class="flex items-center h-5 mt-1">
//                   <input
//                     id="helper-checkbox"
//                     aria-describedby="helper-checkbox-text"
//                     type="checkbox"
//                     class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     value={isIncludeTools}
//                     onChange={(e) => setIsIncludeTools(!isIncludeTools)}
//                   />
//                 </div>
//                 <div class="ml-4 ">
//                   <label
//                     for="helper-checkbox"
//                     class="font-medium text-gray-900 dark:text-gray-300 text-lg"
//                   >
//                     Include Tools
//                   </label>
//                   <p
//                     id="helper-checkbox-text"
//                     class="text-xs font-normal text-gray-500 dark:text-gray-300"
//                   >
//                     A tool used (but not consumed) when performing instructions.
//                   </p>
//                 </div>
//               </div>

//               {isIncludeSupply && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Supplies </h1>

//                   <div className="mt-5">
//                     {supplies.map((supply, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center  justify-center space-x-3 space-y-2"
//                       >
//                         <input
//                           type="text"
//                           className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                           placeholder={`Supply #${index + 1}`}
//                           value={supply.name}
//                           onChange={(e) => {
//                             const updatedsupplies = [...supplies];
//                             updatedsupplies[index].name = e.target.value;
//                             setSupplies(updatedsupplies);
//                           }}
//                         />

//                         {supplies.length > 1 && (
//                           <button
//                             type="button"
//                             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
//                             onClick={() => handleDeleteSupply(index)}
//                           >
//                             Delete
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Add button to add musician */}
//                   <div className="mt-5">
//                     <button
//                       type="button"
//                       className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       onClick={handleAddSupply}
//                     >
//                       Add Supply
//                     </button>
//                   </div>
//                 </>
//               )}

//               {isIncludeTools && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Tools </h1>

//                   <div className="mt-5">
//                     {tools.map((tool, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center  justify-center space-x-3 space-y-2"
//                       >
//                         <input
//                           type="text"
//                           className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                           placeholder={`Tool #${index + 1}`}
//                           value={tool.name}
//                           onChange={(e) => {
//                             const updatedtools = [...tools];
//                             updatedtools[index].name = e.target.value;
//                             setTools(updatedtools);
//                           }}
//                         />

//                         {tools.length > 1 && (
//                           <button
//                             type="button"
//                             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
//                             onClick={() => handleDeleteTools(index)}
//                           >
//                             Delete
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Add button to add musician */}
//                   <div className="mt-5">
//                     <button
//                       type="button"
//                       className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                       onClick={handleAddTools}
//                     >
//                       Add Tool
//                     </button>
//                   </div>
//                 </>
//               )}

//               {/* <div>
//                 <h1 className="text-white font-semibold mt-5">Step </h1>
//                 <p className="text-white text-sm font-semibold mt-2">Step #1</p>
//                 <div className="mt-5">
//                   <input
//                     type="text"
//                     id="first_name"
//                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter  Name"
//                     // value={eventName}
//                     // onChange={(e) => setEventName(e.target.value)}
//                   />
//                 </div>

//                 <div className="mt-5">
//                   <textarea
//                     id="message"
//                     rows="2"
//                     class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Instructions"
//                     // value={description}
//                     // onChange={(e) => setDescription(e.target.value)}
//                   ></textarea>
//                 </div>
//                 <div className="mt-5">
//                   <input
//                     type="text"
//                     id="first_name"
//                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Image Url"
//                     // value={eventName}
//                     // onChange={(e) => setEventName(e.target.value)}
//                   />
//                 </div>
//                 <div className="mt-5">
//                   <input
//                     type="text"
//                     id="first_name"
//                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Url"
//                     // value={eventName}
//                     // onChange={(e) => setEventName(e.target.value)}
//                   />
//                   <span className="text-white text-xs">
//                     A URL that directly links to the step (if one is available).
//                     For example, an anchor link fragment.
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-5">
//                 <button
//                   type="button"
//                   className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                
//                 >
//                   Add Step
//                 </button>
//               </div> */}
//               <div>
//                 <h1 className="text-white font-semibold mt-5">Steps </h1>
//                 {steps.map((step, index) => (
//                   <div key={index} className="mt-5">
//                     <h2 className="text-white text-sm font-semibold mt-2">
//                       Step #{index + 1}
//                     </h2>
//                     <div className="mt-5">
//                       <input
//                         type="text"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Enter Name"
//                         value={step.name}
//                         onChange={(e) => {
//                           const updatedSteps = [...steps];
//                           updatedSteps[index].name = e.target.value;
//                           setSteps(updatedSteps);
//                         }}
//                       />
//                     </div>
//                     <div className="mt-5">
//                       <textarea
//                         rows="2"
//                         className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Enter Instructions"
//                         value={step.instructions}
//                         onChange={(e) => {
//                           const updatedSteps = [...steps];
//                           updatedSteps[index].instructions = e.target.value;
//                           setSteps(updatedSteps);
//                         }}
//                       ></textarea>
//                     </div>
//                     <div className="mt-5">
//                       <input
//                         type="text"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Image Url"
//                         value={step.imageUrl}
//                         onChange={(e) => {
//                           const updatedSteps = [...steps];
//                           updatedSteps[index].imageUrl = e.target.value;
//                           setSteps(updatedSteps);
//                         }}
//                       />
//                     </div>
//                     <div className="mt-5">
//                       <input
//                         type="text"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="Url"
//                         value={step.url}
//                         onChange={(e) => {
//                           const updatedSteps = [...steps];
//                           updatedSteps[index].url = e.target.value;
//                           setSteps(updatedSteps);
//                         }}
//                       />
//                       <span className="text-white text-xs">
//                         A URL that directly links to the step (if one is
//                         available). For example, an anchor link fragment.
//                       </span>
//                     </div>
//                     {steps.length > 1 && (
//                       <div className="mt-2">
//                         <button
//                           type="button"
//                           className=" text-sm p-4 bg-red-600 text-white rounded "
//                           onClick={() => handleDeleteStep(index)}
//                         >
//                           Delete Step
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//                 <div className="mt-5">
//                   <button
//                     type="button"
//                     className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     onClick={handleAddStep}
//                   >
//                     Add Step
//                   </button>
//                 </div>
//               </div>
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

// export default HowTo;
