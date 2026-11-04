import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { grey } from '@mui/material/colors';
import { MoviesContext } from "../../contexts/moviesContext";

const WatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [open, setOpen] = useState(false); // State of remove from watchlist confirmation dialog box
  const onWatchlist = context.watchlist.includes(movie.id);

  const handleClick = (e) => {
    e.preventDefault();
    if (onWatchlist) {
      setOpen(true);
    } else {
      context.addToWatchlist(movie);
    }
  }

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    context.removeFromWatchlist(movie);
  };

  return (
    <>
      <IconButton 
        aria-label={onWatchlist ? "remove from watchlist" : "add to watchlist"} 
        onClick={handleClick}>
        <VisibilityOutlinedIcon color={onWatchlist ? 'primary' : grey[400]} fontSize="large" />
      </IconButton>

      <Dialog open={open} onClose={handleCancel} role="alertdialog">
        <DialogContent>
          <DialogContentText>
            {`Are you sure you wish to remove ${movie.title} from watchlist?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Confirm</Button>
          <Button onClick={handleCancel} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WatchlistIcon;
