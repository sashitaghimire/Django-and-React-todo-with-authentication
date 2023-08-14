import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  Container,
  Typography,
  Toolbar,
  Box,
  AppBar,
  IconButton,
} from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { Logout, Person } from "@mui/icons-material";
import { useAuthDispatch } from "../../context/AuthContext";
import { axiosInstance } from "../../services/api";

const pages = ["User", "Todos"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const authDispatch = useAuthDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    console.log(event);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = async () => {
    const token = localStorage.getItem("refreshToken");
    try {
      await axiosInstance.post(`/user/logout/`, {
        refresh_token: token, // Send the refresh_token in the request body
      });
    } catch (error) {
      throw new Error("Error logging out"); // Handle any logout errors
    }
  };

  const logoutMutation = useMutation(logout, {
    onSuccess: (data) => {
      authDispatch({
        type: "LOGOUT",
      });
      history.push("/login");
    },
  });

  // Function to handle the delete button click
  const handleLogout = () => {
    // Call the deleteMutation.mutate() function to delete the item with the given ID

    logoutMutation.mutate();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NoteAltIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            Django React
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                fontWeight: 500,
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    if (page === "User") {
                      history.push("/user");
                    } else {
                      history.push("/todo");
                    }
                    setAnchorElNav(null);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <NoteAltIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  if (page === "User") {
                    history.push("/user");
                  } else {
                    history.push("/todo");
                  }
                  setAnchorElNav(null);
                }}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: 600,
                  fontSize: "16px",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  <Person />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  history.push("/profile");
                  handleCloseUserMenu();
                }}
                sx={{ px: 4, py: 1 }}
              >
                <Box display="flex" justifyContent="center" sx={{ gap: 2 }}>
                  <Avatar sx={{ width: 24, height: 24 }}>
                    <Person />
                  </Avatar>
                  Profile
                </Box>
              </MenuItem>

              <MenuItem onClick={handleLogout} sx={{ px: 4, py: 1 }}>
                <Box display="flex" alignItems="center" sx={{ gap: 2 }}>
                  <Logout />
                  Logout
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
