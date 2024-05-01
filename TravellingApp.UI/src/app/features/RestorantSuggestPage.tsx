import React, { useEffect, useState } from "react";
import "./styles/RestorantSuggestPage.css";

const RestorantSuggest = () => {

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null); // State to track the selected restaurant
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3050/restorantsSug/sofia');
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

  const handleRestaurantClick = (restaurant: any) => {
    setSelectedRestaurant(restaurant); // Set the selected restaurant
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); // Update search query state
  };

  const filteredData = data.filter((restaurant) => {
    // Check if restaurant.name and restaurant.city are defined before accessing their properties
    const nameMatches = restaurant.name && restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const cityMatches = restaurant.city && restaurant.city.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatches || cityMatches;
  });
  

  const closeModal = () => {
    setSelectedRestaurant(null); // Close the modal by resetting the selected restaurant
  };

  return <>
    <div>
      <input
        type="text"
        placeholder="Search by restaurant name or city"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="restaurant-list">
          {filteredData.map((restaurant, index) => (
            <div className="restaurant-item" onClick={() => handleRestaurantClick(restaurant)} key={index}>
              <h2>Name: {restaurant.restaurantName}</h2>
              <p>City: {restaurant.city}</p>
              <p>Location: {restaurant.location}</p>
            </div>
          ))}
        </div>
        )}
      </ul>

      {selectedRestaurant && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close">&times;</span>
            <h2>{selectedRestaurant.name}</h2>
            <p>City: {selectedRestaurant.city}</p>
            <p>Location: {selectedRestaurant.location}</p>
          </div>
        </div>
      )}
    </div>
  </>;
};

export default RestorantSuggest;
