import React from 'react';
import { Link } from 'react-router';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w200';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/100x150?text=No+Image';

export const PersonCard = ({ person }) => {
  const profileUrl = person.profile_path ? `${TMDB_IMAGE_BASE}${person.profile_path}` : PLACEHOLDER_IMAGE;

  return (
    <Card sx={{ display: 'flex', mb: 2, borderRadius: 2 }}>
      <CardActionArea 
        component={Link} 
        to={`/cast/${person.id}`}
        sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}
      >
        <CardMedia
          component="img"
          sx={{ width: 80, height: 120, borderRadius: 1, objectFit: 'cover' }}
          image={profileUrl}
        />
        <CardContent sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
          <Typography variant="h6" component="div">
            {person.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PersonCard;
