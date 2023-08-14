import { Box, CircularProgress, Container } from "@mui/material";

const FullScreenLoader = () => {
  return (
    <Container>
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size={50} />
      </Box>
    </Container>
  );
};

export default FullScreenLoader;
