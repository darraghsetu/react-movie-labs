import React from 'react';
import { Link } from 'react-router';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w200';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/100x150?text=No+Image';

export const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : PLACEHOLDER_IMAGE;
  const releaseYear = movie.release_date.slice(0, 4)

  return (
    <Card sx={{ display: 'flex', mb: 2, borderRadius: 2 }}>
      <CardActionArea 
        component={Link} 
        to={`/movies/${movie.id}`}
        sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}
      >
        <CardMedia
          component="img"
          sx={{ width: 80, height: 120, borderRadius: 1, objectFit: 'cover' }}
          image={posterUrl}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, pl: 2 }}>
          <Typography variant="h6" component="div">
            {movie.title} {releaseYear ? `(${releaseYear})` : null }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
