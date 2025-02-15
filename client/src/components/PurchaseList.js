import React, { useEffect, useState } from 'react';
import './PurchaseList.css';
import axios from 'axios';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Fetch purchases from the API
    const fetchPurchases = async () => {
      try {
        const response = await axios.get('https://pk-api-psi.vercel.app/purchases'); // Make sure the endpoint matches your backend
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching purchase data:', error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div className="purchase-list">
      <h2>Purchase List</h2>
      <table className="purchase-table">
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Reference No</th>
            <th>Purchase Date</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Purchase Price (₹)</th>
            <th>Discount (₹)</th>
            <th>Tax Amount (₹)</th>
            <th>Unit Cost (₹)</th>
            <th>Total Amount (₹)</th>
            <th>Other Charges (₹)</th>
            <th>Discount on All (₹)</th>
            <th>Round Off (₹)</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {purchases.length > 0 ? (
            purchases.map((purchase) => (
              <tr key={purchase._id}>
                <td>{purchase.supplierName}</td>
                <td>{purchase.referenceNo}</td>
                <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                <td>{purchase.itemName}</td>
                <td>{purchase.quantity}</td>
                <td>{purchase.purchasePrice}</td>
                <td>{purchase.discount}</td>
                <td>{purchase.taxAmount}</td>
                <td>{purchase.unitCost}</td>
                <td>{purchase.totalAmount}</td>
                <td>{purchase.otherCharges}</td>
                <td>{purchase.discountOnAll}</td>
                <td>{purchase.roundOff}</td>
                <td>{purchase.note}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14">No purchases found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseList;
