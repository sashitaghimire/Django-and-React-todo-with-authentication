import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fbad33",
      contrastText: "#233759",
    },
    secondary: {
      main: "#f50057",
    },
    divider: "rgba(175,172,172,0.12)",
    text: {
      primary: "#233759",
    },
    default: {
      main: "gray",
    },
  },

  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          // Customize the styles of the table here
          fontSize: "16px",
          // Add more customizations if needed
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          // Use the global selector to target sticky table head cells
          "& th": {
            backgroundColor: "#233759", // Custom background color
            color: "white", // Custom text color
          },
        },
      },
    },
  },
});

export default theme;
