import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import FavoriteIcon from "../components/cardIcons/favouriteIcon";
import { useState } from "react";

const HomePage = (props) => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover", page],
    queryFn: getMovies,
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
      title="Discover Movies"
      movies={movies}
      totalPages={totalPages}
      page={page}
      onPageChange={(newPage) => setPage(newPage)}
      action={(movie) => {
        return <FavoriteIcon movie={movie} />;
      }}
    />
  );
};

export default HomePage;
