import React, { useEffect, useState } from 'react';
import './ItemList.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch items from the backend
    fetch('http://localhost:5000/items')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage('Error: ' + error.message);
      });
  }, []);

  return (
    <div className="item-list">
      <h2>Item List</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <table className="item-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>GST (%)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.gst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ItemList;
