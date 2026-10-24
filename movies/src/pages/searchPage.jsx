import { useSearchParams } from 'react-router';
import Spinner from "../components/spinner";
import { useQuery } from "@tanstack/react-query";
import { getSearchResults } from "../api/tmdb-api";

const SearchPage = (props) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["search", query],
    queryFn: getSearchResults,
  });

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }
  
  const searchPeople = data.results.filter((result) => result.media_type === "person")
  const searchMovies = data.results.filter((result) => result.media_type === "movie")

  return(
    <>
    {console.log(searchMovies)}
    {console.log(searchPeople)}
    </>
  )
}

export default SearchPage;
