import { useState } from "react";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import NavHeader from "../navHeader";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";

function MovieListPageTemplate({ movies, title, action, totalPages = 1, page = 1, onPageChange }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState([0, 10]);
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return m.vote_average >= ratingFilter[0] && m.vote_average <= ratingFilter[1];
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") {
      setNameFilter(value);
    } else if (type === "rating") {
      setRatingFilter(value);
    } else {
      setGenreFilter(value);
    }
  };

  const handlePageChange = (event, page) => {
    onPageChange(page)
  }

  return (
    <Grid container>
      <Grid size={12}>
        <NavHeader pageTitle={() => (
          <Typography variant="h4" component="h3" color="secondary">
            {title}
          </Typography>
        )}/>
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
          />
        </Grid>
        <MovieList action={action} movies={displayedMovies}></MovieList>
      </Grid>
      <Grid size={12} sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <Pagination
          count={totalPages > 500 ? 500 : totalPages}
          page={page}
          onChange={handlePageChange}
          color="secondary"
          size="large"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
