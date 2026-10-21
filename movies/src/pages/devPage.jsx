import { getCast } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import React from 'react';
import { Paper, Card, CardMedia, CardContent, Typography } from '@mui/material';

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w185";
const FALLBACK_IMAGE = "https://via.placeholder.com/140x210?text=No+Image";

const DevPage = (props) => {
  const id = 969681;

  const { data: castData, error: castError, isPending: castPending, isError: castIsError } = useQuery({
    queryKey: ["cast", {id: id}],
    queryFn: getCast,
  });

  if (castPending) {
    return <Spinner />
  }

  if (castIsError) {
    return <h1>{castError.message}</h1>
  }

  const cast = castData?.cast || [];

  return(
    <Paper>
    <Typography variant="h6">
      Cast
    </Typography>
    <Paper
      sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        p: 2, // Padding inside the paper container
      }}
    >
      {cast.map((person) => (
        <Card
          key={person.id}
          sx={{
            minWidth: 140,
            maxWidth: 140,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardMedia
            component="img"
            height="210" // TODO
            image={
              person.profile_path
                ? `${TMDB_IMAGE_BASE}${person.profile_path}`
                : FALLBACK_IMAGE
            }
            alt={person.name}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ p: 1, pb: '8px !important' }}>
            <Typography variant="subtitle2" noWrap title={person.name}>
              {person.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap title={person.character}>
              <i>{person.character}</i>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Paper> 
    </Paper>
  );
};

export default DevPage;
