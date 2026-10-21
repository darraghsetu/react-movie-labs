import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const Header = (props ) => {
  const title = props.title;
  const navigate = useNavigate();

  return (
    <Paper 
      component="div" 
      sx={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginBottom: 1.5,
        minHeight: "70px",
        alignItems: "center",
      }}
      >
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="secondary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3" color="secondary">
        {title}
      </Typography>
      
      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon color="secondary" fontSize="large" />
      </IconButton>

    </Paper>
  );
};

export default Header;
