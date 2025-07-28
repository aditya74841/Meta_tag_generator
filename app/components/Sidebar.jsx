
"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Chip,
  Tooltip,
  Paper,
  useMediaQuery,
  Fade,
} from "@mui/material";

// Icons
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandLess,
  ExpandMore,
  Code as CodeIcon,
  Language as LanguageIcon,
  Share as ShareIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Business as BusinessIcon,
  Article as ArticleIcon,
  Person as PersonIcon,
  Event as EventIcon,
  Work as WorkIcon,
  LocalBusiness as LocalBusinessIcon,
  Restaurant as RestaurantIcon,
  VideoLibrary as VideoIcon,
  Web as WebIcon,
  Book as BookIcon,
  MusicNote as MusicIcon,
  LiveTv as TvIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from "@mui/icons-material";

import Link from "next/link";

const drawerWidth = 280;

// Enhanced styling with modern colors and gradients
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backdropFilter: "blur(10px)",
  height: "100vh",
  position: "fixed",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backdropFilter: "blur(10px)",
  height: "100vh",
  position: "fixed",
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  ...theme.mixins.toolbar,
  flexShrink: 0,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(102, 126, 234, 0.37)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  position: "fixed",
  width: "100%", // Always full width
  marginLeft: 0, // Remove margin left to prevent black screen
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      display: "flex",
      flexDirection: "column",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      display: "flex",
      flexDirection: "column",
    },
  }),
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
    transform: "translateX(4px)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  "&.active": {
    background: "rgba(255, 255, 255, 0.25)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  },
}));

// Scrollable navigation container
const NavigationContainer = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 255, 255, 0.3)",
    borderRadius: "3px",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.5)",
    },
  },
});

// Footer container that stays at bottom
const DrawerFooter = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  padding: theme.spacing(2),
  textAlign: "center",
  flexShrink: 0,
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
}));

// **KEY ADDITION: MainContent wrapper to handle dynamic margins**
const MainContent = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      marginLeft: open ? drawerWidth : `calc(${theme.spacing(8)} + 1px)`,
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0, // No margin on mobile
    },
    marginTop: "64px", // AppBar height
    minHeight: "calc(100vh - 64px)",
    width: open 
      ? `calc(100% - ${drawerWidth}px)` 
      : `calc(100% - ${theme.spacing(7)} - 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: open 
        ? `calc(100% - ${drawerWidth}px)` 
        : `calc(100% - ${theme.spacing(8)} - 1px)`,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  })
);

// Navigation data structure for better organization
const navigationData = [
  {
    id: "metatags",
    title: "Meta Tags",
    icon: <CodeIcon />,
    href: "/metatags",
    color: "#4CAF50",
  },
  {
    id: "structured",
    title: "Structured Data",
    icon: <LanguageIcon />,
    color: "#2196F3",
    children: [
      { title: "Article", href: "/structuredtags/article", icon: <CodeIcon /> },
      {
        title: "Breadcrumb",
        href: "/structuredtags/breadcrumb",
        icon: <CodeIcon />,
      },
      { title: "Event", href: "/structuredtags/event", icon: <CodeIcon /> },
      { title: "FAQ", href: "/structuredtags/faq", icon: <CodeIcon /> },
      { title: "How-to", href: "/structuredtags/how-to", icon: <CodeIcon /> },
      {
        title: "Job Posting",
        href: "/structuredtags/job-posting",
        icon: <CodeIcon />,
      },
      {
        title: "Local Business",
        href: "/structuredtags/localbusiness",
        icon: <CodeIcon />,
      },
      {
        title: "Organization",
        href: "/structuredtags/organization",
        icon: <CodeIcon />,
      },
      { title: "Person", href: "/structuredtags/person", icon: <CodeIcon /> },
      { title: "Product", href: "/structuredtags/product", icon: <CodeIcon /> },
      { title: "Recipe", href: "/structuredtags/receipe", icon: <CodeIcon /> },
      { title: "Video", href: "/structuredtags/video", icon: <CodeIcon /> },
      { title: "Website", href: "/structuredtags/website", icon: <CodeIcon /> },
    ],
  },
  {
    id: "opengraph",
    title: "Open Graph",
    icon: <FacebookIcon />,
    color: "#FF5722",
    children: [
      { title: "Article", href: "/opengraph/article", icon: <ArticleIcon /> },
      { title: "Book", href: "/opengraph/book", icon: <BookIcon /> },
      {
        title: "Business",
        href: "/opengraph/business",
        icon: <BusinessIcon />,
      },
      {
        title: "Music Album",
        href: "/opengraph/musicalbum",
        icon: <MusicIcon />,
      },
      {
        title: "Music Playlist",
        href: "/opengraph/musicplaylist",
        icon: <MusicIcon />,
      },
      {
        title: "Music Station",
        href: "/opengraph/musicradiostation",
        icon: <MusicIcon />,
      },
      {
        title: "Music Song",
        href: "/opengraph/musicsong",
        icon: <MusicIcon />,
      },
      { title: "Product", href: "/opengraph/product", icon: <DashboardIcon /> },
      { title: "Profile", href: "/opengraph/profile", icon: <PersonIcon /> },
      { title: "Video", href: "/opengraph/video", icon: <VideoIcon /> },
      {
        title: "Video Episode",
        href: "/opengraph/videoepisode",
        icon: <TvIcon />,
      },
      {
        title: "Video Movie",
        href: "/opengraph/videomovie",
        icon: <VideoIcon />,
      },
      { title: "TV Show", href: "/opengraph/videotvshow", icon: <TvIcon /> },
      { title: "Website", href: "/opengraph/website", icon: <WebIcon /> },
    ],
  },
  {
    id: "twitter",
    title: "Twitter Cards",
    icon: <TwitterIcon />,
    color: "#9C27B0",
    children: [
      { title: "App", href: "/twittercard/app", icon: <DashboardIcon /> },
      { title: "Player", href: "/twittercard/player", icon: <VideoIcon /> },
      { title: "Summary", href: "/twittercard/summary", icon: <ArticleIcon /> },
      {
        title: "Large Image",
        href: "/twittercard/summarylargeimage",
        icon: <ArticleIcon />,
      },
    ],
  },
];

export default function EnhancedWebcodeToolsLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(!isMobile);
  const [expandedSections, setExpandedSections] = React.useState({});

  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSectionToggle = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const renderNavigationItem = (item, isChild = false) => {
    if (item.children) {
      return (
        <React.Fragment key={item.id}>
          <StyledListItemButton onClick={() => handleSectionToggle(item.id)}>
            <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              sx={{
                color: "white",
                "& .MuiTypography-root": {
                  fontWeight: 500,
                  fontSize: open ? "0.9rem" : "0.8rem",
                },
              }}
            />
            <Chip
              label={item.children.length}
              size="small"
              sx={{
                bgcolor: item.color,
                color: "white",
                display: open ? "flex" : "none",
              }}
            />
            {expandedSections[item.id] ? (
              <ExpandLess sx={{ color: "white" }} />
            ) : (
              <ExpandMore sx={{ color: "white" }} />
            )}
          </StyledListItemButton>
          <Collapse in={expandedSections[item.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map((child) => (
                <Link
                  href={child.href}
                  key={child.href}
                  style={{ textDecoration: "none" }}
                >
                  <Fade in={expandedSections[item.id]} timeout={300}>
                    <StyledListItemButton sx={{ pl: open ? 4 : 2 }}>
                      <ListItemIcon
                        sx={{ color: "rgba(255,255,255,0.8)", minWidth: 32 }}
                      >
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={child.title}
                        sx={{
                          color: "rgba(255,255,255,0.9)",
                          "& .MuiTypography-root": {
                            fontSize: "0.85rem",
                          },
                        }}
                      />
                    </StyledListItemButton>
                  </Fade>
                </Link>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    return (
      <Link href={item.href} key={item.id} style={{ textDecoration: "none" }}>
        <StyledListItemButton>
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            sx={{
              color: "white",
              "& .MuiTypography-root": {
                fontWeight: 500,
                fontSize: "0.9rem",
              },
            }}
          />
          <Chip
            label="New"
            size="small"
            sx={{
              bgcolor: item.color,
              color: "white",
              display: open ? "flex" : "none",
            }}
          />
        </StyledListItemButton>
      </Link>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Enhanced App Bar */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Avatar
            sx={{
              width: 32,
              height: 32,
              mr: 2,
              bgcolor: "rgba(255,255,255,0.2)",
            }}
          >
            <CodeIcon />
          </Avatar>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            <Link 
              href="/" 
              style={{ 
                textDecoration: "none", 
                color: "inherit",
                "&:hover": { opacity: 0.8 }
              }}
            >
               MetaForge
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Enhanced Drawer with Fixed Height */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            zIndex: theme.zIndex.drawer,
          },
        }}
      >
        <DrawerHeader>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{ width: 32, height: 32, bgcolor: "rgba(255,255,255,0.2)" }}
            >
              <CodeIcon sx={{ color: "white" }} />
            </Avatar>
            {open && (
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Tools
              </Typography>
            )}
          </Box>
          <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

        {/* Scrollable Navigation Container */}
        <NavigationContainer>
          <List sx={{ px: 1, py: 2 }}>
            {navigationData.map((item) => renderNavigationItem(item))}
          </List>
        </NavigationContainer>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

        {/* Footer Section - Always at bottom */}
        {open && (
          <DrawerFooter>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              WebCode Tools Pro
            </Typography>
            <br />
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.5)" }}
            >
              Made with ❤️
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Tooltip title="Version 2.0">
                <Chip
                  label="v2.0"
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.2)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Tooltip>
            </Box>
          </DrawerFooter>
        )}
      </Drawer>

      {/* **KEY ADDITION: MainContent wrapper that handles dynamic margins** */}
      <MainContent open={open}>
        {children}
      </MainContent>
    </Box>
  );
}



// "use client";

// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import {
//   Box,
//   Drawer as MuiDrawer,
//   AppBar as MuiAppBar,
//   Toolbar,
//   List,
//   CssBaseline,
//   Typography,
//   Divider,
//   IconButton,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   Avatar,
//   Chip,
//   Tooltip,
//   Paper,
//   useMediaQuery,
//   Fade,
// } from "@mui/material";

// // Icons
// import {
//   Menu as MenuIcon,
//   ChevronLeft as ChevronLeftIcon,
//   ChevronRight as ChevronRightIcon,
//   ExpandLess,
//   ExpandMore,
//   Code as CodeIcon,
//   Language as LanguageIcon,
//   Share as ShareIcon,
//   Twitter as TwitterIcon,
//   Facebook as FacebookIcon,
//   Business as BusinessIcon,
//   Article as ArticleIcon,
//   Person as PersonIcon,
//   Event as EventIcon,
//   Work as WorkIcon,
//   LocalBusiness as LocalBusinessIcon,
//   Restaurant as RestaurantIcon,
//   VideoLibrary as VideoIcon,
//   Web as WebIcon,
//   Book as BookIcon,
//   MusicNote as MusicIcon,
//   LiveTv as TvIcon,
//   Home as HomeIcon,
//   Dashboard as DashboardIcon,
//   Settings as SettingsIcon,
//   Help as HelpIcon,
// } from "@mui/icons-material";

// import Link from "next/link";

// const drawerWidth = 280;

// // Enhanced styling with modern colors and gradients
// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
//   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   backdropFilter: "blur(10px)",
//   // Fixed height to screen
//   height: "100vh",
//   position: "fixed",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   backdropFilter: "blur(10px)",
//   // Fixed height to screen
//   height: "100vh",
//   position: "fixed",
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   padding: theme.spacing(0, 2),
//   background: "rgba(255, 255, 255, 0.1)",
//   backdropFilter: "blur(10px)",
//   ...theme.mixins.toolbar,
//   // Ensure header stays at top
//   flexShrink: 0,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   backdropFilter: "blur(10px)",
//   boxShadow: "0 8px 32px rgba(102, 126, 234, 0.37)",
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   // Fixed position
//   position: "fixed",
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": {
//       ...openedMixin(theme),
//       // Ensure scrollable content area
//       display: "flex",
//       flexDirection: "column",
//     },
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": {
//       ...closedMixin(theme),
//       // Ensure scrollable content area
//       display: "flex",
//       flexDirection: "column",
//     },
//   }),
// }));

// const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
//   margin: theme.spacing(0.5, 1),
//   borderRadius: theme.spacing(1),
//   transition: "all 0.3s ease-in-out",
//   "&:hover": {
//     background: "rgba(255, 255, 255, 0.2)",
//     transform: "translateX(4px)",
//     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//   },
//   "&.active": {
//     background: "rgba(255, 255, 255, 0.25)",
//     boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
//   },
// }));

// // Scrollable navigation container
// const NavigationContainer = styled(Box)({
//   flexGrow: 1,
//   overflowY: "auto",
//   overflowX: "hidden",
//   // Custom scrollbar styling
//   "&::-webkit-scrollbar": {
//     width: "6px",
//   },
//   "&::-webkit-scrollbar-track": {
//     background: "rgba(255, 255, 255, 0.1)",
//     borderRadius: "3px",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     background: "rgba(255, 255, 255, 0.3)",
//     borderRadius: "3px",
//     "&:hover": {
//       background: "rgba(255, 255, 255, 0.5)",
//     },
//   },
// });

// // Footer container that stays at bottom
// const DrawerFooter = styled(Box)(({ theme }) => ({
//   marginTop: "auto",
//   padding: theme.spacing(2),
//   textAlign: "center",
//   flexShrink: 0,
//   borderTop: "1px solid rgba(255, 255, 255, 0.1)",
// }));

// // Navigation data structure for better organization
// const navigationData = [
//   {
//     id: "metatags",
//     title: "Meta Tags",
//     icon: <CodeIcon />,
//     href: "/metatags",
//     color: "#4CAF50",
//   },
//   {
//     id: "structured",
//     title: "Structured Data",
//     icon: <LanguageIcon />,
//     color: "#2196F3",
//     children: [
//       { title: "Article", href: "/structuredtags/article", icon: <CodeIcon /> },
//       {
//         title: "Breadcrumb",
//         href: "/structuredtags/breadcrumb",
//         icon: <CodeIcon />,
//       },
//       { title: "Event", href: "/structuredtags/event", icon: <CodeIcon /> },
//       { title: "FAQ", href: "/structuredtags/faq", icon: <CodeIcon /> },
//       { title: "How-to", href: "/structuredtags/how-to", icon: <CodeIcon /> },
//       {
//         title: "Job Posting",
//         href: "/structuredtags/job-posting",
//         icon: <CodeIcon />,
//       },
//       {
//         title: "Local Business",
//         href: "/structuredtags/localbusiness",
//         icon: <CodeIcon />,
//       },
//       {
//         title: "Organization",
//         href: "/structuredtags/organization",
//         icon: <CodeIcon />,
//       },
//       { title: "Person", href: "/structuredtags/person", icon: <CodeIcon /> },
//       { title: "Product", href: "/structuredtags/product", icon: <CodeIcon /> },
//       { title: "Recipe", href: "/structuredtags/receipe", icon: <CodeIcon /> },
//       { title: "Video", href: "/structuredtags/video", icon: <CodeIcon /> },
//       { title: "Website", href: "/structuredtags/website", icon: <CodeIcon /> },
//     ],
//   },
//   {
//     id: "opengraph",
//     title: "Open Graph",
//     icon: <FacebookIcon />,
//     color: "#FF5722",
//     children: [
//       { title: "Article", href: "/opengraph/article", icon: <ArticleIcon /> },
//       { title: "Book", href: "/opengraph/book", icon: <BookIcon /> },
//       {
//         title: "Business",
//         href: "/opengraph/business",
//         icon: <BusinessIcon />,
//       },
//       {
//         title: "Music Album",
//         href: "/opengraph/musicalbum",
//         icon: <MusicIcon />,
//       },
//       {
//         title: "Music Playlist",
//         href: "/opengraph/musicplaylist",
//         icon: <MusicIcon />,
//       },
//       {
//         title: "Music Station",
//         href: "/opengraph/musicradiostation",
//         icon: <MusicIcon />,
//       },
//       {
//         title: "Music Song",
//         href: "/opengraph/musicsong",
//         icon: <MusicIcon />,
//       },
//       { title: "Product", href: "/opengraph/product", icon: <DashboardIcon /> },
//       { title: "Profile", href: "/opengraph/profile", icon: <PersonIcon /> },
//       { title: "Video", href: "/opengraph/video", icon: <VideoIcon /> },
//       {
//         title: "Video Episode",
//         href: "/opengraph/videoepisode",
//         icon: <TvIcon />,
//       },
//       {
//         title: "Video Movie",
//         href: "/opengraph/videomovie",
//         icon: <VideoIcon />,
//       },
//       { title: "TV Show", href: "/opengraph/videotvshow", icon: <TvIcon /> },
//       { title: "Website", href: "/opengraph/website", icon: <WebIcon /> },
//     ],
//   },
//   {
//     id: "twitter",
//     title: "Twitter Cards",
//     icon: <TwitterIcon />,
//     color: "#9C27B0",
//     children: [
//       { title: "App", href: "/twittercard/app", icon: <DashboardIcon /> },
//       { title: "Player", href: "/twittercard/player", icon: <VideoIcon /> },
//       { title: "Summary", href: "/twittercard/summary", icon: <ArticleIcon /> },
//       {
//         title: "Large Image",
//         href: "/twittercard/summarylargeimage",
//         icon: <ArticleIcon />,
//       },
//     ],
//   },
// ];

// export default function EnhancedWebcodeToolsLayout({ children }) {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [open, setOpen] = React.useState(!isMobile);
//   const [expandedSections, setExpandedSections] = React.useState({});

//   React.useEffect(() => {
//     setOpen(!isMobile);
//   }, [isMobile]);

//   const handleDrawerToggle = () => {
//     setOpen(!open);
//   };

//   const handleSectionToggle = (sectionId) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [sectionId]: !prev[sectionId],
//     }));
//   };

//   const renderNavigationItem = (item, isChild = false) => {
//     if (item.children) {
//       return (
//         <React.Fragment key={item.id}>
//           <StyledListItemButton onClick={() => handleSectionToggle(item.id)}>
//             <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText
//               primary={item.title}
//               sx={{
//                 color: "white",
//                 "& .MuiTypography-root": {
//                   fontWeight: 500,
//                   fontSize: open ? "0.9rem" : "0.8rem",
//                 },
//               }}
//             />
//             <Chip
//               label={item.children.length}
//               size="small"
//               sx={{
//                 bgcolor: item.color,
//                 color: "white",
//                 display: open ? "flex" : "none",
//               }}
//             />
//             {expandedSections[item.id] ? (
//               <ExpandLess sx={{ color: "white" }} />
//             ) : (
//               <ExpandMore sx={{ color: "white" }} />
//             )}
//           </StyledListItemButton>
//           <Collapse in={expandedSections[item.id]} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               {item.children.map((child) => (
//                 <Link
//                   href={child.href}
//                   key={child.href}
//                   style={{ textDecoration: "none" }}
//                 >
//                   <Fade in={expandedSections[item.id]} timeout={300}>
//                     <StyledListItemButton sx={{ pl: open ? 4 : 2 }}>
//                       <ListItemIcon
//                         sx={{ color: "rgba(255,255,255,0.8)", minWidth: 32 }}
//                       >
//                         {child.icon}
//                       </ListItemIcon>
//                       <ListItemText
//                         primary={child.title}
//                         sx={{
//                           color: "rgba(255,255,255,0.9)",
//                           "& .MuiTypography-root": {
//                             fontSize: "0.85rem",
//                           },
//                         }}
//                       />
//                     </StyledListItemButton>
//                   </Fade>
//                 </Link>
//               ))}
//             </List>
//           </Collapse>
//         </React.Fragment>
//       );
//     }

//     return (
//       <Link href={item.href} key={item.id} style={{ textDecoration: "none" }}>
//         <StyledListItemButton>
//           <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
//             {item.icon}
//           </ListItemIcon>
//           <ListItemText
//             primary={item.title}
//             sx={{
//               color: "white",
//               "& .MuiTypography-root": {
//                 fontWeight: 500,
//                 fontSize: "0.9rem",
//               },
//             }}
//           />
//           <Chip
//             label="New"
//             size="small"
//             sx={{
//               bgcolor: item.color,
//               color: "white",
//               display: open ? "flex" : "none",
//             }}
//           />
//         </StyledListItemButton>
//       </Link>
//     );
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       {/* Enhanced App Bar */}
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="toggle drawer"
//             onClick={handleDrawerToggle}
//             edge="start"
//             sx={{ marginRight: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>

//           <Avatar
//             sx={{
//               width: 32,
//               height: 32,
//               mr: 2,
//               bgcolor: "rgba(255,255,255,0.2)",
//             }}
//           >
//             <CodeIcon />
//           </Avatar>

//           <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//             <Link href="/">WebCode Tools Pro</Link>
//           </Typography>

          
//         </Toolbar>
//       </AppBar>

//       {/* Enhanced Drawer with Fixed Height */}
//       <Drawer
//         variant={isMobile ? "temporary" : "permanent"}
//         open={open}
//         onClose={handleDrawerToggle}
//         sx={{
//           "& .MuiDrawer-paper": {
//             // Ensure fixed positioning
//             position: "fixed",
//             top: 0,
//             left: 0,
//             height: "100vh",
//             zIndex: theme.zIndex.drawer,
//           },
//         }}
//       >
//         <DrawerHeader>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Avatar
//               sx={{ width: 32, height: 32, bgcolor: "rgba(255,255,255,0.2)" }}
//             >
//               <CodeIcon sx={{ color: "white" }} />
//             </Avatar>
//             {open && (
//               <Typography
//                 variant="h6"
//                 sx={{ color: "white", fontWeight: "bold" }}
//               >
//                 Tools
//               </Typography>
//             )}
//           </Box>
//           <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
//             {theme.direction === "rtl" ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>

//         <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

//         {/* Scrollable Navigation Container */}
//         <NavigationContainer>
//           <List sx={{ px: 1, py: 2 }}>
//             {navigationData.map((item) => renderNavigationItem(item))}
//           </List>
//         </NavigationContainer>

//         <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

//         {/* Footer Section - Always at bottom */}
//         {open && (
//           <DrawerFooter>
//             <Typography
//               variant="caption"
//               sx={{ color: "rgba(255,255,255,0.7)" }}
//             >
//               WebCode Tools Pro
//             </Typography>
//             <br />
//             <Typography
//               variant="caption"
//               sx={{ color: "rgba(255,255,255,0.5)" }}
//             >
//               Made with ❤️
//             </Typography>
//             <Tooltip title="Version 2.0">
//             <Chip
//               label="v2.0"
//               size="small"
//               sx={{
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 color: "white",
//                 fontWeight: "bold",
//               }}
//             />
//           </Tooltip>
//           </DrawerFooter>
//         )}
//       </Drawer>
//     </Box>
//   );
// }
