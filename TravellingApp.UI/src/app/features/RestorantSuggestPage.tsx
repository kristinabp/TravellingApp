import React, { useEffect, useState } from "react";
import GoogleMaps from "./GoogleMaps.tsx";
import "./styles/RestorantSuggestPage.css";

const RestorantSuggest = () => {

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    //fetchData();
    fetchDataYelp();
  }, []);

  const handleData = ({ city }) => {
    console.log("Received data from Home component:");
    console.log("City:", city);
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3050/restorantsSug/sofia');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const jsonData = await response.json();
  //     console.log(jsonData.data);
  //     setData(jsonData.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchDataYelp = async () => {
    try {
      const response = await fetch('http://localhost:3050/restaurants');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
        const jsonData = await response.json();
        //console.log(jsonData);
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
    // Check if restaurant.name and restaurant.city are defined before accessing their properties
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
          {filteredData.map((restaurant, index) => (
            <div className="restaurant-item" onClick={() => handleRestaurantClick(restaurant)} key={index}>
              <h2>Name: {restaurant.name}</h2>
              <p>City: {restaurant.location.city}</p>
              <p>Phone: {restaurant.phone}</p>
              <img id="restorantImg" src={restaurant.image_url} />
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
            <p>Location: {selectedRestaurant.location.city}</p>
            <GoogleMaps lat= {selectedRestaurant.coordinates.latitude} lng={selectedRestaurant.coordinates.longitude} />
          </div>
        </div>
      )}
    </div>
  </>;
};

export default RestorantSuggest;
