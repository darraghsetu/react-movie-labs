import { useQuery } from "@tanstack/react-query";
import Spinner from '../spinner'
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import NavHeader from "../navHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const TemplateMoviePage = ({ movie, children }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['images', { id: movie.id }],
    queryFn: getMovieImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  
  const images = data.posters; 

  return (
    <>
      <NavHeader pageTitle={() => (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h4" component="h3" color='secondary' >
            {movie.title}
          </Typography>

          { movie.tagline ?
              <Typography variant="subtitle1" component="h6">
                <i>{`"${movie.tagline}"`}</i>
              </Typography>
            : null
          }
        </Box>
      )} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid size={{xs: 3}}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList
                sx={{
                    height: "100vh",
                }}
                cols={1}
            >
                {images.map((image) => (
                    <ImageListItem key={image.file_path} cols={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                        alt={image.poster_path}
                    />
                    </ImageListItem>
                ))}
            </ImageList>
          </div>
        </Grid>

        <Grid size={{xs: 9}}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
