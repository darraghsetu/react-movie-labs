import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson, getPersonMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { excerpt } from '../utils';
import Link from '@mui/material/Link';
import { useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

const IMAGE_WIDTH = 185;
const IMAGE_HEIGHT = 278;
const TMDB_IMAGE_BASE_URL = `https://image.tmdb.org/t/p/`;
const FALLBACK_IMAGE_URL = `https://via.placeholder.com/${IMAGE_WIDTH}x${IMAGE_HEIGHT}?text=No+Image`;

const CastPage = (props) => {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);

  const { data: personData, error: personError, isPending: personPending, isError: personIsError } = useQuery({
    queryKey: ['person', {id: id}],
    queryFn: getPerson,
  });

  const { data: moviesData, error: moviesError, isPending: moviesPending, isError: moviesIsError } = useQuery({
    queryKey: ['personMovies', {id: id}],
    queryFn: getPersonMovies,
  });

  if (personPending || moviesPending) {
    return <Spinner />;
  }

  if (personIsError) {
    return <h1>{personError.message}</h1>
  }

  if (moviesIsError) {
    return <h1>{moviesError.message}</h1>
  }
  
  let sortedMovies = [];
  let upcomingMovies = [];

  if (!moviesPending) {
    sortedMovies = [...moviesData.cast].sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);

      return dateB - dateA
    });

    upcomingMovies = sortedMovies.filter((movie) => !movie.release);
    sortedMovies = sortedMovies.filter((movie) => movie.release_date);
    console.log(sortedMovies);
  }

  return(
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', mt: 4}}>
      {console.log(personData)}
      <Paper sx={{p: 3, display: 'flex', alignItems: 'start', justifyContent: 'center', gap: 3, width: {xs: '90%', md: '60%'}}}>
        <Box
          component="img"
          alt={personData.name}
          src={personData.profile_path
            ? `${TMDB_IMAGE_BASE_URL}w185${personData.profile_path}`
            : FALLBACK_IMAGE_URL
          }
        />
        <Box sx={{ display: 'flex', flexDirection:'column', gap: 1.5, flexGrow: 1 }}>
          <Typography variant="h3">
            {personData.name}
          </Typography>
          <Typography variant="body1"> 
            { expanded ? personData.biography : excerpt(personData.biography) }
          </Typography>
          <Button variant="outlined" onClick={() => setExpanded(!expanded)} 
            startIcon = {
              expanded ?
                <KeyboardArrowUpIcon />
                : <KeyboardArrowDownIcon />
            }>
            { expanded ? "Show Less" : "Show More" }
          </Button>
        </Box>
      </Paper>
      <Paper>
        <Typography variant="h4" color="primary" sx={{ml: 2, my: 1}}>
          Movie Credits
        </Typography>
        <Divider />
        <List disablePadding>
          {sortedMovies.map((movie) => (
            <ListItem key={movie.id} alignItems="flex-start" divider disablePadding>
              <ListItemAvatar sx={{ mr: 2, mt: 0 }}>
                <Avatar
                  src={movie.poster_path
                    ? `${TMDB_IMAGE_BASE_URL}w154${movie.poster_path}`
                    : FALLBACK_IMAGE_URL // TODO
                  }
                  alt={movie.title}
                  sx={{width: 100, height: 150}}
                  variant="square"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight="bold">
                      <b>{movie.title}</b> ({movie.release_date.slice(0, 4)})
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary" component="span">
                    {movie.character}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default CastPage;
