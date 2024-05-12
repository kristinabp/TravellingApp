import React, { useEffect, useState } from "react";
import "./styles/RentCarPage.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Modal,
  Typography,
} from "@mui/material";

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
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const RentCar = ({ maxOut }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [rentChecked, setRentChecked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3060/rentCar");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCarClick = (car: any) => {
    setSelectedCar(car);
  };

  const handleRentCheckboxChange = () => {
    setRentChecked(!rentChecked);
  };

  const handleRentSubmit = async () => {
    if (selectedCar) {
      try {
        const response = await fetch("http://localhost:3060/rentNewCar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            carId: selectedCar.id,
            rentalStatus: rentChecked,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to rent the car");
        }
      } catch (error) {
        console.error("Error renting the car:", error);
      }
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const closeModal = () => {
    setSelectedCar(null);
  };

  /*(
    <>
      <div>
        <ul>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="car-list">
              {data.slice(0, maxOut).map((car, index) => (
                <Box
                  height={200}
                  width={200}
                  my={4}
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                  sx={{ border: "2px solid grey", padding: "20px" }}
                >
                  <div onClick={() => handleCarClick(car)} key={index}>
                    <h3>
                      {car.brand} {car.model}
                    </h3>
                    <p>City: {car.location}</p>
                    <img
                      src={car.image}
                      style={{ width: "130px", height: "120px" }}
                    />
                  </div>
                </Box>
              ))}
            </div>
          )}
        </ul>

        {selectedCar && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content">
              <span className="close">&times;</span>
              <h2>
                {selectedCar.brand} {selectedCar.model}
              </h2>
              <p>City: {selectedCar.location}</p>
              <p>Price per day: {selectedCar.price_per_day}</p>
              <label>
                <input
                  type="checkbox"
                  checked={rentChecked}
                  onChange={handleRentCheckboxChange}
                />
              </label>
              <button onClick={handleRentSubmit}>Rent Car</button>
            </div>
          </div>
        )}
      </div>
    </>
  );*/
  return (
    <>
      {loading ? (
        <Typography gutterBottom variant="h5" component="div">
          Loading...
        </Typography>
      ) : (
        <>
          <Typography gutterBottom variant="h5" component="div">
            Car suggestions
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {data.slice(0, maxOut).map((car, index) => (
              <Card sx={{ margin: 1 }}>
                <CardMedia
                  sx={{ height: 100, margin: 1 }}
                  image={car.image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {car.brand} {car.model}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ borderBottom: 0.5, borderRight: 1, borderRadius: 1 }}
                    onClick={() => {
                      handleCarClick(car);
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
      {selectedCar && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ display: "flex", wrap: "wrap" }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedCar.brand} {selectedCar.model}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              City: {selectedCar.location}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Price per day: {selectedCar.price_per_day}
            </Typography>
            <Typography>
              Rent a car:
              <Checkbox
                {...label}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                onClick={handleRentCheckboxChange}
              />
            </Typography>

            <Button onClick={handleRentSubmit}>Rent a car</Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default RentCar;
