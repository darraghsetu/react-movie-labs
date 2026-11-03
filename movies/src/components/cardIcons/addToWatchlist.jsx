import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { grey } from '@mui/material/colors';

const AddToWatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const onWatchlist = context.watchlist.includes(movie.id);

  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    context.addToWatchlist(movie);
  };
  
  return (
    <IconButton aria-label="add to watchlist" onClick={handleAddToWatchlist}>
      <VisibilityOutlinedIcon color={onWatchlist ? 'primary' : grey[400]} fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchlistIcon;
