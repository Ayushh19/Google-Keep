


// // import React, { useState } from "react";
// // import {
// //   AppBar,
// //   Box,
// //   Toolbar,
// //   IconButton,
// //   Typography,
// //   Badge,
// //   MenuItem,
// //   Menu,
// //   InputBase,
// //   styled,
// // } from "@mui/material";
// // import {
// //   Menu as MenuIcon,
// //   Search as SearchIcon,
// //   Refresh as RefreshIcon,
// //   ViewStream as ViewStreamIcon,
// //   AccountCircle,
// //   MoreVert as MoreIcon,
// //   Refresh,
// // } from "@mui/icons-material";

// // const Search = styled("div")(({ theme }) => ({
// //   position: "relative",
// //   borderRadius: theme.shape.borderRadius,
// //   backgroundColor: "#f5f5f5",
// //   "&:hover": {
// //     backgroundColor: "#e0e0e0",
// //   },
// //   marginRight: theme.spacing(2),
// //   marginLeft: theme.spacing(5),
// //   width: "40%",
// //   [theme.breakpoints.up("sm")]: {
// //     marginLeft: theme.spacing(8),
// //     width: "50%",
// //   },
// // }));

// // const SearchIconWrapper = styled("div")(({ theme }) => ({
// //   padding: theme.spacing(0, 2),
// //   height: "100%",
// //   position: "absolute",
// //   pointerEvents: "none",
// //   display: "flex",
// //   alignItems: "center",
// //   justifyContent: "center",
// // }));

// // const StyledInputBase = styled(InputBase)(({ theme }) => ({
// //   color: "inherit",
// //   width: "100%",
// //   "& .MuiInputBase-input": {
// //     padding: theme.spacing(1, 1, 1, 0),
// //     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
// //     transition: theme.transitions.create("width"),
// //     width: "100%",
// //     [theme.breakpoints.up("md")]: {
// //       width: "20ch",
// //     },
// //   },
// // }));

// // function Header({ toggleDrawer }) {
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

// //   const isMenuOpen = Boolean(anchorEl);
// //   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

// //   const handleProfileMenuOpen = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };

// //   const handleMobileMenuClose = () => {
// //     setMobileMoreAnchorEl(null);
// //   };

// //   const handleMenuClose = () => {
// //     setAnchorEl(null);
// //     handleMobileMenuClose();
// //   };

// //   const handleMobileMenuOpen = (event) => {
// //     setMobileMoreAnchorEl(event.currentTarget);
// //   };

// //   const menuId = "primary-search-account-menu";
// //   const renderMenu = (
// //     <Menu
// //       anchorEl={anchorEl}
// //       anchorOrigin={{ vertical: "top", horizontal: "right" }}
// //       id={menuId}
// //       keepMounted
// //       transformOrigin={{ vertical: "top", horizontal: "right" }}
// //       open={isMenuOpen}
// //       onClose={handleMenuClose}
// //     >
// //       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
// //       <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
// //     </Menu>
// //   );

// //   const mobileMenuId = "primary-search-account-menu-mobile";
// //   const renderMobileMenu = (
// //     <Menu
// //       anchorEl={mobileMoreAnchorEl}
// //       anchorOrigin={{ vertical: "top", horizontal: "right" }}
// //       id={mobileMenuId}
// //       keepMounted
// //       transformOrigin={{ vertical: "top", horizontal: "right" }}
// //       open={isMobileMenuOpen}
// //       onClose={handleMobileMenuClose}
// //     >
// //       <MenuItem>
// //         <IconButton size="large"  color="inherit">
         
// //             <RefreshIcon />
      
// //         </IconButton>
       
// //       </MenuItem>
// //       <MenuItem>
// //         <IconButton size="large" color="inherit">
        
// //             <ViewStreamIcon />
         
// //         </IconButton>
        
// //       </MenuItem>
// //       <MenuItem onClick={handleProfileMenuOpen}>
// //         <IconButton
// //           size="large"
// //           aria-label="account of current user"
// //           aria-controls="primary-search-account-menu"
// //           aria-haspopup="true"
// //           color="inherit"
// //         >
// //           <AccountCircle />
// //         </IconButton>
// //         <p>Profile</p>
// //       </MenuItem>
// //     </Menu>
// //   );

// //   return (
// //     <Box sx={{ flexGrow: 1 }}>
// //       <AppBar 
// //         position="fixed" 
// //         elevation={0}
// //         sx={{ 
// //           backgroundColor: "white", 
// //           color: "grey",
// //           zIndex: (theme) => theme.zIndex.drawer + 1,
// //           borderBottom: '1px solid #e0e0e0' // Added a subtle border instead of shadow
// //         }}
// //       >
// //         <Toolbar>
// //           <IconButton
// //             size="large"
// //             edge="start"
// //             color="inherit"
// //             aria-label="open drawer"
// //             sx={{ mr: 2 }}
// //             onClick={toggleDrawer}
// //           >
// //             <MenuIcon />
// //           </IconButton>

// //           <img
// //             src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
// //             alt="Logo"
// //             style={{ width: "40px", height: "40px", marginRight: "10px" }}
// //           />

// //           <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
// //             Keep
// //           </Typography>

// //           <Search>
// //             <SearchIconWrapper>
// //               <SearchIcon />
// //             </SearchIconWrapper>
// //             <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
// //           </Search>

// //           <Box sx={{ flexGrow: 1 }} />

// //           <Box sx={{ display: { xs: "none", md: "flex" } }}>
// //             <IconButton size="large"  color="inherit">
             
// //                 <RefreshIcon />
              
// //             </IconButton>
// //             <IconButton size="large"  color="inherit">
              
// //                 <ViewStreamIcon />
             
// //             </IconButton>
// //             <IconButton
// //               size="large"
// //               edge="end"
// //               aria-label="account of current user"
// //               aria-controls={menuId}
// //               aria-haspopup="true"
// //               onClick={handleProfileMenuOpen}
// //               color="inherit"
// //             >
// //               <AccountCircle />
// //             </IconButton>
// //           </Box>

// //           <Box sx={{ display: { xs: "flex", md: "none" } }}>
// //             <IconButton
// //               size="large"
// //               aria-label="show more"
// //               aria-controls={mobileMenuId}
// //               aria-haspopup="true"
// //               onClick={handleMobileMenuOpen}
// //               color="inherit"
// //             >
// //               <MoreIcon />
// //             </IconButton>
// //           </Box>
// //         </Toolbar>
// //       </AppBar>
// //       {renderMobileMenu}
// //       {renderMenu}
// //     </Box>
// //   );
// // }

// // export default Header;

// import React, { useState } from "react";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   IconButton,
//   Typography,
//   Badge,
//   MenuItem,
//   Menu,
//   InputBase,
//   styled,
// } from "@mui/material";
// import {
//   Menu as MenuIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   ViewStream as ViewStreamIcon,
//   AccountCircle,
//   MoreVert as MoreIcon,
//   Refresh,
// } from "@mui/icons-material";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: "#f5f5f5",
//   "&:hover": {
//     backgroundColor: "#e0e0e0",
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: theme.spacing(5),
//   width: "40%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(8),
//     width: "50%",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   width: "100%",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

// function Header({ toggleDrawer, toggleView }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const menuId = "primary-search-account-menu";
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: "top", horizontal: "right" }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = "primary-search-account-menu-mobile";
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: "top", horizontal: "right" }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         <IconButton size="large" color="inherit">
//           <RefreshIcon />
//         </IconButton>
//       </MenuItem>
//       <MenuItem>
//         <IconButton size="large" color="inherit">
//           <ViewStreamIcon />
//         </IconButton>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   );

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar
//         position="fixed"
//         elevation={0}
//         sx={{
//           backgroundColor: "white",
//           color: "grey",
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           borderBottom: '1px solid #e0e0e0' // Added a subtle border instead of shadow
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="open drawer"
//             sx={{ mr: 2 }}
//             onClick={toggleDrawer}
//           >
//             <MenuIcon />
//           </IconButton>

//           <img
//             src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
//             alt="Logo"
//             style={{ width: "40px", height: "40px", marginRight: "10px" }}
//           />

//           <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
//             Keep
//           </Typography>

//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
//           </Search>

//           <Box sx={{ flexGrow: 1 }} />

//           <Box sx={{ display: { xs: "none", md: "flex" } }}>
//             <IconButton size="large" color="inherit" onClick={toggleView}>
//               <ViewStreamIcon />
//             </IconButton>
//             <IconButton
//               size="large"
//               edge="end"
//               aria-label="account of current user"
//               aria-controls={menuId}
//               aria-haspopup="true"
//               onClick={handleProfileMenuOpen}
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//           </Box>

//           <Box sx={{ display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       {renderMobileMenu}
//       {renderMenu}
//     </Box>
//   );
// }

// export default Header;

// Header.js
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  InputBase,
  styled,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  ViewStream as ViewStreamIcon,
  AccountCircle,
  MoreVert as MoreIcon,
  Refresh,
} from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#f5f5f5",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(5),
  width: "40%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(8),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Header({ toggleDrawer, toggleView }) { // Accept toggleView as a prop
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <RefreshIcon />
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <ViewStreamIcon />
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "white",
          color: "grey",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: '1px solid #e0e0e0' // Added a subtle border instead of shadow
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>

          <img
            src="https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png"
            alt="Logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />

          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            Keep
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit" onClick={toggleView}>
              <ViewStreamIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Header;