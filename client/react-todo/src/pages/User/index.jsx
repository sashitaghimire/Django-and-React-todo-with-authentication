import React from "react";
import UserTable from "./UserTable";
import { Box, Button } from "@mui/material";
import Layout from "../../components/Layout/Layout";

function User() {
  const [open, setOpen] = React.useState(false);

  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {" "}
        <h1>User</h1>
        <Button onClick={() => setOpen(true)} variant="outlined">
          Add New User
        </Button>
      </Box>
      <UserTable open={open} setOpen={setOpen} />
    </Layout>
  );
}

export default User;
