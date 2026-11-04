import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import { getGenres } from "../../api/tmdb-api";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';

const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); 
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleRatingChange = (e) => {
    handleChange(e, "rating", e.target.value);
  }

  const sliderMarks = [
    { value: 0, label: '0' },
    { value: 5, label: '5' },
    { value: 10, label: '10' }
  ];

  return (
    <Card 
      sx={{
        backgroundColor: ""
      }} 
      variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}> 
            <SearchIcon />
          </Avatar>
        }
        title={
          <Typography variant="h5" sx={{ color: 'primary.main' }}>
            Filter the Movies
          </Typography>
        }
        sx={{ pl: 3 }}
      />
      <CardContent>
        <TextField
          sx={{...formControl}} 
          id="filled-search"
          label="Filter by Title"
          type="search"
          variant="outlined"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            id="genre-select"
            label="Genre"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Box sx={{mx: 3}}>
          <InputLabel id="rating-label" sx={{pt: 2}}>Average Rating</InputLabel>
          <Slider
            id="rating-slider"
            value={props.ratingFilter}
            onChange={handleRatingChange}
            marks={sliderMarks}
            shiftStep={1}
            step={1}
            min={0}
            max={10}
            valueLabelDisplay="auto"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
