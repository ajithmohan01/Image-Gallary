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
// import moment from "moment";
import InfiniteScroll from 'react-infinite-scroll-component';
const Body = () => {
  const [baseImage, setBaseImage] = useState();
    const [image, setImage] = useState([]);
    const [page, setPage] = useState(1)
    
  useEffect(() => {
    (async () => {
      let { data } = await axios.get("/getimage");
      setImage(data);
      console.log(data);
    })();
  }, []);

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

    
    const fetchData = () => {
       

    }
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

          <InfiniteScroll dataLength={image.length} next={fetchData}
              hasMore={true}
              
             
              > 
        <div
          style={{
            display: "flex",

            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: "50px",
          }}
        >
          {image.map((data) => (
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
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Body;
