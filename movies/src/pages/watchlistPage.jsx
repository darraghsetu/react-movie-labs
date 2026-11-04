import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import FavouriteIcon from "../components/cardIcons/favouriteIcon";
import WatchlistIcon from "../components/cardIcons/watchlistIcon";

const WatchlistPage = () => {
  const { watchlist: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchlistMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });
  
  // Check if any of the parallel queries is still loading.
  const isPending = watchlistMovieQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const movies = watchlistMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  return (
    <PageTemplate
      title="Your Watchlist"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <FavouriteIcon movie={movie} />
            <WatchlistIcon movie={movie} />
          </>
        );
      }}
    />
  );

};

export default WatchlistPage;
