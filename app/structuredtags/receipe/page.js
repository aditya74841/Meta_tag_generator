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
  Rating,
  Avatar,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Restaurant as RecipeIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Image as ImageIcon,
  Timer as TimerIcon,
  Star as RatingIcon,
  VideoLibrary as VideoIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Business as OrganizationIcon,
  LocalDining as IngredientIcon,
  Assignment as StepIcon,
  Fastfood as NutritionIcon,
  Category as CategoryIcon,
  Public as CuisineIcon,
  Description as DescriptionIcon,
  DateRange as DateIcon,
  Label as KeywordIcon,
} from "@mui/icons-material";

const Recipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeCategory, setRecipeCategory] = useState("");
  const [recipeCuisine, setRecipeCuisine] = useState("");
  const [recipePrep, setRecipePrep] = useState("");
  const [recipePrepTime, setRecipePrepTime] = useState("Minutes");
  const [recipeCook, setRecipeCook] = useState("");
  const [recipeCookTime, setRecipeCookTime] = useState("Minutes");
  const [recipeTotal, setRecipeTotal] = useState("");
  const [recipeTotalTime, setRecipeTotalTime] = useState("Minutes");
  const [yieldData, setYieldData] = useState("");
  const [datePublished, setDatePublished] = useState("");
  const [description, setDescription] = useState("");  
  const [keyWords, setKeyWords] = useState("");
  const [isIncludeAuthor, setIsIncludeAuthor] = useState(true);
  const [isIncludeNutrition, setIsIncludeNutrition] = useState(true);
  const [isIncludeRating, setIsIncludeRating] = useState(false);
  const [isIncludeVideo, setIsIncludeVideo] = useState(false);
  const [authorType, setAuthorType] = useState("Person");
  const [authorName, setAuthorName] = useState("");
  const [nutritionServingSize, setNutritionServingSize] = useState("");
  const [nutritionCalories, setNutritionCalories] = useState("");
  const [nutritionCarbohydrates, setNutritionCarbohydrates] = useState("");
  const [nutritionFat, setNutritionFat] = useState("");
  const [nutritionProtein, setNutritionProtein] = useState("");
  const [nutritionSodium, setNutritionSodium] = useState("");
  const [nutritionSugar, setNutritionSugar] = useState("");
  const [numberOfRatings, setNumberOfRatings] = useState("");
  const [numberOfReviews, setNumberOfReviews] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [worstValue, setWorstValue] = useState("1");
  const [bestValue, setBestValue] = useState("5");
  const [videoName, setVideoName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoDateUploaded, setVideoDateUploaded] = useState("");
  const [videoContentUrl, setVideoContentUrl] = useState("");
  const [videoEmbedUrl, setVideoEmbedUrl] = useState("");
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const [images, setImages] = useState([{ name: "" }]);
  const [ingredients, setIngredients] = useState([{ name: "" }]);
  const [steps, setSteps] = useState([
    { name: "", instructions: "", imageUrl: "", url: "" },
  ]);

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!recipeName.trim()) newErrors.recipeName = "Recipe name is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    
    // Validate image URLs
    images.forEach((image, index) => {
      if (image.name && !urlPattern.test(image.name)) {
        newErrors[`image_${index}`] = "Please enter a valid URL";
      }
    });

    // Validate step URLs and images
    steps.forEach((step, index) => {
      if (step.imageUrl && !urlPattern.test(step.imageUrl)) {
        newErrors[`step_image_${index}`] = "Please enter a valid URL";
      }
      if (step.url && !urlPattern.test(step.url)) {
        newErrors[`step_url_${index}`] = "Please enter a valid URL";
      }
    });

    // Video validation
    if (isIncludeVideo) {
      if (videoContentUrl && !urlPattern.test(videoContentUrl)) {
        newErrors.videoContentUrl = "Please enter a valid URL";
      }
      if (videoEmbedUrl && !urlPattern.test(videoEmbedUrl)) {
        newErrors.videoEmbedUrl = "Please enter a valid URL";
      }
      if (thumbnailImageUrl && !urlPattern.test(thumbnailImageUrl)) {
        newErrors.thumbnailImageUrl = "Please enter a valid URL";
      }
    }

    // Rating validation
    if (isIncludeRating) {
      if (!ratingValue || ratingValue < 0 || ratingValue > 5) {
        newErrors.ratingValue = "Rating must be between 0 and 5";
      }
      if (!numberOfRatings || numberOfRatings <= 0) {
        newErrors.numberOfRatings = "Number of ratings is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [recipeName, images, steps, isIncludeVideo, videoContentUrl, videoEmbedUrl, thumbnailImageUrl, isIncludeRating, ratingValue, numberOfRatings]);

  // Image handlers
  const handleAddImage = () => {
    setImages([...images, { name: "" }]);
  };

  const handleDeleteImage = (index) => {
    if (images.length > 1) {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
    }
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...images];
    updatedImages[index].name = value;
    setImages(updatedImages);
  };

  // Ingredient handlers
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "" }]);
  };

  const handleDeleteIngredient = (index) => {
    if (ingredients.length > 1) {
      const updatedIngredients = [...ingredients];
      updatedIngredients.splice(index, 1);
      setIngredients(updatedIngredients);
    }
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].name = value;
    setIngredients(updatedIngredients);
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

  const generateJSON = () => {
    const validImages = images.filter(image => image.name.trim());
    const validIngredients = ingredients.filter(ingredient => ingredient.name.trim());
    const validSteps = steps.filter(step => step.name.trim() || step.instructions.trim());

    return {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: recipeName,
      ...(validImages.length > 0 && { image: validImages.map(image => image.name) }),
      ...(recipeCategory && { recipeCategory: recipeCategory }),
      ...(recipeCuisine && { recipeCuisine: recipeCuisine }),
      ...(recipePrep && recipePrepTime && {
        prepTime: `PT${recipePrep}${recipePrepTime.charAt(0).toUpperCase()}`
      }),
      ...(recipeCook && recipeCookTime && {
        cookTime: `PT${recipeCook}${recipeCookTime.charAt(0).toUpperCase()}`
      }),
      ...(recipeTotal && recipeTotalTime && {
        totalTime: `PT${recipeTotal}${recipeTotalTime.charAt(0).toUpperCase()}`
      }),
      ...(yieldData && { recipeYield: yieldData }),
      ...(datePublished && { datePublished: datePublished }),
      ...(description && { description: description }),
      ...(keyWords && { keywords: keyWords }),
      ...(isIncludeAuthor && authorName && {
        author: {
          "@type": authorType,
          name: authorName,
        }
      }),
      ...(isIncludeNutrition && {
        nutrition: {
          "@type": "NutritionInformation",
          ...(nutritionServingSize && { servingSize: nutritionServingSize }),
          ...(nutritionCalories && { calories: nutritionCalories }),
          ...(nutritionCarbohydrates && { carbohydrateContent: nutritionCarbohydrates }),
          ...(nutritionFat && { fatContent: nutritionFat }),
          ...(nutritionProtein && { proteinContent: nutritionProtein }),
          ...(nutritionSodium && { sodiumContent: nutritionSodium }),
          ...(nutritionSugar && { sugarContent: nutritionSugar }),
        }
      }),
      ...(isIncludeRating && ratingValue && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: ratingValue,
          ratingCount: numberOfRatings,
          ...(numberOfReviews && { reviewCount: numberOfReviews }),
          worstRating: worstValue,
          bestRating: bestValue,
        }
      }),
      ...(isIncludeVideo && videoName && {
        video: {
          "@type": "VideoObject",
          name: videoName,
          ...(videoDescription && { description: videoDescription }),
          ...(videoDateUploaded && { uploadDate: videoDateUploaded }),
          ...(videoContentUrl && { contentUrl: videoContentUrl }),
          ...(videoEmbedUrl && { embedUrl: videoEmbedUrl }),
          ...(thumbnailImageUrl && { thumbnailUrl: thumbnailImageUrl }),
        }
      }),
      ...(validIngredients.length > 0 && {
        recipeIngredient: validIngredients.map(ingredient => ingredient.name)
      }),
      ...(validSteps.length > 0 && {
        recipeInstructions: validSteps.map((step) => ({
          "@type": "HowToStep",
          ...(step.name && { name: step.name }),
          ...(step.instructions && { text: step.instructions }),
          ...(step.imageUrl && { image: step.imageUrl }),
          ...(step.url && { url: step.url }),
        }))
      }),
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && recipeName.trim();
  const validStepsCount = steps.filter(step => step.name.trim() || step.instructions.trim()).length;
  const validIngredientsCount = ingredients.filter(ingredient => ingredient.name.trim()).length;

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
          <RecipeIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Recipe Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create structured data for recipes with ingredients, instructions, nutrition, and more.
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
                RECIPE CONFIGURATION
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
                {/* Recipe Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <RecipeIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Recipe Details
                  </Typography>
                </Grid>

                {/* Recipe Name */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Recipe Name *"
                    placeholder="Chocolate Chip Cookies"
                    value={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                    error={!!errors.recipeName}
                    helperText={errors.recipeName || `${recipeName.length} characters`}
                    InputProps={{
                      startAdornment: <RecipeIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Category and Cuisine */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Recipe Category"
                    placeholder="Dessert, Main Course, Appetizer"
                    value={recipeCategory}
                    onChange={(e) => setRecipeCategory(e.target.value)}
                    helperText="The type of meal or course (e.g., dinner, dessert, snack)"
                    InputProps={{
                      startAdornment: <CategoryIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cuisine"
                    placeholder="Italian, Mexican, Asian"
                    value={recipeCuisine}
                    onChange={(e) => setRecipeCuisine(e.target.value)}
                    helperText="The cuisine or regional origin"
                    InputProps={{
                      startAdornment: <CuisineIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Timing Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Timing Information" />
                  </Divider>
                </Grid>

                {/* Prep Time */}
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Prep Time"
                    type="number"
                    placeholder="30"
                    value={recipePrep}
                    onChange={(e) => setRecipePrep(e.target.value)}
                    InputProps={{
                      startAdornment: <TimerIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Time Unit</InputLabel>
                    <Select
                      value={recipePrepTime}
                      label="Time Unit"
                      onChange={(e) => setRecipePrepTime(e.target.value)}
                    >
                      <MenuItem value="Minutes">Minutes</MenuItem>
                      <MenuItem value="Hours">Hours</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Cook Time */}
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Cook Time"
                    type="number"
                    placeholder="25"
                    value={recipeCook}
                    onChange={(e) => setRecipeCook(e.target.value)}
                    InputProps={{
                      startAdornment: <TimerIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Time Unit</InputLabel>
                    <Select
                      value={recipeCookTime}
                      label="Time Unit"
                      onChange={(e) => setRecipeCookTime(e.target.value)}
                    >
                      <MenuItem value="Minutes">Minutes</MenuItem>
                      <MenuItem value="Hours">Hours</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Total Time */}
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Total Time"
                    type="number"
                    placeholder="55"
                    value={recipeTotal}
                    onChange={(e) => setRecipeTotal(e.target.value)}
                    InputProps={{
                      startAdornment: <TimerIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Time Unit</InputLabel>
                    <Select
                      value={recipeTotalTime}
                      label="Time Unit"
                      onChange={(e) => setRecipeTotalTime(e.target.value)}
                    >
                      <MenuItem value="Minutes">Minutes</MenuItem>
                      <MenuItem value="Hours">Hours</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Yield and Date */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Recipe Yield"
                    placeholder="Makes 24 cookies"
                    value={yieldData}
                    onChange={(e) => setYieldData(e.target.value)}
                    helperText="Number of servings or items produced"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date Published"
                    type="date"
                    value={datePublished}
                    onChange={(e) => setDatePublished(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: <DateIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Description and Keywords */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    placeholder="Delicious homemade chocolate chip cookies..."
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    helperText={`${description.length} characters (recommended: 50+ for SEO)`}
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Keywords"
                    placeholder="cookies, dessert, baking, chocolate"
                    multiline
                    rows={2}
                    value={keyWords}
                    onChange={(e) => setKeyWords(e.target.value)}
                    helperText="Comma-separated keywords for SEO"
                    InputProps={{
                      startAdornment: <KeywordIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* Optional Sections */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Optional Information" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="column" spacing={1}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isIncludeAuthor}
                          onChange={(e) => setIsIncludeAuthor(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <PersonIcon fontSize="small" />
                          Include Author
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isIncludeNutrition}
                          onChange={(e) => setIsIncludeNutrition(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <NutritionIcon fontSize="small" />
                          Include Nutrition Information
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isIncludeRating}
                          onChange={(e) => setIsIncludeRating(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <RatingIcon fontSize="small" />
                          Include Rating
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isIncludeVideo}
                          onChange={(e) => setIsIncludeVideo(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <VideoIcon fontSize="small" />
                          Include Video
                        </Box>
                      }
                    />
                  </Stack>
                </Grid>

                {/* Images Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <ImageIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Recipe Images
                  </Typography>
                  
                  <Stack spacing={2}>
                    {images.map((image, index) => (
                      <Card key={index} variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                          <TextField
                            fullWidth
                            label={`Image #${index + 1}`}
                            placeholder="https://example.com/recipe-image.jpg"
                            value={image.name}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            error={!!errors[`image_${index}`]}
                            helperText={errors[`image_${index}`]}
                            size="small"
                          />
                          {images.length > 1 && (
                            <IconButton
                              onClick={() => handleDeleteImage(index)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                      </Card>
                    ))}

                    <Button
                      onClick={handleAddImage}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{ borderStyle: "dashed" }}
                    >
                      Add Image
                    </Button>
                  </Stack>
                </Grid>

                {/* Ingredients Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <IngredientIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Recipe Ingredients ({validIngredientsCount} added)
                  </Typography>
                  
                  <Stack spacing={2}>
                    {ingredients.map((ingredient, index) => (
                      <Card key={index} variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                          <TextField
                            fullWidth
                            label={`Ingredient #${index + 1}`}
                            placeholder="2 cups all-purpose flour"
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                            size="small"
                          />
                          {ingredients.length > 1 && (
                            <IconButton
                              onClick={() => handleDeleteIngredient(index)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </Box>
                      </Card>
                    ))}

                    <Button
                      onClick={handleAddIngredient}
                      variant="outlined"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{ borderStyle: "dashed" }}
                    >
                      Add Ingredient
                    </Button>
                  </Stack>
                </Grid>

                {/* Steps Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <StepIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Recipe Instructions ({validStepsCount} steps)
                  </Typography>
                  
                  <Stack spacing={2}>
                    {steps.map((step, index) => (
                      <Card 
                        key={index} 
                        variant="outlined" 
                        sx={{ 
                          p: 2,
                          border: step.name.trim() || step.instructions.trim() ? "2px solid #4CAF50" : "1px solid #e0e0e0"
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                          <Typography variant="subtitle1" fontWeight="bold" color="primary">
                            Step {index + 1}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 1 }}>
                            {(step.name.trim() || step.instructions.trim()) ? (
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
                              label="Step Name"
                              placeholder="Mix dry ingredients"
                              value={step.name}
                              onChange={(e) => handleStepChange(index, "name", e.target.value)}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Instructions"
                              placeholder="In a large bowl, whisk together flour, baking soda, and salt..."
                              multiline
                              rows={3}
                              value={step.instructions}
                              onChange={(e) => handleStepChange(index, "instructions", e.target.value)}
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
                              error={!!errors[`step_image_${index}`]}
                              helperText={errors[`step_image_${index}`]}
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Step URL"
                              placeholder="https://example.com/recipe#step1"
                              value={step.url}
                              onChange={(e) => handleStepChange(index, "url", e.target.value)}
                              error={!!errors[`step_url_${index}`]}
                              helperText={errors[`step_url_${index}`] || "Optional anchor link"}
                              size="small"
                            />
                          </Grid>
                        </Grid>
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

                {/* Author Section */}
                <Collapse in={isIncludeAuthor} className="px-5">
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                        <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Author Information
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Author Type</InputLabel>
                        <Select
                          value={authorType}
                          label="Author Type"
                          onChange={(e) => setAuthorType(e.target.value)}
                        >
                          <MenuItem value="Person">Person</MenuItem>
                          <MenuItem value="Organization">Organization</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Author Name"
                        placeholder="Chef John Doe"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        InputProps={{
                          startAdornment: authorType === "Person" ? 
                            <PersonIcon sx={{ mr: 1, color: "action.active" }} /> :
                            <OrganizationIcon sx={{ mr: 1, color: "action.active" }} />
                        }}
                      />
                    </Grid>
                  </Grid>
                </Collapse>

                {/* Nutrition Section */}
                <Collapse in={isIncludeNutrition} className="px-5">
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                        <NutritionIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Nutrition Information
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Serving Size"
                        placeholder="Per 1/2 cup"
                        value={nutritionServingSize}
                        onChange={(e) => setNutritionServingSize(e.target.value)}
                        helperText="e.g., Per 1/2 cup, 1 cookie"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Calories"
                        type="number"
                        placeholder="250"
                        value={nutritionCalories}
                        onChange={(e) => setNutritionCalories(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Carbohydrates (g)"
                        type="number"
                        placeholder="35"
                        value={nutritionCarbohydrates}
                        onChange={(e) => setNutritionCarbohydrates(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Fat (g)"
                        type="number"
                        placeholder="12"
                        value={nutritionFat}
                        onChange={(e) => setNutritionFat(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Protein (g)"
                        type="number"
                        placeholder="4"
                        value={nutritionProtein}
                        onChange={(e) => setNutritionProtein(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Sodium (mg)"
                        type="number"
                        placeholder="200"
                        value={nutritionSodium}
                        onChange={(e) => setNutritionSodium(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Sugar (g)"
                        type="number"
                        placeholder="18"
                        value={nutritionSugar}
                        onChange={(e) => setNutritionSugar(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </Collapse>

                {/* Rating Section */}
                <Collapse in={isIncludeRating} className="px-5">
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                        <RatingIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Recipe Rating
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Rating Value *"
                        type="number"
                        placeholder="4.5"
                        inputProps={{ min: 0, max: 5, step: 0.1 }}
                        value={ratingValue}
                        onChange={(e) => setRatingValue(e.target.value)}
                        error={!!errors.ratingValue}
                        helperText={errors.ratingValue || "Average rating (0-5 scale)"}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Number of Ratings *"
                        type="number"
                        placeholder="150"
                        value={numberOfRatings}
                        onChange={(e) => setNumberOfRatings(e.target.value)}
                        error={!!errors.numberOfRatings}
                        helperText={errors.numberOfRatings || "Total number of ratings"}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Number of Reviews"
                        type="number"
                        placeholder="45"
                        value={numberOfReviews}
                        onChange={(e) => setNumberOfReviews(e.target.value)}
                        helperText="Total number of written reviews"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Worst Rating"
                        type="number"
                        placeholder="1"
                        value={worstValue}
                        onChange={(e) => setWorstValue(e.target.value)}
                        helperText="Lowest possible rating (default: 1)"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Best Rating"
                        type="number"
                        placeholder="5"
                        value={bestValue}
                        onChange={(e) => setBestValue(e.target.value)}
                        helperText="Highest possible rating (default: 5)"
                      />
                    </Grid>

                    {ratingValue && (
                      <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                          <Typography variant="body2">Preview:</Typography>
                          <Rating value={parseFloat(ratingValue)} readOnly size="small" />
                          <Typography variant="body2">
                            {ratingValue} out of {bestValue} ({numberOfRatings} ratings)
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Collapse>

                {/* Video Section */}
                <Collapse in={isIncludeVideo} className="px-5">
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                        <VideoIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Recipe Video
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Video Name"
                        placeholder="How to Make Chocolate Chip Cookies"
                        value={videoName}
                        onChange={(e) => setVideoName(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Video Description"
                        placeholder="Step-by-step video guide for making delicious chocolate chip cookies"
                        multiline
                        rows={2}
                        value={videoDescription}
                        onChange={(e) => setVideoDescription(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Upload Date"
                        type="date"
                        value={videoDateUploaded}
                        onChange={(e) => setVideoDateUploaded(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Content URL"
                        placeholder="https://example.com/video.mp4"
                        value={videoContentUrl}
                        onChange={(e) => setVideoContentUrl(e.target.value)}
                        error={!!errors.videoContentUrl}
                        helperText={errors.videoContentUrl}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Embed URL"
                        placeholder="https://youtube.com/embed/xyz"
                        value={videoEmbedUrl}
                        onChange={(e) => setVideoEmbedUrl(e.target.value)}
                        error={!!errors.videoEmbedUrl}
                        helperText={errors.videoEmbedUrl}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Thumbnail Image URL"
                        placeholder="https://example.com/thumbnail.jpg"
                        value={thumbnailImageUrl}
                        onChange={(e) => setThumbnailImageUrl(e.target.value)}
                        error={!!errors.thumbnailImageUrl}
                        helperText={errors.thumbnailImageUrl}
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
            {/* Recipe Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  RECIPE PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                {images.length > 0 && images[0].name ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={images[0].name}
                    alt="Recipe image"
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
                    <RecipeIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No image added
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {recipeName || "Recipe Name"}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {recipeCategory && (
                      <Chip label={recipeCategory} size="small" color="primary" />
                    )}
                    {recipeCuisine && (
                      <Chip label={recipeCuisine} size="small" color="secondary" />
                    )}
                  </Stack>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {description ? 
                      `${description.substring(0, 150)}${description.length > 150 ? "..." : ""}` : 
                      "Recipe description will appear here..."
                    }
                  </Typography>

                  {/* Timing */}
                  <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    {recipePrep && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <TimerIcon fontSize="small" />
                        <Typography variant="caption">
                          Prep: {recipePrep} {recipePrepTime.toLowerCase()}
                        </Typography>
                      </Box>
                    )}
                    {recipeCook && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <TimerIcon fontSize="small" />
                        <Typography variant="caption">
                          Cook: {recipeCook} {recipeCookTime.toLowerCase()}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Rating */}
                  {isIncludeRating && ratingValue && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <Rating value={parseFloat(ratingValue)} readOnly size="small" />
                      <Typography variant="body2">
                        {ratingValue} ({numberOfRatings} ratings)
                      </Typography>
                    </Box>
                  )}

                  {/* Yield */}
                  {yieldData && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Yield:</strong> {yieldData}
                    </Typography>
                  )}

                  {/* Author */}
                  {isIncludeAuthor && authorName && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      {authorType === "Person" ? <PersonIcon fontSize="small" /> : <OrganizationIcon fontSize="small" />}
                      <Typography variant="body2">
                        By {authorName}
                      </Typography>
                    </Box>
                  )}

                  {/* Ingredients Count */}
                  {validIngredientsCount > 0 && (
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Ingredients:</strong> {validIngredientsCount} items
                    </Typography>
                  )}

                  {/* Steps Count */}
                  {validStepsCount > 0 && (
                    <Typography variant="body2">
                      <strong>Instructions:</strong> {validStepsCount} steps
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
                  <Alert severity={recipeName.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Recipe Name: {recipeName.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={validIngredientsCount > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Ingredients: {validIngredientsCount > 0 ? `✓ ${validIngredientsCount} added` : "ℹ None added yet"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={validStepsCount > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Instructions: {validStepsCount > 0 ? `✓ ${validStepsCount} steps` : "ℹ None added yet"}
                    </Typography>
                  </Alert>

                  <Alert severity={images.filter(img => img.name.trim()).length > 0 ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Images: {images.filter(img => img.name.trim()).length > 0 ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={isIncludeNutrition ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Nutrition: {isIncludeNutrition ? "✓ Included" : "ℹ Not included"}
                    </Typography>
                  </Alert>

                  <Alert severity={isIncludeRating ? (ratingValue ? "success" : "warning") : "info"} variant="outlined">
                    <Typography variant="caption">
                      Rating: {isIncludeRating ? 
                        (ratingValue ? `✓ ${ratingValue}/5` : "⚠ Incomplete") : 
                        "ℹ Not included"
                      }
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

export default Recipe;





// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { currencies, timezones } from "@/app/constant";
// const Receipe = () => {
//   const [receipeName, setReceipeName] = useState("");
//   const [receipeCategory, setReceipeCategory] = useState("");
//   const [receipeCuisine, setReceipeCuisine] = useState("");
//   const [receipePrep, setReceipePrep] = useState("");
//   const [receipePrepTime, setReceipePrepTime] = useState("Minutes");
//   const [receipeCook, setReceipeCook] = useState("");
//   const [receipeCookTime, setReceipeCookTime] = useState("Minutes");
//   const [receipeTotal, setReceipeTotal] = useState("");
//   const [receipeTotalTime, setReceipeTotalTime] = useState("Minutes");
//   const [yieldData, setYieldData] = useState("");
//   const [datePublished, setDatePublished] = useState("");
//   const [description, setDescription] = useState("");
//   const [keyWords, setKeyWords] = useState("");
//   const [isIncludeAuthor, setIsIncludeAuthor] = useState(true);
//   const [isIncludeNutrition, setIsIncludeNutrition] = useState(true);
//   const [isIncludeRating, setIsIncludeRating] = useState(false);
//   const [isIncludeVideo, setIsIncludeVideo] = useState(false);
//   const [authorType, setAuthorType] = useState("");
//   const [authorName, setAuthorName] = useState("");
//   const [nutritionServingSize, setNutritionServingSize] = useState("");
//   const [nutritionCalories, setNutritionCalories] = useState("");
//   const [nutionCarbohydrates, setNutritionCarbohydrates] = useState("");
//   const [nutritionFat, setNutritionFat] = useState("");
//   const [nutritionProtien, setNutritionProtien] = useState("");
//   const [nutritionSodium, setNutritionSodium] = useState("");
//   const [nutritionSugar, setNutritionSugar] = useState("");
//   const [numberOfRatings, setNumberOfRatings] = useState("");
//   const [numberofReviews, setNumberOfReviews] = useState("");
//   const [ratingValue, setRatingValue] = useState("");
//   const [wrostValue, setWrostValue] = useState("");
//   const [bestValue, setBestValue] = useState("");
//   const [videoName, setVideoName] = useState("");
//   const [videoDescription, setVideoDescription] = useState("");
//   const [videoDateUploaded, setVideoDateUploaded] = useState("");
//   const [videoContentUrl, setVideoContentUrl] = useState("");
//   const [videoEmbedUrl, setVideoEmbedUrl] = useState("");
//   const [thumbnailImageUrl, setThumbnailImageUrl] = useState("");

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
//   const json = {
//     "@context": "http://schema.org/",
//     "@type": "Recipe",

//     ...(receipeName && { name: receipeName }),
//     ...(tools.length > 0 && { image: tools.map((tool) => tool.name) }),
//     ...(receipeCategory && { recipeCategory: receipeCategory }),
//     ...(receipeCuisine && { recipeCuisine: receipeCuisine }),
//     ...(receipePrep &&
//       receipePrepTime && {
//         prepTime: `PT${receipePrep}${receipePrepTime.charAt(0).toUpperCase()}`,
//       }),
//     ...(receipeCook &&
//       receipeCookTime && {
//         cookTime: `PT${receipeCook}${receipeCookTime.charAt(0).toUpperCase()}`,
//       }),
//     ...(receipeTotal &&
//       receipeTotalTime && {
//         totalTime: `PT${receipeTotal}${receipeTotalTime
//           .charAt(0)
//           .toUpperCase()}`,
//       }),
//     ...(yieldData && { recipeYield: yieldData }),
//     ...(datePublished && { datePublished: datePublished }),
//     ...(description && { description: description }),
//     ...(keyWords && { keywords: keyWords }),
//     author: isIncludeAuthor
//       ? {
//           "@type": authorType,
//           name: authorName,
//         }
//       : undefined,
//     nutrition: isIncludeNutrition
//       ? {
//           "@type": "NutritionInformation",
//           ...(nutritionServingSize && { servingSize: nutritionServingSize }),
//           ...(nutritionCalories && { calories: nutritionCalories }),
//           ...(nutionCarbohydrates && {
//             carbohydrateContent: nutionCarbohydrates,
//           }),
//           ...(nutritionFat && { fatContent: nutritionFat }),
//           ...(nutritionProtien && { proteinContent: nutritionProtien }),
//           ...(nutritionSodium && { sodiumContent: nutritionSodium }),
//           ...(nutritionSugar && { sugarContent: nutritionSugar }),
//         }
//       : undefined,
//     aggregateRating: isIncludeRating
//       ? {
//           "@type": "AggregateRating",
//           ratingValue: ratingValue,
//           ratingCount: numberOfRatings,
//           reviewCount: numberofReviews,
//           worstRating: wrostValue,
//           bestRating: bestValue,
//         }
//       : undefined,
//     video: isIncludeVideo
//       ? {
//           "@type": "VideoObject",
//           name: videoName,
//           description: videoDescription,
//           uploadDate: videoDateUploaded,
//           contentUrl: videoContentUrl,
//           embedUrl: videoEmbedUrl,
//           thumbnailUrl: thumbnailImageUrl,
//         }
//       : undefined,
//     image: tools.length > 0 ? tools.map((tool) => tool.name) : [], // Include supply names in images if isIncludeSupply is true
//     recipeIngredient:
//       supplies.length > 0 ? supplies.map((supply) => supply.name) : [], // Include supply names in recipe ingredients if isIncludeSupply is true
//     recipeInstructions: steps.map((step) => ({
//       "@type": "HowToStep",
//       name: step.name,
//       text: step.instructions,
//       image: step.imageUrl,
//       url: step.url,
//     })),
//   };

//   const jsonText = JSON.stringify(json, null, 2);

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Recipe Structured Data Generator
//       </h1>

//       <div className="flex mt-5">
//         <div className="w-full border">
//           <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//             OPTIONS
//           </h1>
//           <div className="py-4 px-5 bg-gray-800">
//             <form>
//               <h1 className="text-white font-semibold mt-5">Receipe </h1>
//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Receipe Name"
//                   value={receipeName}
//                   onChange={(e) => setReceipeName(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Category Name"
//                   value={receipeCategory}
//                   onChange={(e) => setReceipeCategory(e.target.value)}
//                 />
//                 <span className="text-white text-xs">
//                   The type of meal or course your recipe is about. For example:
//                   “dinner”, “main course”, or “dessert, snack”.
//                 </span>
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Cuisine Name"
//                   value={receipeCuisine}
//                   onChange={(e) => setReceipeCuisine(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5 flex justify-between">
//                 <div className="w-4/6">
//                   <input
//                     type="number"
//                     id="first_name"
//                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Prep Time"
//                     value={receipePrep}
//                     onChange={(e) => setReceipePrep(e.target.value)}
//                   />
//                 </div>
//                 <div className="w-1/4 ml-auto">
//                   <select
//                     id="type"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     value={receipePrepTime}
//                     onChange={(e) => setReceipePrepTime(e.target.value)}
//                   >
//                     <option>Select Time Type</option>
//                     <option value="Minutes">Minutes</option>
//                     <option value="Hours">Hours</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="mt-5 flex justify-between">
//                 <div className="w-4/6">
//                   <input
//                     type="number"
//                     id="first_name"
//                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Cook time"
//                     value={receipeCook}
//                     onChange={(e) => setReceipeCook(e.target.value)}
//                   />
//                 </div>
//                 <div className="w-1/4 ml-auto">
//                   <select
//                     id="type"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     value={receipeCookTime}
//                     onChange={(e) => setReceipeCookTime(e.target.value)}
//                   >
//                     <option>Select Time Type</option>
//                     <option value="Minutes">Minutes</option>
//                     <option value="Hours">Hours</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="mt-5 flex justify-between">
//                 <div className="w-4/6">
//                   <input
//                     type="number"
//                     id="first_name"
//                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     placeholder="Enter Total time"
//                     value={receipeTotal}
//                     onChange={(e) => setReceipeTotal(e.target.value)}
//                   />
//                 </div>
//                 <div className="w-1/4 ml-auto">
//                   <select
//                     id="type"
//                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                     value={receipeTotalTime}
//                     onChange={(e) => setReceipeTotalTime(e.target.value)}
//                   >
//                     <option>Select Time Type</option>
//                     <option value="Minutes">Minutes</option>
//                     <option value="Hours">Hours</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Yield "
//                   value={yieldData}
//                   onChange={(e) => setYieldData(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="date"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={datePublished}
//                   onChange={(e) => setDatePublished(e.target.value)}
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
//                   for="message"
//                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   Keywords
//                 </label>
//                 <textarea
//                   id="message"
//                   rows="2"
//                   class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Keywords"
//                   value={keyWords}
//                   onChange={(e) => setKeyWords(e.target.value)}
//                 ></textarea>
//               </div>

//               <div class="flex items-center mb-4 mt-5">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   defaultChecked
//                   onChange={() => {
//                     setIsIncludeAuthor(!isIncludeAuthor);
//                   }}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include author
//                 </label>
//               </div>

//               <div class="flex items-center mb-4">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   defaultChecked
//                   onChange={() => {
//                     setIsIncludeNutrition(!isIncludeNutrition);
//                   }}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include nutrition (calories, fat, etc.)
//                 </label>
//               </div>
//               <div class="flex items-center mb-4">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => {
//                     setIsIncludeRating(!isIncludeRating);
//                   }}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include rating
//                 </label>
//               </div>

//               <div class="flex items-center mb-4">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   onChange={() => {
//                     setIsIncludeVideo(!isIncludeVideo);
//                   }}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include video
//                 </label>
//               </div>

//               <h1 className="text-white font-semibold mt-5">Images </h1>

//               <div className="mt-5">
//                 {tools.map((tool, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center  justify-center space-x-3 space-y-2"
//                   >
//                     <input
//                       type="text"
//                       className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder={`Image #${index + 1}`}
//                       value={tool.name}
//                       onChange={(e) => {
//                         const updatedtools = [...tools];
//                         updatedtools[index].name = e.target.value;
//                         setTools(updatedtools);
//                       }}
//                     />

//                     {tools.length > 1 && (
//                       <button
//                         type="button"
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
//                         onClick={() => handleDeleteTools(index)}
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Add button to add musician */}
//               <div className="mt-5">
//                 <button
//                   type="button"
//                   className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   onClick={handleAddTools}
//                 >
//                   Add Image
//                 </button>
//               </div>

//               <h1 className="text-white font-semibold mt-5">Ingredients </h1>

//               <div className="mt-5">
//                 {supplies.map((supply, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center  justify-center space-x-3 space-y-2"
//                   >
//                     <input
//                       type="text"
//                       className="bg-gray-50 border   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder={`Ingredient #${index + 1}`}
//                       value={supply.name}
//                       onChange={(e) => {
//                         const updatedsupplies = [...supplies];
//                         updatedsupplies[index].name = e.target.value;
//                         setSupplies(updatedsupplies);
//                       }}
//                     />

//                     {supplies.length > 1 && (
//                       <button
//                         type="button"
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
//                         onClick={() => handleDeleteSupply(index)}
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Add button to add musician */}
//               <div className="mt-5">
//                 <button
//                   type="button"
//                   className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                   onClick={handleAddSupply}
//                 >
//                   Add Ingredient
//                 </button>
//               </div>

//            `   <div>
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
//               </div>`

//               {isIncludeAuthor && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Author </h1>

//                   <div className="mt-5">
//                     <select
//                       id="type"
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       value={authorType}
//                       onChange={(e) => setAuthorType(e.target.value)}
//                     >
//                       <option>Select Author Type</option>
//                       <option value="Organizations">Organizations</option>
//                       <option value="Person">Person</option>
//                     </select>
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Author Name"
//                       value={authorName}
//                       onChange={(e) => setAuthorName(e.target.value)}
//                     />
//                   </div>
//                 </>
//               )}

//               {isIncludeNutrition && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Nutrition </h1>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Serving size"
//                       value={nutritionServingSize}
//                       onChange={(e) => setNutritionServingSize(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       For example, “Per 1/2 cup”.
//                     </span>
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Calories"
//                       value={nutritionCalories}
//                       onChange={(e) => setNutritionCalories(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Carbohydrates (g)"
//                       value={nutionCarbohydrates}
//                       onChange={(e) =>
//                         setNutritionCarbohydrates(e.target.value)
//                       }
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Fat (g)"
//                       value={nutritionFat}
//                       onChange={(e) => setNutritionFat(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Protien (g)"
//                       value={nutritionProtien}
//                       onChange={(e) => setNutritionProtien(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Sodium (g)"
//                       value={nutritionSodium}
//                       onChange={(e) => setNutritionSodium(e.target.value)}
//                     />
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Sugar (g)"
//                       value={nutritionSugar}
//                       onChange={(e) => setNutritionSugar(e.target.value)}
//                     />
//                   </div>
//                 </>
//               )}

//               {isIncludeRating && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">
//                     Aggregate rating
//                   </h1>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Number of ratings"
//                       value={numberOfRatings}
//                       onChange={(e) => setNumberOfRatings(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       The total number of ratings for the item on your site.
//                     </span>
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Number of reviews"
//                       value={numberofReviews}
//                       onChange={(e) => setNumberOfReviews(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       Specifies the number of people who provided a review with
//                       or without an accompanying rating.
//                     </span>
//                   </div>
//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Rating value"
//                       value={ratingValue}
//                       onChange={(e) => setRatingValue(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       A numerical quality rating for the item. The default scale
//                       for numbers is a 5-point scale, where 1 is the lowest
//                       value and 5 is the highest value. If another scale is
//                       intended, use worstRating and bestRating below.
//                     </span>
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Wrost value"
//                       value={wrostValue}
//                       onChange={(e) => setWrostValue(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       The lowest value allowed in this rating system. If
//                       omitted, 1 is assumed.
//                     </span>
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Best value"
//                       value={bestValue}
//                       onChange={(e) => setBestValue(e.target.value)}
//                     />
//                     <span className="text-white text-xs">
//                       The highest value allowed in this rating system. If
//                       omitted, 5 is assumed.
//                     </span>
//                   </div>
//                 </>
//               )}
//               {isIncludeVideo && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Video</h1>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Video Name"
//                       value={videoName}
//                       onChange={(e) => setVideoName(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <label
//                       for="message"
//                       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Description
//                     </label>
//                     <textarea
//                       id="message"
//                       rows="2"
//                       class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Video Description"
//                       value={videoDescription}
//                       onChange={(e) => setVideoDescription(e.target.value)}
//                     ></textarea>
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="date"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Video Name"
//                       value={videoName}
//                       onChange={(e) => setVideoName(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Content Url"
//                       value={videoContentUrl}
//                       onChange={(e) => setVideoContentUrl(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Embed Url"
//                       value={videoEmbedUrl}
//                       onChange={(e) => setVideoEmbedUrl(e.target.value)}
//                     />
//                   </div>

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Thumbnail image Url"
//                       value={thumbnailImageUrl}
//                       onChange={(e) => setThumbnailImageUrl(e.target.value)}
//                     />
//                   </div>
//                 </>
//               )}
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

// export default Receipe;
