import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import FavouriteIcon from "../components/cardIcons/favouriteIcon";
import WriteReview from "../components/cardIcons/writeReview";

const FavouriteMoviesPage = () => {
  const {favourites: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const favouriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = favouriteMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = favouriteMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <FavouriteIcon movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );

};

export default FavouriteMoviesPage;
