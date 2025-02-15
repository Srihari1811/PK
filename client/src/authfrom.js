import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phoneNumber: '',
    password: ''
  });
  const [message, setMessage] = useState(''); // For popup message
  const [showPopup, setShowPopup] = useState(false); // To control popup visibility
  const [isValid, setIsValid] = useState(true); // Validation state

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber' && value.length > 10) {
      return; // Prevent typing more than 10 digits in phone number
    }
    setFormData({ ...formData, [name]: value });
    validateForm();
  };

  const validateForm = () => {
    const { name, username, phoneNumber, password } = formData;
    // Check if all fields are filled and phone number is exactly 10 digits
    if (!isLogin) {
      setIsValid(
        name.trim() !== '' &&
        username.trim() !== '' &&
        phoneNumber.length === 10 &&
        password.trim() !== ''
      );
    } else {
      setIsValid(username.trim() !== '' && password.trim() !== '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login request
        const { data } = await axios.post('http://localhost:5000/login', {
          username: formData.username,
          password: formData.password
        });
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        // Register request
        await axios.post('http://localhost:5000/register', formData);
        // Clear form after successful registration
        setFormData({
          name: '',
          username: '',
          phoneNumber: '',
          password: ''
        });
        // Show success message in popup
        setMessage('Registered successfully!');
        setShowPopup(true);
      }
    } catch (error) {
      setMessage(`Error ${isLogin ? 'logging in' : 'registering user'}`);
      setShowPopup(true);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmEqNiU_kFy9T2-EODP7j_oxTVWORbVYS0LQ&s')` }}>
      <div className="auth-form p-4 rounded shadow" style={{ width: '400px', backgroundColor: '#fff', transition: 'transform 0.3s ease-in-out', animation: 'fadeIn 1s' }}>
        
        {/* Login/Register Text at the Top */}
        <div className="d-flex justify-content-between mb-3">
          <span 
            className={`text ${isLogin ? 'text-primary' : 'text-muted'} fw-bold`} 
            style={{ cursor: 'pointer' }} 
            onClick={() => { setIsLogin(true); setIsValid(true); }}
          >
            Login
          </span>
          <span 
            className={`text ${!isLogin ? 'text-primary' : 'text-muted'} fw-bold`} 
            style={{ cursor: 'pointer' }} 
            onClick={() => { setIsLogin(false); validateForm(); }}
          >
            Register
          </span>
        </div>
        
        <h2 className="text-center mb-4" style={{ color: '#6e8efb', fontWeight: 'bold' }}>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group mb-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                  style={{ transition: 'all 0.3s ease', borderColor: '#a777e3' }}
                />
              </div>
              <div className="form-group mb-3">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  maxLength="10" // Maximum length 10 digits
                  required
                  style={{ transition: 'all 0.3s ease', borderColor: '#a777e3' }}
                />
              </div>
            </>
          )}
          <div className="form-group mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={handleChange}
              value={formData.username}
              required
              style={{ transition: 'all 0.3s ease', borderColor: '#6e8efb' }}
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              style={{ transition: 'all 0.3s ease', borderColor: '#6e8efb' }}
            />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={!isValid} style={{ background: 'linear-gradient(135deg, #6e8efb, #a777e3)', border: 'none', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {/* Popup message */}
        {showPopup && (
  <div 
    className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mt-3`} 
    role="alert" 
    style={{ animation: 'popup 0.5s ease' }}
  >
    {message}
  </div>
)}

      </div>
    </div>
  );
};

export default AuthForm;
