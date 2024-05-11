import React, { useEffect, useState } from "react";

const Monuments = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
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

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value); // Update search query state
    };

    const filteredData = data.filter((monument) => {
        // Check if restaurant.name and restaurant.city are defined before accessing their properties
        const nameMatches = monument.dataProvider && monument.dataProvider[0].toLowerCase().includes(searchQuery.toLowerCase());
        return nameMatches;
    });

    const closeModal = () => {
        setSelectedMonument(null);
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
          {filteredData.map((monument, index) => (
            <div className="restaurant-item" onClick={() => handleMonumentClick(monument)} key={index}>
              <h2>{monument.dataProvider}</h2>
              <img id="monumentImg" src={monument.edmPreview} />
            </div>
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
