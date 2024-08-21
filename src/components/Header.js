import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import SearchBar from './SearchBar';
import AccountManu from './AccountManu';

const Header = ({ handleSearch }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <header className="bg-[#1a1a1a] text-white py-3 px-4 sm:px-6 flex justify-between items-center">
      <Link to="/" className="text-xl sm:text-2xl text-red-600 font-bold">
        NetStar
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        <SearchBar 
          onSearch={handleSearch} 
          className="w-48 sm:w-64 lg:w-96 h-8 text-xs sm:text-sm"
        />
        <Link to="/categories" className="text-sm sm:text-base hover:underline">
          Categories
        </Link>
        {authToken ? (
          <Dropdown 
            overlay={<AccountManu handleLogout={handleLogout} />} 
            trigger={['hover']} 
            placement="bottomRight"
          >
            <a className="hover:underline flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
              <UserOutlined /> Account
            </a>
          </Dropdown>
        ) : (
          <MenuOutlined className="text-xl sm:hidden" />
        )}
      </div>
    </header>
  );
};

export default Header;
