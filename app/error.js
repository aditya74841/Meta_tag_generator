"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 5, textAlign: "center", borderRadius: 3, maxWidth: 500 }}
      >
        <Typography variant="h4" color="error" gutterBottom sx={{ fontWeight: "bold" }}>
          Something went wrong!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          We encountered an unexpected error while trying to load this page.
        </Typography>
        <Button
          variant="contained"
          onClick={() => reset()}
          sx={{
            bgcolor: "#1DA1F2",
            "&:hover": { bgcolor: "#0d8bd9" },
            px: 4,
          }}
        >
          Try Again
        </Button>
      </Paper>
    </Box>
  );
}
