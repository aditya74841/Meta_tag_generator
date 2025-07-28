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
  ShoppingCart as ProductIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Image as ImageIcon,
  AttachMoney as PriceIcon,
  Star as RatingIcon,
  Reviews as ReviewIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Store as BrandIcon,
  Description as DescriptionIcon,
  Inventory as InventoryIcon,
  LocalOffer as OfferIcon,
  Assessment as AggregateIcon,
  Person as PersonIcon,
  DateRange as DateIcon,
  Link as LinkIcon,
  Badge as BadgeIcon,
} from "@mui/icons-material";

const Product = () => {
  const [productName, setProductName] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productImageUrl, setProductImageUrl] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [identificationProperties, setIdentificationProperties] = useState("");
  const [isIncludeOfferOrAggregateOffer, setIsIncludeOfferOrAggregateOffer] = useState(true);
  const [isIncludeRating, setIsIncludeRating] = useState(false);
  const [isIncludeReviews, setIsIncludeReviews] = useState(false);
  const [isAggregateOffer, setIsAggregateOffer] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");
  const [numberOfOffers, setNumberOfOffers] = useState("");
  const [url, setUrl] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [priceValidUntil, setPriceValidUntil] = useState("");
  const [availability, setAvailability] = useState("InStock");
  const [condition, setCondition] = useState("New");
  const [numberOfRatings, setNumberOfRatings] = useState("");
  const [numberOfReviews, setNumberOfReviews] = useState("");
  const [ratingValue, setRatingValue] = useState("");
  const [worstValue, setWorstValue] = useState("1");
  const [bestValue, setBestValue] = useState("5");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const [reviews, setReviews] = useState([
    {
      title: "",
      author: "",
      date: "",
      ratingValue: "",
      text: "",
      worstRatingValue: "1",
      bestRatingValue: "5",
    },
  ]);

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!productName.trim()) newErrors.productName = "Product name is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (productImageUrl && !urlPattern.test(productImageUrl)) {
      newErrors.productImageUrl = "Please enter a valid URL starting with http:// or https://";
    }
    if (url && !urlPattern.test(url)) {
      newErrors.url = "Please enter a valid URL starting with http:// or https://";
    }

    // Offer validation
    if (isIncludeOfferOrAggregateOffer) {
      if (!currency) newErrors.currency = "Currency is required";
      
      if (isAggregateOffer) {
        if (!lowPrice || lowPrice <= 0) newErrors.lowPrice = "Valid low price is required";
        if (!highPrice || highPrice <= 0) newErrors.highPrice = "Valid high price is required";
        if (lowPrice && highPrice && parseFloat(lowPrice) >= parseFloat(highPrice)) {
          newErrors.highPrice = "High price must be greater than low price";
        }
        if (!numberOfOffers || numberOfOffers <= 0) newErrors.numberOfOffers = "Number of offers is required";
      } else {
        if (!offerPrice || offerPrice <= 0) newErrors.offerPrice = "Valid price is required";
      }
    }

    // Rating validation
    if (isIncludeRating) {
      if (!ratingValue || ratingValue < 0) newErrors.ratingValue = "Valid rating value is required";
      if (!numberOfRatings || numberOfRatings <= 0) newErrors.numberOfRatings = "Number of ratings is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    validateForm();
  }, [productName, productImageUrl, url, currency, isIncludeOfferOrAggregateOffer, isAggregateOffer, lowPrice, highPrice, numberOfOffers, offerPrice, isIncludeRating, ratingValue, numberOfRatings]);

  const handleAddReview = () => {
    setReviews([
      ...reviews,
      {
        title: "",
        author: "",
        date: "",
        ratingValue: "",
        text: "",
        worstRatingValue: "1",
        bestRatingValue: "5",
      },
    ]);
  };

  const handleDeleteReview = (index) => {
    if (reviews.length > 1) {
      const updatedReviews = [...reviews];
      updatedReviews.splice(index, 1);
      setReviews(updatedReviews);
    }
  };

  const handleReviewChange = (index, field, value) => {
    const updatedReviews = [...reviews];
    updatedReviews[index][field] = value;
    setReviews(updatedReviews);
  };

  const generateJSON = () => {
    const validReviews = reviews.filter(review => 
      review.title.trim() || review.author.trim() || review.text.trim()
    );

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: productName,
      ...(productImageUrl && { image: productImageUrl }),
      ...(productDescription && { description: productDescription }),
      ...(productBrand && { 
        brand: { 
          "@type": "Brand", 
          name: productBrand 
        } 
      }),
      ...(identificationProperties && productName && {
        [identificationProperties.toLowerCase()]: productName
      }),
      ...(isIncludeOfferOrAggregateOffer && {
        offers: isAggregateOffer ? {
          "@type": "AggregateOffer",
          priceCurrency: currency,
          lowPrice: lowPrice,
          highPrice: highPrice,
          ...(url && { url: url }),
          availability: `https://schema.org/${availability}`,
          offerCount: numberOfOffers,
        } : {
          "@type": "Offer",
          priceCurrency: currency,
          price: offerPrice,
          ...(priceValidUntil && { priceValidUntil: priceValidUntil }),
          availability: `https://schema.org/${availability}`,
          itemCondition: `https://schema.org/${condition}`,
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
      ...(isIncludeReviews && validReviews.length > 0 && {
        review: validReviews.map((review) => ({
          "@type": "Review",
          ...(review.title && { name: review.title }),
          ...(review.author && { 
            author: { 
              "@type": "Person", 
              name: review.author 
            } 
          }),
          ...(review.date && { datePublished: review.date }),
          ...(review.text && { reviewBody: review.text }),
          ...(review.ratingValue && {
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.ratingValue,
              worstRating: review.worstRatingValue || "1",
              bestRating: review.bestRatingValue || "5",
            }
          }),
        }))
      }),
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && productName.trim();
  const validReviewsCount = reviews.filter(review => 
    review.title.trim() || review.author.trim() || review.text.trim()
  ).length;

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
              Product Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create structured data for products with offers, ratings, and reviews to enhance search visibility.
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
                    <ProductIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Product Details
                  </Typography>
                </Grid>

                {/* Product Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Product Name *"
                    placeholder="iPhone 15 Pro"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    error={!!errors.productName}
                    helperText={errors.productName || `${productName.length} characters`}
                    InputProps={{
                      startAdornment: <ProductIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Brand */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Brand"
                    placeholder="Apple"
                    value={productBrand}
                    onChange={(e) => setProductBrand(e.target.value)}
                    InputProps={{
                      startAdornment: <BrandIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Image URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Image URL"
                    placeholder="https://example.com/product-image.jpg"
                    value={productImageUrl}
                    onChange={(e) => setProductImageUrl(e.target.value)}
                    error={!!errors.productImageUrl}
                    helperText={errors.productImageUrl || "High-quality product image"}
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
                    placeholder="Detailed product description..."
                    multiline
                    rows={3}
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    helperText={`${productDescription.length} characters (recommended: 50+ for SEO)`}
                    InputProps={{
                      startAdornment: <DescriptionIcon sx={{ mr: 1, color: "action.active", alignSelf: "flex-start", mt: 1 }} />,
                    }}
                  />
                </Grid>

                {/* Identification Properties */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Identification Properties</InputLabel>
                    <Select
                      value={identificationProperties}
                      label="Identification Properties"
                      onChange={(e) => setIdentificationProperties(e.target.value)}
                    >
                      <MenuItem value="">Select Property</MenuItem>
                      <MenuItem value="gtin8">GTIN-8</MenuItem>
                      <MenuItem value="gtin13">GTIN-13</MenuItem>
                      <MenuItem value="gtin14">GTIN-14</MenuItem>
                      <MenuItem value="isbn">ISBN</MenuItem>
                      <MenuItem value="mpn">MPN</MenuItem>
                      <MenuItem value="sku">SKU</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Optional Sections */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Optional Information" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    You must include at least one of the following:
                  </Typography>
                  <Stack direction="column" spacing={1}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isIncludeOfferOrAggregateOffer}
                          onChange={(e) => setIsIncludeOfferOrAggregateOffer(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <OfferIcon fontSize="small" />
                          Include Offer or Aggregate Offer
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
                          checked={isIncludeReviews}
                          onChange={(e) => setIsIncludeReviews(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <ReviewIcon fontSize="small" />
                          Include Reviews
                        </Box>
                      }
                    />
                  </Stack>
                </Grid>

                {/* Offer Section */}
                <Collapse in={isIncludeOfferOrAggregateOffer} className="px-4">
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                        <OfferIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Offer Information
                      </Typography>
                      
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isAggregateOffer}
                            onChange={(e) => setIsAggregateOffer(e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <AggregateIcon fontSize="small" />
                            Aggregate Offer
                          </Box>
                        }
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Use when a single product has multiple offers from different merchants
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={!!errors.currency}>
                        <InputLabel>Currency *</InputLabel>
                        <Select
                          value={currency}
                          label="Currency *"
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          {currencies.map((curr) => (
                            <MenuItem key={curr.value} value={curr.value}>
                              {curr.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.currency && (
                          <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                            {errors.currency}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    {isAggregateOffer ? (
                      <>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Low Price *"
                            type="number"
                            placeholder="99.99"
                            value={lowPrice}
                            onChange={(e) => setLowPrice(e.target.value)}
                            error={!!errors.lowPrice}
                            helperText={errors.lowPrice}
                            InputProps={{
                              startAdornment: <PriceIcon sx={{ mr: 1, color: "action.active" }} />,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="High Price *"
                            type="number"
                            placeholder="199.99"
                            value={highPrice}
                            onChange={(e) => setHighPrice(e.target.value)}
                            error={!!errors.highPrice}
                            helperText={errors.highPrice}
                            InputProps={{
                              startAdornment: <PriceIcon sx={{ mr: 1, color: "action.active" }} />,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Number of Offers *"
                            type="number"
                            placeholder="5"
                            value={numberOfOffers}
                            onChange={(e) => setNumberOfOffers(e.target.value)}
                            error={!!errors.numberOfOffers}
                            helperText={errors.numberOfOffers}
                          />
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Price *"
                            type="number"
                            placeholder="149.99"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            error={!!errors.offerPrice}
                            helperText={errors.offerPrice}
                            InputProps={{
                              startAdornment: <PriceIcon sx={{ mr: 1, color: "action.active" }} />,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Price Valid Until"
                            type="date"
                            value={priceValidUntil}
                            onChange={(e) => setPriceValidUntil(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                              startAdornment: <DateIcon sx={{ mr: 1, color: "action.active" }} />,
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel>Condition</InputLabel>
                            <Select
                              value={condition}
                              label="Condition"
                              onChange={(e) => setCondition(e.target.value)}
                            >
                              <MenuItem value="NewCondition">New</MenuItem>
                              <MenuItem value="UsedCondition">Used</MenuItem>
                              <MenuItem value="RefurbishedCondition">Refurbished</MenuItem>
                              <MenuItem value="DamagedCondition">Damaged</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Availability</InputLabel>
                        <Select
                          value={availability}
                          label="Availability"
                          onChange={(e) => setAvailability(e.target.value)}
                        >
                          <MenuItem value="InStock">In Stock</MenuItem>
                          <MenuItem value="OutOfStock">Out of Stock</MenuItem>
                          <MenuItem value="PreOrder">Pre-order</MenuItem>
                          <MenuItem value="PreSale">Pre-sale</MenuItem>
                          <MenuItem value="SoldOut">Sold Out</MenuItem>
                          <MenuItem value="Discontinued">Discontinued</MenuItem>
                          <MenuItem value="InStoreOnly">In Store Only</MenuItem>
                          <MenuItem value="OnlineOnly">Online Only</MenuItem>
                          <MenuItem value="LimitedAvailability">Limited Availability</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Offer URL"
                        placeholder="https://store.example.com/product"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        error={!!errors.url}
                        helperText={errors.url || "URL where the product can be purchased"}
                        InputProps={{
                          startAdornment: <LinkIcon sx={{ mr: 1, color: "action.active" }} />,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Collapse>

                {/* Rating Section */}
                <Collapse in={isIncludeRating} className="px-4">
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                        <RatingIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Aggregate Rating
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
                  </Grid>
                </Collapse>

                {/* Reviews Section */}
                <Collapse in={isIncludeReviews} className="px-4">
                  <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                      <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                        <ReviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                        Product Reviews ({validReviewsCount} valid)
                      </Typography>
                    </Grid>

                    {reviews.map((review, index) => (
                      <Grid item xs={12} key={index}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              Review #{index + 1}
                            </Typography>
                            {reviews.length > 1 && (
                              <IconButton
                                onClick={() => handleDeleteReview(index)}
                                color="error"
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </Box>

                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Review Title"
                                placeholder="Great product!"
                                size="small"
                                value={review.title}
                                onChange={(e) => handleReviewChange(index, "title", e.target.value)}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Author Name"
                                placeholder="John Doe"
                                size="small"
                                value={review.author}
                                onChange={(e) => handleReviewChange(index, "author", e.target.value)}
                                InputProps={{
                                  startAdornment: <PersonIcon sx={{ mr: 1, color: "action.active" }} />,
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                label="Review Date"
                                type="date"
                                size="small"
                                value={review.date}
                                onChange={(e) => handleReviewChange(index, "date", e.target.value)}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <TextField
                                fullWidth
                                label="Rating"
                                type="number"
                                placeholder="5"
                                size="small"
                                inputProps={{ min: 1, max: 5 }}
                                value={review.ratingValue}
                                onChange={(e) => handleReviewChange(index, "ratingValue", e.target.value)}
                              />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                <Rating 
                                  value={parseFloat(review.ratingValue) || 0} 
                                  readOnly 
                                  size="small"
                                />
                                <Typography variant="caption">
                                  ({review.ratingValue || 0})
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Review Text"
                                placeholder="Write your review here..."
                                multiline
                                rows={3}
                                size="small"
                                value={review.text}
                                onChange={(e) => handleReviewChange(index, "text", e.target.value)}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Worst Rating"
                                type="number"
                                placeholder="1"
                                size="small"
                                value={review.worstRatingValue}
                                onChange={(e) => handleReviewChange(index, "worstRatingValue", e.target.value)}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                label="Best Rating"
                                type="number"
                                placeholder="5"
                                size="small"
                                value={review.bestRatingValue}
                                onChange={(e) => handleReviewChange(index, "bestRatingValue", e.target.value)}
                              />
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <Button
                        onClick={handleAddReview}
                        variant="outlined"
                        startIcon={<AddIcon />}
                        fullWidth
                        sx={{ borderStyle: "dashed", py: 1.5 }}
                      >
                        Add Review
                      </Button>
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
            {/* Product Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  PRODUCT PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                {productImageUrl ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={productImageUrl}
                    alt="Product image"
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
                      No image selected
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {productName || "Product Name"}
                  </Typography>
                  
                  {productBrand && (
                    <Chip 
                      label={productBrand} 
                      size="small" 
                      color="primary" 
                      sx={{ mb: 2 }}
                    />
                  )}
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {productDescription ? 
                      `${productDescription.substring(0, 150)}${productDescription.length > 150 ? "..." : ""}` : 
                      "Product description will appear here..."
                    }
                  </Typography>

                  {isIncludeOfferOrAggregateOffer && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <PriceIcon fontSize="small" />
                      <Typography variant="body2" fontWeight="bold">
                        {isAggregateOffer ? 
                          `${currency} ${lowPrice} - ${highPrice}` : 
                          `${currency} ${offerPrice}`
                        }
                      </Typography>
                      <Chip 
                        label={availability.replace(/([A-Z])/g, ' $1').trim()} 
                        size="small" 
                        color={availability === 'InStock' ? 'success' : 'warning'}
                      />
                    </Box>
                  )}

                  {isIncludeRating && ratingValue && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Rating value={parseFloat(ratingValue)} readOnly size="small" />
                      <Typography variant="body2">
                        {ratingValue} ({numberOfRatings} ratings)
                      </Typography>
                    </Box>
                  )}

                  {isIncludeReviews && validReviewsCount > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Reviews ({validReviewsCount}):
                      </Typography>
                      {reviews.filter(review => review.title.trim() || review.text.trim()).slice(0, 2).map((review, index) => (
                        <Box key={index} sx={{ mb: 1, p: 1, bgcolor: "#f9f9f9", borderRadius: 1 }}>
                          {review.title && (
                            <Typography variant="caption" fontWeight="bold" display="block">
                              {review.title}
                            </Typography>
                          )}
                          {review.text && (
                            <Typography variant="caption" color="text.secondary">
                              {review.text.substring(0, 100)}{review.text.length > 100 ? "..." : ""}
                            </Typography>
                          )}
                        </Box>
                      ))}
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
                  <Alert severity={productName.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Product Name: {productName.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={isIncludeOfferOrAggregateOffer || isIncludeRating || isIncludeReviews ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Required Sections: {isIncludeOfferOrAggregateOffer || isIncludeRating || isIncludeReviews ? "✓ At least one included" : "✗ Include offer, rating, or reviews"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={productImageUrl ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Product Image: {productImageUrl ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={productBrand ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Brand: {productBrand ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={isIncludeReviews ? (validReviewsCount > 0 ? "success" : "warning") : "info"} variant="outlined">
                    <Typography variant="caption">
                      Reviews: {isIncludeReviews ? 
                        (validReviewsCount > 0 ? `✓ ${validReviewsCount} review${validReviewsCount !== 1 ? 's' : ''}` : "⚠ No valid reviews") : 
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

export default Product;


// "use client";

// import React, { useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { currencies, timezones } from "@/app/constant";
// const Receipe = () => {
//   const [productName, setProductName] = useState("");
//   const [prodctBrand, setProdctBrand] = useState("");
//   const [productImageUrl, setProductImageUrl] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [identificationProperties, setIdentificationProperties] = useState("");
//   const [isIncludeOfferOrAggregateOffer, setIsIncludeOfferOrAggregateOffer] =
//     useState(true);
//   const [isIncludeRating, setIsIncludeRating] = useState(false);
//   const [isIncludeReviews, setIsIncludeReviews] = useState(false);
//   const [isAggregateOffer, setIsAggregateOffer] = useState(false);

//   const [currency, setCurrency] = useState("");
//   const [lowPrice, setLowPrice] = useState("");
//   const [highPrice, setHighPrice] = useState("");
//   const [numberOfOffers, setNumberOfOffers] = useState("");
//   const [url, setUrl] = useState("");
//   const [offerPrice, setOfferPrice] = useState("");
//   const [priceValidUntil, setPriceValidUntil] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [condition, setCondition] = useState("");

//   const [description, setDescription] = useState("");

//   const [numberOfRatings, setNumberOfRatings] = useState("");
//   const [numberofReviews, setNumberOfReviews] = useState("");
//   const [ratingValue, setRatingValue] = useState("");
//   const [wrostValue, setWrostValue] = useState("");
//   const [bestValue, setBestValue] = useState("");

//   const [reviews, setReviews] = useState([
//     {
//       title: "",
//       author: "",
//       date: "",
//       ratingvalue: "",
//       text: "",
//       worstRatingValue: "",
//       bestRatingValue: "",
//     },
//   ]);

//   const handleAddReview = () => {
//     setReviews([
//       ...reviews,
//       {
//         title: "",
//         author: "",
//         date: "",
//         ratingvalue: "",
//         text: "",
//         worstRatingValue: "",
//         bestRatingValue: "",
//       },
//     ]);
//   };

//   const handleDeleteReview = (index) => {
//     const updatedReviews = [...reviews];
//     updatedReviews.splice(index, 1);
//     setReviews(updatedReviews);
//   };

//   const json = {
//     "@context": "http://schema.org/",
//     "@type": "Product",
//     name: productName,
//     image: productImageUrl,
//     description: productDescription,
//     brand: prodctBrand ? { "@type": "Brand", name: prodctBrand } : undefined,
//     offers: isIncludeOfferOrAggregateOffer
//       ? isAggregateOffer
//         ? {
//             "@type": "AggregateOffer",
//             priceCurrency: currency,
//             lowPrice: lowPrice,
//             highPrice: highPrice,
//             url: url,
//             availability: availability,
//             offerCount: numberOfOffers,
//           }
//         : {
//             "@type": "Offer",
//             priceCurrency: currency,
//             price: offerPrice,
//             priceValidUntil: priceValidUntil,
//             availability: availability,
//             condition: condition,
//           }
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
//     review: isIncludeReviews
//       ? reviews.map((review) => ({
//           "@type": "Review",
//           name: review.title,
//           author: review.author ? { "@type": "Person", name: review.author } : undefined,
//           datePublished: review.date,
//           reviewBody: review.text,
//           reviewRating: {
//             "@type": "Rating",
//             ratingValue: review.ratingvalue,
//             worstRating: review.worstRatingValue,
//             bestRating: review.bestRatingValue,
//           },
//         }))
//       : undefined,
//   };
  
//   const jsonText = JSON.stringify(json, null, 2);

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Product Structured Data Generator
//       </h1>
//       <p className="text-white text-sm mt-2">
//         AggregateOffer, AggregateRating, Offer and Reviews
//       </p>
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
//                   placeholder="Enter  Name"
//                   value={productName}
//                   onChange={(e) => setProductName(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Brand"
//                   value={prodctBrand}
//                   onChange={(e) => setProdctBrand(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Image Url"
//                   value={productImageUrl}
//                   onChange={(e) => setProductImageUrl(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
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
//                 <select
//                   id="type"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={identificationProperties}
//                   onChange={(e) => setIdentificationProperties(e.target.value)}
//                 >
//                   <option>Select Identification properties</option>
//                   <option value="GTIN-8">GTIN-8</option>
//                   <option value="GTIN-13">GTIN-13</option>
//                   <option value="GTIN-14">GTIN-14</option>
//                   <option value="ISBN">ISBN</option>
//                   <option value="MPN">MPN</option>
//                   <option value="SKU">SKU</option>
//                 </select>
//                 <span className="text-white text-xs">
//                   Note: ISBN is only a valid property on books.
//                 </span>
//               </div>
//               <p className="text-white text-xs mt-5">
//                 You must include at least one of the following.
//               </p>
//               <div class="flex items-center mb-4 mt-2">
//                 <input
//                   id="default-checkbox"
//                   type="checkbox"
//                   value=""
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   defaultChecked
//                   onChange={() => {
//                     setIsIncludeOfferOrAggregateOffer(
//                       !isIncludeOfferOrAggregateOffer
//                     );
//                   }}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include offer or aggregate offer
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
//                     setIsIncludeReviews(!isIncludeReviews);
//                   }}
//                 />
//                 <label
//                   for="default-checkbox"
//                   class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                 >
//                   Include reviews
//                 </label>
//               </div>

//               {isIncludeOfferOrAggregateOffer && (
//                 <>
//                   <h1 className="text-white font-semibold mt-5">Offer </h1>

//                   <div class="flex items-center mb-4 mt-2">
//                     <input
//                       id="default-checkbox"
//                       type="checkbox"
//                       value=""
//                       class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                       onChange={() => {
//                         setIsAggregateOffer(!isAggregateOffer);
//                       }}
//                     />
//                     <label
//                       for="default-checkbox"
//                       class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//                     >
//                       Aggregate Offer
//                     </label>
//                   </div>
//                   <span className="text-white text-xs">
//                     When a single product is associated with multiple offers
//                     (for example, the same pair of shoes is offered by different
//                     merchants), then AggregateOffer can be used.
//                   </span>

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

//                   {!isAggregateOffer ? (
//                     <div>
//                       <div className="mt-5">
//                         <input
//                           type="text"
//                           id="first_name"
//                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                           placeholder="Enter Price"
//                           value={offerPrice}
//                           onChange={(e) => setOfferPrice(e.target.value)}
//                         />
//                       </div>
//                       <div className="mt-5">
//                         <input
//                           type="date"
//                           id="first_name"
//                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                           placeholder="Select Date"
//                           value={priceValidUntil}
//                           onChange={(e) => setPriceValidUntil(e.target.value)}
//                         />
//                       </div>

//                       <div className="mt-5">
//                         <select
//                           id="type"
//                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                           value={availability}
//                           onChange={(e) => setAvailability(e.target.value)}
//                         >
//                           <option>Select Availability</option>
//                           <option value="Discontinued">Discontinued</option>
//                           <option value="In stock">In stock</option>
//                           <option value="In store only">In store only</option>
//                           <option value="Limited availability">
//                             Limited availability
//                           </option>
//                           <option value="Online only">Online only</option>
//                           <option value="Out of stock">Out of stock</option>
//                           <option value="Pre-order">Pre-order</option>
//                           <option value="Pre-sale">Pre-sale</option>
//                           <option value="Sold out">Sold out</option>
//                         </select>
//                       </div>

//                       <div className="mt-5">
//                         <select
//                           id="type"
//                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                           value={condition}
//                           onChange={(e) => setCondition(e.target.value)}
//                         >
//                           <option>Select Condition</option>
//                           <option value="Damaged">Discontinued</option>
//                           <option value="New">New</option>
//                           <option value="Refurbished">Refurbished</option>
//                           <option value="Used">Limited availability</option>
//                         </select>
//                       </div>
//                     </div>
//                   ) : (
//                     <div>
//                       <div className="mt-5">
//                         <input
//                           type="text"
//                           id="first_name"
//                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                           placeholder="Enter Low price"
//                           value={lowPrice}
//                           onChange={(e) => setLowPrice(e.target.value)}
//                         />
//                       </div>

//                       <div className="mt-5">
//                         <input
//                           type="text"
//                           id="first_name"
//                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                           placeholder="Enter High price"
//                           value={highPrice}
//                           onChange={(e) => setHighPrice(e.target.value)}
//                         />
//                       </div>

//                       <div className="mt-5">
//                         <input
//                           type="text"
//                           id="first_name"
//                           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                           placeholder="Enter Number of offers"
//                           value={numberOfOffers}
//                           onChange={(e) => setNumberOfOffers(e.target.value)}
//                         />
//                       </div>
//                     </div>
//                   )}

//                   <div className="mt-5">
//                     <input
//                       type="text"
//                       id="first_name"
//                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                       placeholder="Enter Url"
//                       value={url}
//                       onChange={(e) => setUrl(e.target.value)}
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
//                       type="number"
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
//                       type="number"
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
//                       type="number"
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
//                       type="number"
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
//                       type="number"
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

//               {isIncludeReviews && (
//                 <>
//                   <div>
//                     <h1 className="text-white font-semibold mt-5">Reviews </h1>
//                     {reviews.map((review, index) => (
//                       <div key={index} className="mt-5">
//                         <h2 className="text-white text-sm font-semibold mt-2">
//                           Review #{index + 1}
//                         </h2>
//                         <div className="mt-5">
//                           <input
//                             type="text"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             placeholder="Enter Title"
//                             value={review.title}
//                             onChange={(e) => {
//                               const updatedReviews = [...reviews];
//                               updatedReviews[index].title = e.target.value;
//                               setReviews(updatedReviews);
//                             }}
//                           />
//                         </div>
//                         <div className="mt-5">
//                           <input
//                             type="text"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             placeholder="Enter Author"
//                             value={review.author}
//                             onChange={(e) => {
//                               const updatedReviews = [...reviews];
//                               updatedReviews[index].author = e.target.value;
//                               setReviews(updatedReviews);
//                             }}
//                           />
//                         </div>

//                         <div className="mt-5">
//                           <input
//                             type="date"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             value={review.date}
//                             onChange={(e) => {
//                               const updatedReviews = [...reviews];
//                               updatedReviews[index].date = e.target.value;
//                               setReviews(updatedReviews);
//                             }}
//                           />
//                         </div>

//                         <div className="mt-5">
//                           <input
//                             type="number"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             value={review.ratingvalue}
//                             placeholder="Enter Rating Value"
//                             onChange={(e) => {
//                               const updatedReviews = [...reviews];
//                               updatedReviews[index].ratingvalue =
//                                 e.target.value;
//                               setReviews(updatedReviews);
//                             }}
//                           />
//                         </div>

//                         <div className="mt-5">
//                           <textarea
//                             rows="2"
//                             className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             placeholder="Enter Instructions"
//                             value={review.text}
//                             onChange={(e) => {
//                               const updatedReviews = [...reviews];
//                               updatedReviews[index].text = e.target.value;
//                               setReviews(updatedReviews);
//                             }}
//                           ></textarea>
//                         </div>

//                         <div className="mt-5">
//                           <input
//                             type="number"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             value={review.worstRatingValue}
//                             placeholder="Enter Wrost Rating Value"
//                             onChange={(e) => {
//                               const updatedReviews = [...reviews];
//                               updatedReviews[index].worstRatingValue =
//                                 e.target.value;
//                               setReviews(updatedReviews);
//                             }}
//                           />
//                           <span className="text-white text-xs">
//                             The lowest value allowed in this rating system. If
//                             omitted, 1 is assumed.
//                           </span>
//                         </div>

//                         <div className="mt-5">
//                           <input
//                             type="number"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             value={review.bestRatingValue}
//                             placeholder="Enter Best Rating Value"
//                             onChange={(e) => {
//                               const updatedReviews = [...reviews];
//                               updatedReviews[index].bestRatingValue =
//                                 e.target.value;
//                               setReviews(updatedReviews);
//                             }}
//                           />
//                           <span className="text-white text-xs">
//                             The highest value allowed in this rating system. If
//                             omitted, 5 is assumed.
//                           </span>
//                         </div>

//                         {reviews.length > 1 && (
//                           <div className="mt-2">
//                             <button
//                               type="button"
//                               className=" text-sm p-4 bg-red-600 text-white rounded "
//                               onClick={() => handleDeleteReview(index)}
//                             >
//                               Delete Review
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                     <div className="mt-5">
//                       <button
//                         type="button"
//                         className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                         onClick={handleAddReview}
//                       >
//                         Add Review
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </form>
//           </div>
//         </div>
//         <div className="w-full border">
//           <div>
//               <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//                 CODE
//               </h1>
//               <div className="text-white font-semibold py-2 pl-5 text-xs bg-slate-800">
//                 <p className="bg">
//                   Copy this to the &lt;head&gt; section of your page.
//                 </p>
//                 <CopyToClipboard
//                   text={`<script type="application/ld+json">\n${jsonText}\n</script>`}
//                 >
//                   <div className="ml-auto w-1/6">
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                       Copy
//                     </button>
//                   </div>
//                 </CopyToClipboard>
//               </div>
//               <div className="space-y-2 mt-5 ml-4">
//                 <pre className="text-white">
//                   <pre className="text-white">
//                     {`<script type="application/ld+json">\n`}
//                     {jsonText}
//                     {`\n</script>`}
//                   </pre>
//                 </pre>
//               </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Receipe;
