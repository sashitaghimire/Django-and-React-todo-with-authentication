import React from "react";
import { Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Container component="main" maxWidth="xl" minWidth="sm">
        {children}
      </Container>
    </>
  );
};

export default Layout;
