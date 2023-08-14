import React from "react";
import notFound from "../../assets/not_found.jpg";
import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" m={5}>
      <img
        src={notFound}
        alt="404 not found"
        style={{ maxWidth: "800px", minWidth: "200px" }}
      />
    </Box>
  );
};

export default NotFound;
