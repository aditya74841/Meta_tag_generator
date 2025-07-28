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
// const Organization = () => {
//   const formatDate = (date) => {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     let month = d.getMonth() + 1;
//     if (month < 10) month = `0${month}`;
//     let day = d.getDate();
//     if (day < 10) day = `0${day}`;
//     return `${year}-${month}-${day}`;
//   };

//   const [showSocialProfile, setShowSocialProfile] = useState(false);

//   const [organizationType, setOrganizationType] = useState("");
//   const [organizationName, setOrganizationName] = useState("");
//   const [logoUrl, setLogoUrl] = useState("");
//   const [websiteUrl, setWebsiteUrl] = useState("");
//   const [streetAddress, setStreetAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [country, setCountry] = useState("");
//   const [pincode, setPincode] = useState("");
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

//   const addressFields = {
//     "@type": "PostalAddress",
//     ...(streetAddress && { streetAddress }),
//     ...(city && { addressLocality: city }),
//     ...(state && { addressRegion: state }),
//     ...(pincode && { postalCode: pincode }),
//     ...(country && { addressCountry: country }),
//   };

//   const jsonText = JSON.stringify(
//     {
//       "@context": "http://schema.org/",
//       "@type": "Organization",
//       name: organizationName,
//       logo: logoUrl,
//       url: websiteUrl,
//       ...(Object.keys(addressFields).length !== 0 && {
//         address: addressFields,
//       }),
//       sameAs: showSocialProfile ? socialProfiles : [],
//     },
//     null,
//     2
//   );

//   return (
//     <div className="px-3">
//       <h1 className="text-white text-xl text-bold">
//         Organization Structured Data Generator
//       </h1>
//       <p className="text-white text-sm mt-2">Logo and social profiles</p>
//       <div className="flex mt-5">
//         <div className="w-full border">
//           <h1 className="text-white uppercase font-semibold py-1 pl-5 bg-slate-600">
//             OPTIONS
//           </h1>
//           <div className="py-4 px-5 bg-gray-800">
//             <form>
//               <h1 className="text-white font-semibold mt-5">Organization </h1>
//               <div className="mt-5">
//                 <select
//                   id="type"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={organizationType}
//                   onChange={(e) => setOrganizationType(e.target.value)}
//                 >
//                   <option>Select Organization Type</option>
//                   {organizations.map((organization) => (
//                     <option key={organization.value} value={organization.value}>
//                       {organization.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Organization Name"
//                   value={organizationName}
//                   onChange={(e) => setOrganizationName(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <input
//                   type="text"
//                   id="first_name"
//                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="Enter Logo Url"
//                   value={logoUrl}
//                   onChange={(e) => setLogoUrl(e.target.value)}
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
//                   value={pincode}
//                   onChange={(e) => setPincode(e.target.value)}
//                 />
//               </div>

//               <div className="mt-5">
//                 <select
//                   id="type"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   value={countries}
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
//                       placeholder="Instagram"
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

// export default Organization;


"use client";
import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  businessCategories,
  countries,
  currencies,
  organizations,
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
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Business as OrganizationIcon,
  CheckCircle as CheckIcon,
  Preview as PreviewIcon,
  Code as CodeIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  LocationOn as LocationIcon,
  Language as WebsiteIcon,
  Image as ImageIcon,
  Category as CategoryIcon,
  Share as SocialIcon,
  Home as AddressIcon,
  Public as CountryIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Pinterest as PinterestIcon,
  YouTube as YouTubeIcon,
  Link as LinkIcon,
} from "@mui/icons-material";

const Organization = () => {
  const [organizationType, setOrganizationType] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [showSocialProfile, setShowSocialProfile] = useState(true); // Set to true by default
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

    if (!organizationName.trim()) newErrors.organizationName = "Organization name is required";
    if (!organizationType) newErrors.organizationType = "Organization type is required";

    // URL validation
    const urlPattern = /^https?:\/\/.+/;
    if (websiteUrl && !urlPattern.test(websiteUrl)) {
      newErrors.websiteUrl = "Please enter a valid URL starting with http:// or https://";
    }
    if (logoUrl && !urlPattern.test(logoUrl)) {
      newErrors.logoUrl = "Please enter a valid URL starting with http:// or https://";
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
  }, [organizationName, organizationType, websiteUrl, logoUrl, showSocialProfile, facebook, instagram, twitter, linkedIn, pintrest, youtube]);

  const socialProfiles = [
    facebook,
    instagram,
    linkedIn,
    twitter,
    pintrest,
    youtube,
  ].filter((profile) => profile.trim());

  const generateJSON = () => {
    const addressFields = {
      "@type": "PostalAddress",
      ...(streetAddress && { streetAddress }),
      ...(city && { addressLocality: city }),
      ...(state && { addressRegion: state }),
      ...(pincode && { postalCode: pincode }),
      ...(country && { addressCountry: country }),
    };

    // Only include address if at least one field is filled
    const hasAddress = streetAddress || city || state || pincode || country;

    return {
      "@context": "https://schema.org",
      "@type": organizationType || "Organization",
      name: organizationName,
      ...(logoUrl && { logo: logoUrl }),
      ...(websiteUrl && { url: websiteUrl }),
      ...(hasAddress && { address: addressFields }),
      ...(showSocialProfile && socialProfiles.length > 0 && { sameAs: socialProfiles }),
    };
  };

  const jsonText = JSON.stringify(generateJSON(), null, 2);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFormValid = Object.keys(errors).length === 0 && 
    organizationName.trim() && organizationType;

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <FacebookIcon sx={{ color: "#1877F2" }} />;
      case 'instagram': return <InstagramIcon sx={{ color: "#E4405F" }} />;
      case 'twitter': return <TwitterIcon sx={{ color: "#1DA1F2" }} />;
      case 'linkedin': return <LinkedInIcon sx={{ color: "#0A66C2" }} />;
      case 'pinterest': return <PinterestIcon sx={{ color: "#BD081C" }} />;
      case 'youtube': return <YouTubeIcon sx={{ color: "#FF0000" }} />;
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
          <OrganizationIcon sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Organization Structured Data Generator
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
              Create structured data for organizations with logo, address, and social media profiles.
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
                ORGANIZATION CONFIGURATION
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
                {/* Organization Details Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    <OrganizationIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Organization Details
                  </Typography>
                </Grid>

                {/* Organization Type */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.organizationType}>
                    <InputLabel>Organization Type *</InputLabel>
                    <Select
                      value={organizationType}
                      label="Organization Type *"
                      onChange={(e) => setOrganizationType(e.target.value)}
                    >
                      <MenuItem value="">Select Organization Type</MenuItem>
                      {organizations.map((organization) => (
                        <MenuItem key={organization.value} value={organization.value}>
                          {organization.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.organizationType && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
                        {errors.organizationType}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Organization Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Organization Name *"
                    placeholder="Your Organization Name"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    error={!!errors.organizationName}
                    helperText={errors.organizationName || `${organizationName.length} characters`}
                    InputProps={{
                      startAdornment: <OrganizationIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Logo URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Logo URL"
                    placeholder="https://example.com/logo.png"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    error={!!errors.logoUrl}
                    helperText={errors.logoUrl || "High-quality logo image (recommended: square format)"}
                    InputProps={{
                      startAdornment: <ImageIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Website URL */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Website URL"
                    placeholder="https://yourorganization.com"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    error={!!errors.websiteUrl}
                    helperText={errors.websiteUrl || "Official website of the organization"}
                    InputProps={{
                      startAdornment: <WebsiteIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                {/* Address Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Organization Address" />
                  </Divider>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                    <LocationIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Address Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Provide the organization's physical address (all fields are optional)
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
                    label="City"
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    InputProps={{
                      startAdornment: <LocationIcon sx={{ mr: 1, color: "action.active" }} />,
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
                      startAdornment: <LocationIcon sx={{ mr: 1, color: "action.active" }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ZIP/Postal Code"
                    placeholder="10001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    InputProps={{
                      startAdornment: <AddressIcon sx={{ mr: 1, color: "action.active" }} />,
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

                {/* Social Profiles Section */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }}>
                    <Chip label="Social Media Profiles" />
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
                        Add your organization's social media profiles (leave empty if not available)
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Facebook URL"
                        placeholder="https://facebook.com/yourorganization"
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
                        placeholder="https://instagram.com/yourorganization"
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
                        placeholder="https://twitter.com/yourorganization"
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
                        placeholder="https://linkedin.com/company/yourorganization"
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
                        placeholder="https://pinterest.com/yourorganization"
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
                        placeholder="https://youtube.com/yourorganization"
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
            {/* Organization Preview */}
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  ORGANIZATION PREVIEW
                </Typography>
              </Box>
              <Card sx={{ borderRadius: 0 }}>
                {logoUrl ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={logoUrl}
                    alt="Organization logo"
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
                    <OrganizationIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography color="text.secondary">
                      No logo selected
                    </Typography>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {organizationName || "Organization Name"}
                  </Typography>
                  
                  {organizationType && (
                    <Chip 
                      label={organizationType} 
                      size="small" 
                      color="primary" 
                      sx={{ mb: 2 }}
                    />
                  )}

                  {websiteUrl && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <WebsiteIcon fontSize="small" />
                      <Typography variant="body2" component="a" href={websiteUrl} target="_blank" rel="noopener">
                        {websiteUrl}
                      </Typography>
                    </Box>
                  )}
                  
                  {(city || state || country) && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <LocationIcon fontSize="small" />
                      <Typography variant="body2">
                        {[city, state, country].filter(Boolean).join(", ") || "Address not provided"}
                      </Typography>
                    </Box>
                  )}

                  {socialProfiles.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" fontWeight="bold" gutterBottom>
                        Social Media:
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
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
                  <Alert severity={organizationName.trim() ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Organization Name: {organizationName.trim() ? "✓ Added" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={organizationType ? "success" : "error"} variant="outlined">
                    <Typography variant="caption">
                      Organization Type: {organizationType ? "✓ Selected" : "✗ Required"}
                    </Typography>
                  </Alert>
                  
                  <Alert severity={logoUrl ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Logo: {logoUrl ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={websiteUrl ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Website: {websiteUrl ? "✓ Added" : "ℹ Optional but recommended"}
                    </Typography>
                  </Alert>

                  <Alert severity={(city || state || country) ? "success" : "info"} variant="outlined">
                    <Typography variant="caption">
                      Address: {(city || state || country) ? "✓ Added" : "ℹ Optional"}
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

export default Organization;
