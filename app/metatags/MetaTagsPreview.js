// app/meta-tags-generator/MetaTagsPreview.js

import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Visibility as PreviewIcon } from "@mui/icons-material";

export default function MetaTagsPreview({ title, description }) {
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Box sx={{ bgcolor: "warning.main", color: "white", p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          <PreviewIcon sx={{ mr: 1, verticalAlign: "middle" }} />
          SEARCH ENGINE PREVIEW
        </Typography>
      </Box>
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            color: "#1a0dab",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {title || "Your Page Title Here"}
        </Typography>
        <Typography variant="caption" color="success.main">
          {process.env.NEXT_PUBLIC_WEBSITE_URL || "https://metaforge.allaboutcse.com"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description ||
            "Your page description will appear here. Make it compelling to encourage clicks from search results."}
        </Typography>
      </Box>
    </Paper>
  );
}
