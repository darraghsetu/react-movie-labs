import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { MoviesContext } from "../../contexts/moviesContext";

const FavouriteIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [open, setOpen] = useState(false); // State of remove from favourite confirmation dialog box
  const isFavourited = context.favourites.includes(movie.id);

  const handleClick = (e) => {
    e.preventDefault();
    if (isFavourited) {
      setOpen(true);
    } else {
      context.addToFavourites(movie);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    context.removeFromFavourites(movie);
  };

  return (
    <>
      <IconButton
        aria-label={isFavourited ? "remove from favourites" : "add to favourites"}
        onClick={handleClick}
      >
        <FavoriteIcon sx={{ color: isFavourited ? 'primary.main' : grey[400] }} fontSize="large" />
      </IconButton>

      <Dialog open={open} onClose={handleCancel} role="alertdialog">
        <DialogContent>
          <DialogContentText>
            {`Are you sure you wish to remove ${movie.title} from favourites?`}
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

export default FavouriteIcon;
