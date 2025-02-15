import React, { useState } from 'react';
import './AddItem.css';

const AddItem = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [gst, setGst] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input validation
    if (!itemName || !price || !gst) {
      setErrorMessage('All fields are required');
      setSuccessMessage('');
      return;
    }

    // Create the data object to send
    const newItem = {
      name: itemName,
      price: parseFloat(price),
      gst: parseFloat(gst),
    };

    // POST request to the backend to store the item
    fetch('https://pk-api-psi.vercel.app/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add item');
        }
        return response.json();
      })
      .then((data) => {
        setSuccessMessage('Item added successfully!');
        setErrorMessage('');
        // Clear input fields after successful submission
        setItemName('');
        setPrice('');
        setGst('');
      })
      .catch((error) => {
        setErrorMessage('Error: ' + error.message);
        setSuccessMessage('');
      });
  };

  return (
    <div className="add-item-form">
      <h2>Add New Item</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gst">GST (%):</label>
          <input
            type="number"
            id="gst"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            placeholder="Enter GST percentage"
          />
        </div>

        <button type="submit" className="submit-btn">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
