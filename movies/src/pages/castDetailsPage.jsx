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
import NavHeader from '../components/navHeader';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import IconButton from '@mui/material/IconButton';
import { useMemo } from 'react';

const IMAGE_WIDTH = 185;
const IMAGE_HEIGHT = 278;
const TMDB_IMAGE_BASE_URL = `https://image.tmdb.org/t/p/`;
const FALLBACK_IMAGE_URL = `https://via.placeholder.com/${IMAGE_WIDTH}x${IMAGE_HEIGHT}?text=No+Image`;

const CastPage = (props) => {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('desc');

  const { data: personData, error: personError, isPending: personPending, isError: personIsError } = useQuery({
    queryKey: ['person', {id: id}],
    queryFn: getPerson,
  });

  const { data: moviesData, error: moviesError, isPending: moviesPending, isError: moviesIsError } = useQuery({
    queryKey: ['personMovies', {id: id}],
    queryFn: getPersonMovies,
  });
  
  const sortedMovies = useMemo(() => {
    if (!moviesData) return [];

    const filtered = moviesData.cast.filter((movie) => movie.release_date);

    return filtered.sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [moviesData, sortOrder]);

  if (personPending || moviesPending) {
    return <Spinner />;
  }

  if (personIsError) {
    return <h1>{personError.message}</h1>
  }

  if (moviesIsError) {
    return <h1>{moviesError.message}</h1>
  }

  return(
    <>
    <NavHeader pageTitle={() => null}/>
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', my: 4}}>
      <Box sx={{width: { xs: '90%', md: '60%' }, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Paper sx={{p: 3, display: 'flex', alignItems: 'start', gap: 3}}>
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

        <Paper sx={{ p: 3 }}>
          <Box 
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 1
            }}
          >
            <Typography variant="h4" color="primary" sx={{my: 1}}>
              Movie Credits
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Typography variant="body2" sx={{my: 1}}>
                Sort by Year
              </Typography>
              <IconButton sx={{bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.light" } }} onClick={() => {setSortOrder(order => (order === 'desc' ? 'asc' : 'desc'))}}>
                <SwapVertIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <List disablePadding>
            {sortedMovies.map((movie) => (
              <ListItem key={movie.id} alignItems="flex-start" divider disablePadding sx={{p: 2}} onClick={() => navigate(`/movies/${movie.id}`)}>
                <ListItemAvatar sx={{mr: 2, mt: 0 }}>
                  <Avatar
                    src={movie.poster_path
                      ? `${TMDB_IMAGE_BASE_URL}w342${movie.poster_path}`
                      : FALLBACK_IMAGE_URL // TODO
                    }
                    alt={movie.title}
                    sx={{width: 200, height: 300}}
                    variant="square"
                  />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                      <Typography variant="h6" fontWeight="bold">
                        <b>{movie.title}</b> ({movie.release_date.slice(0, 4)})
                      </Typography>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 0.5 }}>
                      <Typography variant="subtitle1" color="text.secondary" component="span">
                        <i>{movie.character}</i>
                      </Typography>
                      <br/>
                      <Typography variant="body1" color="text.secondary" component="span">
                        {movie.overview}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
    </>
  );
}

export default CastPage;
