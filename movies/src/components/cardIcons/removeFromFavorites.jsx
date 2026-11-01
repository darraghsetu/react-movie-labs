import { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    context.removeFromFavorites(movie);
  }

  return (
    <>
      <IconButton
        aria-label="remove from favorites"
        onClick={handleOpen}
      >
        <DeleteIcon color="primary" fontSize="large" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleCancel}
        role="alertdialog"
      >
        <DialogContent>
          <DialogContentText>
            {`Are you sure you wish to remove ${movie.title} from favourites?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>
            Confirm
          </Button>
          <Button onClick={handleCancel} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RemoveFromFavoritesIcon;
