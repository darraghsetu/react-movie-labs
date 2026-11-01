import { useSearchParams } from 'react-router';
import Spinner from "../components/spinner";
import { useQuery } from "@tanstack/react-query";
import { getMovieSearchResults, getPersonSearchResults } from "../api/tmdb-api";
import Typography from '@mui/material/Typography';
import NavHeader from '../components/navHeader';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MovieCard from '../components/movieSearchResultCard';
import PersonCard from '../components/personSearchResultCard';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SearchPage = (props) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const { data: movieData, error: movieError, isPending: movieIsPending, isError: movieIsError } = useQuery({
    queryKey: ["search movie", query],
    queryFn: getMovieSearchResults,
  });

  const { data: personData, error: personError, isPending: personIsPending, isError: personIsError } = useQuery({
    queryKey: ["search people", query],
    queryFn: getPersonSearchResults,
  });

  if (movieIsPending || personIsPending) {
    return <Spinner />
  }

  if (movieIsError) {
    return <h1>{movieError.message}</h1>
  }

  if (personIsError) {
    return <h1>{personError.message}</h1>
  }
  
  const searchMovies = movieData?.results || []
  const searchPeople = personData?.results || []
  const numResults = searchMovies.length + searchPeople.length;

  return(
    <>
      <NavHeader pageTitle={() => 
        <Typography variant="h6" color="primary">
          { numResults > 0 ? `Search results for "${query}"` : `No results for "${query}"` }
        </Typography>
      }>
      </NavHeader>
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', my: 4}}>
        <Box sx={{width: { xs: '90%', md: '60%' }, display: 'flex', flexDirection: 'column', gap: 3 }}>
        { searchPeople.length > 0 ?
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{p: 2}}>
              <Typography variant="h5" color="primary">
                People
              </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {searchPeople.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </AccordionDetails>
            </Accordion>
          : <> </>
        }
        { searchMovies.length > 0 ?
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{p: 2}}>
              <Typography variant="h5" color="primary">
                Movies
              </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {searchMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </AccordionDetails>
            </Accordion>
          : <> </> 
        }
        </Box>
      </Box>
    {console.log(searchMovies)}
    {console.log(searchPeople)}
    </>
  )
}

export default SearchPage;
