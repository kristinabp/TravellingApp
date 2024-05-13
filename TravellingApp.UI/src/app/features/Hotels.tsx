import React, { useEffect, useState } from "react";
import GoogleMaps from "./GoogleMaps.tsx";
import { Box, Button, Card, CardActions, CardContent, CardMedia, List, ListItem, ListItemText, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  flexWrap: "wrap",
};
const Hotels = ({maxOut}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotel, setSelectedHotel] = useState<any | null>(null);

  useEffect(() => {
      fetchDataHotels();
  }, []);


  // да не се пуска, защото има ограничени извиквания
  // const fetchDataHotels = async () => {
  //     try {
  //     const response = await fetch('http://localhost:8000/hotels/Sofia/2024-06-01/2024-06-08');
  //     if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //     }
  //     const jsonData = await response.json();
  //     console.log(jsonData.properties);
  //     setData(jsonData.properties);
  //     } catch (error) {
  //     console.error('Error fetching data:', error);
  //     } finally {
  //     setLoading(false);
  //     }
  // };

  const handleHotelsClick = (hotel: any) => {
      setSelectedHotel(hotel);
  };


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const closeModal = () => {
    setSelectedHotel(null);
  };

  return (
    <>
      {loading ? (
        <Typography gutterBottom variant="h5" component="div">
          Loading...
        </Typography>
      ) : (
        <>
          <Typography gutterBottom variant="h5" component="div">
            Hotel suggestions
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {data.slice(0, maxOut).map((hotel, index) => (
              <Card sx={{ margin: 1 }} key={index}>
                <CardMedia
                  sx={{ height: 100, margin: 1 }}
                  image={hotel.images[0].thumbnail}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {hotel.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ borderBottom: 0.5, borderRight: 1, borderRadius: 1 }}
                    onClick={() => {
                      handleHotelsClick(hotel);
                      setOpen(true);
                    }}
                  >
                    See more
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </>
      )}
      {selectedHotel && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ display: "flex", wrap: "wrap" }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedHotel.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Description: {selectedHotel.description}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Check in time: {selectedHotel.check_in_time}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Before taxes fees: {selectedHotel.before_taxes_fees}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Hotel class: {selectedHotel.hotel_class}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Rating: {selectedHotel.overall_rating}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Rating: {selectedHotel.overall_rating}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Link: {selectedHotel.link}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Amenities
              <List dense>
                {selectedHotel.amenities.map((amenitie, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={<Typography id="modal-modal-description" sx={{ mt: 2 }}>{amenitie}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            </Typography>

            <GoogleMaps lat= {selectedHotel.gps_coordinates.latitude} lng={selectedHotel.gps_coordinates.longitude} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Hotels;
