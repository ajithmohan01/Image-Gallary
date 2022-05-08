import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControl, TextField, Container, Grid } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const Body = () => {
  const [baseImage, setBaseImage] = useState();
  const [images, setImages] = useState([]);
  const [skip, setSkip] = useState(0);

  async function Upload(e) {
    try {
      // console.log(baseImage);

      const image = {
        baseImage,
      };
      let data = await axios.post("/upload", image);
    } catch (error) {
      console.log(error);
    }
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };
  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    if (offsetHeight + scrollTop >= scrollHeight) {
      setSkip(images.length);
    }
  };
  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`/images?skip=${skip}`);
      setImages([...images,...data]);
    })();
  }, [skip]);



  return (
    <div>
      <FormControl>
        <div>
          <TextField
            required
            fullWidth
            id="pic"
            type="file"
            onChange={(e) => {
              uploadImage(e);
            }}
          />
          <Button onClick={Upload}>Done</Button>
        </div>
      </FormControl>

     
      <Box
        sx={{
          width: "100vw",
          height: "75vh",
          overflow: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          
        }}
        onScroll={handleScroll}
      >
        {images.map((data) => (
          <Box>
            <Card
              sx={{
                maxWidth: 345,
                boxShadow: 9,
                "&:hover": {
                  boxShadow: 6,
                },
                borderRadius: 2,
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image={data.image}
                alt="green iguana"
              />

              <CardContent>
                <Typography> </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Body;
