import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the auth context
import './Login.scss';
import '../../App.scss';
import sideimage from '../../assets/Login/sideimage.png';
import logo from '../../assets/Login/logo.png';
import { FaUserShield } from "react-icons/fa6";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const result = await login(username, password);
      
      if (result.success) {
        navigate('/captured-image');
      } else {
        setError(result.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Login error:', err);
    }
  };

  return (
    <div className='loginPage flex'>
      <div className='container flex'>
        <div className='sideImage'>
          <img src={sideimage} alt="Side" />
          <div className="textDiv">
            <h2 className='titleStyle'>Growing Solutions, One Crop at a Time</h2>
            <p className='paraStyle'>Kaakibat ng mga Magsasaka!</p>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="AniMonitor Logo"/>
            <h3>Maligayang Pagbabalik!</h3>
            <p>Secure access starts here. Please log in using your credentials.</p>
          </div>

          <form className="form grid" onSubmit={handleLogin}>
            <div className='inputDiv'>
              <label htmlFor="username"></label>
              <div className='input flex'>
                <FaUserShield className='icon'/>
                <input 
                  type='text' 
                  id='username' 
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor="password"></label>
              <div className='input flex'>
                <BsFillShieldLockFill className='icon'/>
                <input 
                  type='password' 
                  id='password' 
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <button type='submit' className='btn flex'>
              <span>Login</span>
              <AiOutlineSwapRight className='icon'/>
            </button>

            <span className='forgotPassword'>
              <a href='/forgot-password'>Forgot password?</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;