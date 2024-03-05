"use client";

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";

import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import Link from "next/link";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [structuredData, setStructuredData] = React.useState(false);

  const handleClick = () => {
    setStructuredData(!structuredData);
  };

  const [openGraph, setOpenGraph] = React.useState(false);

  const handleOpenGraphClick = () => {
    setOpenGraph(!openGraph);
  };

  const [openTwitter, setOpenTwitter] = React.useState(false);

  const handleOpenTwitterCard = () => {
    setOpenTwitter(!openTwitter);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Cnc Learning
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "black" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <Link href={"/metatags"}>
            <ListItemButton>
              <ListItemIcon>
                <DraftsIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Meta Tags" className="text-white" />
            </ListItemButton>
          </Link>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Structured Tags" className="text-white" />
            {structuredData ? (
              <ExpandLess className="text-white" />
            ) : (
              <ExpandMore className="text-white" />
            )}
          </ListItemButton>
          <Collapse in={structuredData} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href={"/structuredtags/article"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Article"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/breadcrumb"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Breadcrumb"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/event"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText primary="Event" className="ml-10 text-white" />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/faq"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText primary="FAQ" className="ml-10 text-white" />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/how-to"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText primary="How-to" className="ml-10 text-white" />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/job-posting"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Job Posting"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/localbusiness"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Local Business"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/organization"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Organization"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/person"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText primary="Person" className="ml-10 text-white" />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/product"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Product"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/receipe"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText primary="Recipe" className="ml-10 text-white" />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/video"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText primary="Video" className="ml-10 text-white" />
                </ListItemButton>
              </Link>
              <Link href={"/structuredtags/website"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Website (Sitelinks)"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          <ListItemButton onClick={handleOpenGraphClick}>
            <ListItemIcon>
              <InboxIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Open Graph" className="text-white" />
            {openGraph ? (
              <ExpandLess className="text-white" />
            ) : (
              <ExpandMore className="text-white" />
            )}
          </ListItemButton>
          <Collapse in={openGraph} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href={"/opengraph/article"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Article"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/book"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText primary="Book" className="ml-10 text-white" />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/business"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Business"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/musicalbum"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Music Album"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/musicplaylist"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Music Playlist"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/musicradiostation"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Music Radio Station"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/musicsong"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Music Song"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/product"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Product"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/profile"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Profile"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/video"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText primary="Video" className="ml-10 text-white" />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/videoepisode"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Video Episode"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/videomovie"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Video Movie"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/videotvshow"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Video Tv Show"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/opengraph/website"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Website"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          <ListItemButton onClick={handleOpenTwitterCard}>
            <ListItemIcon>
              <InboxIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Twitter Card" className="text-white" />
            {openTwitter ? (
              <ExpandLess className="text-white" />
            ) : (
              <ExpandMore className="text-white" />
            )}
          </ListItemButton>
          <Collapse in={openTwitter} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href={"/twittercard/app"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText primary="App" className="ml-10 text-white" />
                </ListItemButton>
              </Link>
              <Link href={"/twittercard/player"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText primary="Player" className="ml-10 text-white" />
                </ListItemButton>
              </Link>
              <Link href={"/twittercard/summary"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Summary"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
              <Link href={"/twittercard/summarylargeimage"}>
                <ListItemButton sx={{ p: 0, pl: 4 }}>
                  <ListItemText
                    primary="Summary Large Image"
                    className="ml-10 text-white"
                  />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
      {/* <Box component="main" sx={{}}>
        <DrawerHeader />
      </Box> */}
    </Box>
  );
}
