import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const Monuments = ({maxOut}) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonument, setSelectedMonument] = useState<any | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const response = await fetch('http://localhost:8008/monuments');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        console.log(jsonData.items);
        setData(jsonData.items);
        // dataProvider - name
        // dcDescription - description
        // edmPreview - image
        } catch (error) {
        console.error('Error fetching data:', error);
        } finally {
        setLoading(false);
        }
    };

    const handleMonumentClick = (monument: any) => {
        setSelectedMonument(monument);
    };

    const closeModal = () => {
        setSelectedMonument(null);
      };

  return <>
    <div>
      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="restaurant-list">
          {data.slice(0, maxOut).map((monument, index) => (
          <Box
            height={200}
            width={250}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: '2px solid grey', padding: '20px' }}
          >
            <div onClick={() => handleMonumentClick(monument)} key={index}>
              <h2>{monument?.dataProvider?.slice(0, 2)}</h2>
              <img src={monument.edmPreview} style={{ width: '130px', height: '120px' }} />
            </div>
          </Box>
          ))}
        </div>
        )}
      </ul>
      {selectedMonument && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <span className="close">&times;</span>
            <h2>{selectedMonument.dataProvider}</h2>
            <img id="monumentImg" src={selectedMonument.edmPreview} />
            <p>Description: {selectedMonument.dcDescription}</p>
          </div>
        </div>
      )}
    </div>
  </>;
};

export default Monuments;
