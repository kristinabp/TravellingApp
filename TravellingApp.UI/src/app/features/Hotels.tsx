import React, { useEffect, useState } from "react";
import GoogleMaps from "./GoogleMaps.tsx";
import './styles/Hotels.css';
const Hotels = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedHotel, setSelectedHotel] = useState<any | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const response = await fetch('http://localhost:8000/hotels');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        console.log(jsonData.properties);
        setData(jsonData.properties);
        } catch (error) {
        console.error('Error fetching data:', error);
        } finally {
        setLoading(false);
        }
    };

    const handleHotelsClick = (hotel: any) => {
        setSelectedHotel(hotel);
    };

    const closeModal = () => {
        setSelectedHotel(null);
      };

  return <>
    <div>
      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="hotel-list">
          {data.map((hotel, index) => (
            <div className="hotel-item" onClick={() => handleHotelsClick(hotel)} key={index}>
              <h2>{hotel.name}</h2>
              <img id="hotelImg" src={hotel.images[0].thumbnail} />
            </div>
          ))}
        </div>
        )}
      </ul>
      {selectedHotel && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close">&times;</span>
            <h2>{selectedHotel.name}</h2>
            <img id="hotelImg" src={selectedHotel.images[0].thumbnail} />
            <p>Description: {selectedHotel.description}</p>
            <p>Check in time: {selectedHotel.check_in_time}</p>
            <p>Before taxes fees: {selectedHotel.before_taxes_fees}</p>
            <p>Hotel class: {selectedHotel.hotel_class}</p>
            <p>Rating: {selectedHotel.overall_rating}</p>
            <p>Check in time: {selectedHotel.check_in_time}</p>

            <ul>
              <p>Amenities</p>
              {selectedHotel.amenities.map((amenitie, index) => (
                <li>{amenitie}</li>
              ))}
            </ul>

            <ul>
              <p>Excluded Amenities</p>
              {selectedHotel.amenities.map((noamenitie, index) => (
                <li>{noamenitie}</li>
              ))}
            </ul>

            <GoogleMaps lat= {selectedHotel.gps_coordinates.latitude} lng={selectedHotel.gps_coordinates.longitude} />

          </div>
        </div>
      )}
    </div>
  </>;
};

export default Hotels;
