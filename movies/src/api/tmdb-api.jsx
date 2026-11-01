import { tryFetch } from "../utils";

const URL_SUFFIX = `api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`;

export const getMovies = () => {
    const url = `https://api.themoviedb.org/3/discover/movie?${URL_SUFFIX}`;

    return tryFetch(url);
};

export const getCast = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?${URL_SUFFIX}`;

  return tryFetch(url);
}

export const getPerson = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const url = `https://api.themoviedb.org/3/person/${id}?${URL_SUFFIX}`;

  return tryFetch(url);
}

export const getPersonMovies = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?${URL_SUFFIX}`;

  return tryFetch(url);
}

export const getMovieSearchResults = (args) => {
  const [, queryPart] = args.queryKey;
  const query = queryPart;
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&${URL_SUFFIX}`;

  return tryFetch(url);
}

export const getPersonSearchResults = (args) => {
  const [, queryPart] = args.queryKey;
  const query = queryPart;
  const url = `https://api.themoviedb.org/3/search/person?query=${query}&${URL_SUFFIX}`;

  return tryFetch(url);
}

export const getUpcomingMovies = () => {
  const url = `https://api.themoviedb.org/3/movie/upcoming?${URL_SUFFIX}`;

  return tryFetch(url);
};

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const url = `https://api.themoviedb.org/3/movie/${id}?${URL_SUFFIX}`;

  return tryFetch(url);
};

export const getGenres = () => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?${URL_SUFFIX}`;

  return tryFetch(url);
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  const url = `https://api.themoviedb.org/3/movie/${id}/images?${URL_SUFFIX}`;

  return tryFetch(url);
};

export const getMovieReviews = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  const url = `https://api.themoviedb.org/3/movie/${id}/reviews?${URL_SUFFIX}`;

  return tryFetch(url);
};

export const getTopRatedMovies = () => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?${URL_SUFFIX}`;

  return tryFetch(url);
}
