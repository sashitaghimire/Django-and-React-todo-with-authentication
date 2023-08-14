import React from "react";
import TodoTable from "./TodoTable";
import { Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import Layout from "../../components/Layout/Layout";

function Todos() {
  const [open, setOpen] = React.useState(false);
  return (
    <Layout>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h1>Todos</h1>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Add New Todo
        </Button>
      </Box>
      <TodoTable open={open} setOpen={setOpen} />
    </Layout>
  );
}

export default Todos;
