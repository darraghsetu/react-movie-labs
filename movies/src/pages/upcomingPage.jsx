import { useState } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api";
import WatchlistIcon from "../components/cardIcons/watchlistIcon";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import FavouriteIcon from "../components/cardIcons/favouriteIcon";

const UpcomingPage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["upcoming", page],
    queryFn: getUpcomingMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const totalPages = data.total_pages;
  
  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      totalPages={totalPages}
      page={page}
      onPageChange={(newPage) => setPage(newPage)}
      action={(movie) => {
        return <>
            <FavouriteIcon movie={movie} />
            <WatchlistIcon movie={movie} />
          </>
      }}
    />
  );
};

export default UpcomingPage;
