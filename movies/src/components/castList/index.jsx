import React from 'react';
import { Paper, Card, CardMedia, CardContent, Typography } from '@mui/material';

const CARD_WIDTH = 140
const IMAGE_WIDTH = CARD_WIDTH;
const IMAGE_HEIGHT = 210;
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185";
const FALLBACK_IMAGE_URL = `https://via.placeholder.com/${IMAGE_WIDTH}x${IMAGE_HEIGHT}?text=No+Image`;

export default function CastList({ cast }){
    return(
      <>
      <Typography variant="h5" component="h3" sx={{mb: 2}} color='primary'>
        Cast
      </Typography>
      <Paper sx={{ display: 'flex', overflowX: 'auto', gap: 2, p: 2, mb: 2 }}>
        {cast.map((person) => (
          <Card
            key={person.id}
            sx={{
              minWidth: CARD_WIDTH,
              maxWidth: CARD_WIDTH,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardMedia
              component="img"
              height={IMAGE_HEIGHT}
              image={
                person.profile_path
                  ? `${TMDB_IMAGE_BASE_URL}${person.profile_path}`
                  : FALLBACK_IMAGE_URL
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
      </>
  );
};
