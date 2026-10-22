import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../api/tmdb-api";
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

const IMAGE_WIDTH = 185;
const IMAGE_HEIGHT = 278;
const TMDB_IMAGE_BASE_URL = `https://image.tmdb.org/t/p/w185`;
const FALLBACK_IMAGE_URL = `https://via.placeholder.com/${IMAGE_WIDTH}x${IMAGE_HEIGHT}?text=No+Image`;

const CastPage = (props) => {
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);

  const { data: personData, error: personError, isPending: personPending, isError: personIsError } = useQuery({
    queryKey: ['person', {id: id}],
    queryFn: getPerson,
  });

  if (personPending) {
    return <Spinner />;
  }

  if (personIsError) {
    return <h1>{personError.message}</h1>
  }

  return(
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', mt: 4}}>
      {console.log(personData)}
      <Paper sx={{p: 3, display: 'flex', alignItems: 'start', justifyContent: 'center', gap: 3, width: {xs: '90%', md: '60%'}}}>
        <Box
          component="img"
          alt={personData.name}
          src={personData.profile_path
            ? `${TMDB_IMAGE_BASE_URL}${personData.profile_path}`
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
    </Box>
  );
}

export default CastPage;
