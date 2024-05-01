import React, { useEffect, useState } from "react";
import "./styles/RentCarPage.css";

const RentCar = () => {

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3060/rentCar/sofia');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      console.log(jsonData.data);
      setData(jsonData.data);
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

  const filteredData = data.filter((car) => {
    const nameMatches = car.brand && car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const cityMatches = car.location && car.location.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatches || cityMatches;
  });
  

  const closeModal = () => {
    setSelectedCar(null);
  };

  return <>
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
          {filteredData.map((car, index) => (
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
          </div>
        </div>
      )}
    </div>
  </>;
};

export default RentCar;
