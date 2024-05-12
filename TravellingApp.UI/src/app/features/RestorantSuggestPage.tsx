import React, { useEffect, useState } from "react";
import GoogleMaps from "./GoogleMaps.tsx";
import "./styles/RestorantSuggestPage.css";
import { Box } from "@mui/material";

const RestorantSuggest = ({maxOut}) => {

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchDataYelp();
  }, []);


  const fetchDataYelp = async () => {
    try {
      const response = await fetch('http://localhost:3050/restaurants');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
        const jsonData = await response.json();
        setCoordinates(jsonData.coordinates);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
  };

  const handleRestaurantClick = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
  };

  const filteredData = data.filter((restaurant) => {
    const nameMatches = restaurant.name && restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const cityMatches = restaurant.city && restaurant.city.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatches || cityMatches;
  });
  
  const closeModal = () => {
    setSelectedRestaurant(null);
  };

  return <>
    <div>
      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="restaurant-list">
          {filteredData.slice(0, maxOut).map((restaurant, index) => (
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
            <div onClick={() => handleRestaurantClick(restaurant)}>
              <h3>{restaurant.name}</h3>
              <img src={restaurant.image_url} style={{ width: '150px', height: '140px' }} />
            </div>
          </Box>
          ))}
        </div>
        )}
      </ul>

      {selectedRestaurant && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close">dancho</span>
            <h2>{selectedRestaurant.name}</h2>
            <p>Location: {selectedRestaurant.location.city}</p>
            <p>Phone: {selectedRestaurant.phone}</p>
            <GoogleMaps lat= {selectedRestaurant.coordinates.latitude} lng={selectedRestaurant.coordinates.longitude} />
          </div>
        </div>
      )}
    </div>
  </>;
};

export default RestorantSuggest;
