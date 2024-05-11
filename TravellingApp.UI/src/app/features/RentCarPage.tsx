import React, { useEffect, useState } from "react";
import "./styles/RentCarPage.css";

const RentCar = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
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
        <input
          type="text"
          placeholder="Search by car name or city"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <ul>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="car-list">
              {data.map((car, index) => (
                <div className="car-item" onClick={() => handleCarClick(car)} key={index}>
                  <h2>Car: {car.brand} {car.model}</h2>
                  <p>City: {car.location}</p>
                  <p>Price per day: {car.price_per_day}</p>
                </div>
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
                Rent:
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
