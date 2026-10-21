import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getCast } from '../api/tmdb-api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

const MoviePage = (props) => {
  const { id } = useParams();

  const { data: movieData, error: movieError, isPending: moviePending, isError: movieIsError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })

  const { data: castData, error: castError, isPending: castPending, isError: castIsError } = useQuery({
    queryKey: ["cast", {id: id}],
    queryFn: getCast,
  });

  if (moviePending || castPending) {
    return <Spinner />;
  }

  if (movieIsError) {
    return <h1>{movieError.message}</h1>;
  }

  if (castIsError) {
    return <h1>{castError.message}</h1>;
  }

  const cast = castData?.cast || [];

  return (
    <>
      {movieData ? (
        <>
          <PageTemplate movie={movieData}>
            <MovieDetails movie={movieData} cast={cast} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
