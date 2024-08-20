import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SearchBar from './SearchBar';
import AccountManu from './AccountManu'; // Import the correct component

const Header = ({ handleSearch }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <header className="bg-[#1a1a1a] text-white py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl text-red-600 font-bold">
        NetStar
      </Link>
      
      <div className="flex items-center gap-4">
        <SearchBar 
          onSearch={handleSearch} 
          className="w-64 lg:w-96 h-8 text-sm"
        />
        <Link to="/categories" className="hover:underline">
          Categories
        </Link>
        {authToken ? (
          <Dropdown 
            overlay={<AccountManu handleLogout={handleLogout} />} 
            trigger={['hover']} 
            placement="bottomRight"
          >
            <a className="hover:underline flex items-center gap-2">
              <UserOutlined /> Account
            </a>
          </Dropdown>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
