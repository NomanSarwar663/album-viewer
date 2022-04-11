import { fetchRecommendedAlbum } from "../api/api";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import Footer from "./Footer";

const SecondPage = () => {
  let { albumQuery } = useParams();
  const searchQuery = encodeURI(`[${albumQuery}]`);

  const [albums, setAlbum] = useState(null);
  const [index, setindex] = useState(0);

  function nextAlbum() {
    if (index < albums.length - 1) {
      setindex(index + 1);
    }
  }
  function prevAlbum() {
    if (index > albums.length - 1) {
      setindex(index - 1);
    }
  }

  useEffect(() => {
    async function getAlbum() {
      try {
        const albumResponse = await fetchRecommendedAlbum({ searchQuery });
        if (albumResponse) setAlbum(albumResponse);
        else setAlbum([]);
      } catch (error) {
        console.log("Error occur");
      }
    }
    getAlbum();
  }, [searchQuery]);
  return (
    <Box>
      {albums?.length ? (
        <Box sx={{ padding: "3% 8%" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "700px" }}
            >
              <img
                width="100%"
                height="auto"
                src={albums?.length ? albums[index].url : null}
                alt={albums?.length ? albums[index].url : null}
              />
            </Box>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h3"
              sx={{ textAlign: "center", color: "white" }}
            >
              {albums?.length ? albums[index].Album_Name : null}
            </Typography>
            <Box variant="h5" sx={{ textAlign: "center", color: "white" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                }}
              >
                <Typography variant="h5">Genres:</Typography>
                <Box sx={{ textAlign: "left", ml: 2 }}>
                  <Typography>
                    {" "}
                    {albums?.length ? albums[index].Artist : null}{" "}
                  </Typography>
                  <Typography>
                    {" "}
                    {albums?.length ? albums[index].Sec_Genres : null}{" "}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                }}
              >
                <Typography variant="h5">Descriptors:</Typography>
                <Box sx={{ textAlign: "left", ml: 2 }}>
                  <Typography>
                    {" "}
                    {albums?.length ? albums[index].Descriptors : null}{" "}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              margin: "5% 10px",
            }}
          >
            <Button variant="contained" onClick={prevAlbum}>
              Previous
            </Button>
            <Button variant="contained" onClick={nextAlbum}>
              Next
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h5" sx={{ textAlign: "center", color: "white" }}>
            {!albums || albums === "undefined"
              ? "Loading..."
              : "No Album Found"}
          </Typography>
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default SecondPage;
