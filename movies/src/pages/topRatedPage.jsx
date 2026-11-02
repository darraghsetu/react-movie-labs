import { getTopRatedMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
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

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      totalPages={totalPages}
      page={page}
      onPageChange={(newPage) => setPage(newPage)}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default TopRatedPage;
