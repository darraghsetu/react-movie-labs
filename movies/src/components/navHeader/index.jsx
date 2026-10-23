import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";

const NavHeader = ({ pageTitle }) => {
  const navigate = useNavigate();

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        padding: 1.5,
        margin: 0,
        minHeight: "70px",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <IconButton aria-label="go back" onClick={() => navigate(-1)}>
          <ArrowBackIcon color="secondary" fontSize="large" />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", textAlign: "center", px: 2 }}>
        {pageTitle()}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
          <ArrowForwardIcon color="secondary" fontSize="large" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default NavHeader;
