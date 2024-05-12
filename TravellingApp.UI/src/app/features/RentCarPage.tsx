import React, { useEffect, useState } from "react";
import "./styles/RentCarPage.css";
import { Box } from "@mui/material";

const RentCar = ({maxOut}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [rentChecked, setRentChecked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3060/rentCar');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
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
        const response = await fetch('http://localhost:3060/rentNewCar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            carId: selectedCar.id, 
            rentalStatus: rentChecked,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to rent the car');
        }
      } catch (error) {
        console.error('Error renting the car:', error);
      }
    }
  };

  const closeModal = () => {
    setSelectedCar(null);
  };

  return (
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
                sx={{ border: '2px solid grey', padding: '20px' }}
              >
                <div onClick={() => handleCarClick(car)} key={index}>
                  <h3>{car.brand} {car.model}</h3>
                  <p>City: {car.location}</p>
                  <img src={car.image} style={{ width: '130px', height: '120px' }} />
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
              <h2>{selectedCar.brand} {selectedCar.model}</h2>
              <p>City: {selectedCar.location}</p>
              <p>Price per day: {selectedCar.price_per_day}</p>
              <label>
                <input type="checkbox" checked={rentChecked} onChange={handleRentCheckboxChange} />
              </label>
              <button onClick={handleRentSubmit}>Rent Car</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RentCar;
