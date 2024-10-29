import { Box, Skeleton } from "@mui/material";

function LoadingProduct() {
  return (
    <Box>
      <Skeleton variant="rectangular" height={200} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Box>
  );
}

export default LoadingProduct;
