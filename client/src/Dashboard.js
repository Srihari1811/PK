import React, { useState, useEffect } from 'react';
import { FaPlus, FaShoppingCart, FaReceipt, FaUsers, FaAngleDown, FaAngleRight } from 'react-icons/fa';
import './Dashboard.css';
import AddItem from './components/Additem';
import ItemList from './components/itemlist';
import NewPurchase from './components/NewPurchase';
import PurchaseList from './components/PurchaseList';
import AddSales from './components/AddSales'
import SalesList from './components/Saleslist';


const Dashboard = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [users, setUsers] = useState([]); // State to store fetched users
  const [loading, setLoading] = useState(false);
  const [selectedView, setSelectedView] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Show the correct component based on submenu click and collapse the dropdown
  const handleSubMenuClick = (view) => {
    setSelectedView(view);
    setOpenMenu(null); // Collapse the menu after selecting a submenu item
  };

  // Fetch users when 'users' menu is opened
  useEffect(() => {
    if (selectedView === 'users') {
      setLoading(true);
      fetch('http://localhost:5000/users') // Make sure this matches your backend route
        .then((response) => response.json())
        .then((data) => {
          setUsers(data); // Set fetched users to state
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
          setLoading(false);
        });
    }
  }, [selectedView]);

  return (
    <div className="d-flex">
      <div className="sidebar">
        <ul>
          {/* Add Items Section */}
          <li onClick={() => toggleMenu('addItems')}>
            <FaPlus /> Items {openMenu === 'addItems' ? <FaAngleDown /> : <FaAngleRight />}
            {openMenu === 'addItems' && (
              <ul className="dropdown">
                <li onClick={() => handleSubMenuClick('addItem')}>Add New Item</li>
                <li onClick={() => handleSubMenuClick('itemList')}>Items List</li>
              </ul>
            )}
          </li>

          {/* Purchase Section */}
          <li onClick={() => toggleMenu('purchase')}>
            <FaShoppingCart /> Purchase {openMenu === 'purchase' ? <FaAngleDown /> : <FaAngleRight />}
            {openMenu === 'purchase' && (
              <ul className="dropdown">
                <li onClick={() => handleSubMenuClick('addPurchase')}>Add Purchase</li>
                <li onClick={() => handleSubMenuClick('purchaseList')}>Purchase List</li>
              </ul>
            )}
          </li>

          {/* Sales Section */}
          <li onClick={() => toggleMenu('sales')}>
            <FaReceipt /> Sales {openMenu === 'sales' ? <FaAngleDown /> : <FaAngleRight />}
            {openMenu === 'sales' && (
              <ul className="dropdown">
                <li onClick={() => handleSubMenuClick('addSale')}>Add New Sale</li>
                <li onClick={() => handleSubMenuClick('salesList')}>Sales List</li>
              </ul>
            )}
          </li>

          {/* Users Section */}
          <li onClick={() => handleSubMenuClick('users')}>
            <FaUsers /> Users {selectedView === 'users' ? <FaAngleDown /> : <FaAngleRight />}
          </li>
        </ul>
      </div>

      <div className="form-container">
        {/* Default message */}
        {!selectedView && (
          <div>
            <h2>Welcome to the Dashboard</h2>
            <p>Select an option from the sidebar to get started.</p>
          </div>
        )}

        {/* Conditionally render based on selectedView */}
        {selectedView === 'addItem' && <AddItem />}
        {selectedView === 'itemList' && <ItemList />}

        {selectedView === 'addPurchase' && (
          <div>
            <h2>Add New Purchase</h2>
            {selectedView === 'addPurchase' && <NewPurchase />}
            
          </div>
        )}
        {selectedView === 'purchaseList' && (
          <div>
            <h2>Purchase List</h2>
            {selectedView === 'purchaseList' && <PurchaseList /> }
          </div>
        )}

        {selectedView === 'addSale' && (
          <div>
            <h2>Add New Sale</h2>
            {selectedView === 'addSale' && <AddSales /> }
          </div>
        )}
        {selectedView === 'salesList' && (
          <div>
            <h2>Sales List</h2>
            {selectedView === 'salesList' && <SalesList /> }
          </div>
        )}

        {selectedView === 'users' && (
          <div>
            <h2>Registered Users</h2>
            {loading ? (
              <p>Loading users...</p> // Show loading message while users are being fetched
            ) : (
              <ul>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <li key={index} className="user-item">
                      <p><strong>Name:</strong> {user.name}</p>
                      <p><strong>User Name:</strong> {user.username}</p> {/* Displaying username as Email */}
                      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                      <p><strong>Password (Hashed):</strong> {user.password}</p>
                      <hr /> {/* Line separator between each user */}
                    </li>
                  ))
                ) : (
                  <p>No users found.</p>
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
