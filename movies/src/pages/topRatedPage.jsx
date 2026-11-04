import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import FavouriteIcon from "../components/cardIcons/favouriteIcon";
import { useState } from "react";

const TopRatedPage = (props) => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["top_rated", page],
    queryFn: getTopRatedMovies,
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
      title="Top Rated Movies"
      movies={movies}
      totalPages={totalPages}
      page={page}
      onPageChange={(newPage) => setPage(newPage)}
      action={(movie) => {
        return <FavouriteIcon movie={movie} />;
      }}
    />
  );
};

export default TopRatedPage;
