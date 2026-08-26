import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f7f7f7",
        color: "blue",
        textAlign: "center",
        padding: 3,
        "@media(max-width:1900px)": {
          paddingBottom: "100px",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ff4d4d",
          borderRadius: "50%",
          padding: 3,
          marginBottom: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "white" }} />
      </Box>

      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#ff4d4d", marginBottom: 2 }}
      >
        Oops! Something Went Wrong
      </Typography>

      <Typography variant="body1" sx={{ color: "#555", marginBottom: 3 }}>
        Sorry, we couldn't find the page you're looking for. Please try again
        later.
      </Typography>

      <Link to="/">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff4d4d",
            color: "white",
            "&:hover": {
              backgroundColor: "#e04343",
            },
          }}
        >
          Go Back
        </Button>
      </Link>
    </Box>
  );
};

export default Error;
