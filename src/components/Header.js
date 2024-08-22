import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Drawer } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import SearchBar from './SearchBar';
import AccountManu from './AccountManu';

const Header = ({ handleSearch }) => {
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <header className="bg-[#1a1a1a] text-white py-3 px-4 flex justify-between items-center">
      <Link to="/" className="text-xl text-red-600 font-bold">
        NetStar
      </Link>

      {/* Hidden on small screens */}
      <div className="hidden sm:flex items-center gap-2">
        <SearchBar 
          onSearch={handleSearch} 
          className="w-32 sm:w-48 lg:w-64 h-8 text-xs sm:text-sm"
        />
        <Link to="/categories" className="text-xs sm:text-sm hover:underline">
          Categories
        </Link>
        {authToken ? (
          <Dropdown 
            overlay={<AccountManu handleLogout={handleLogout} />} 
            trigger={['hover']} 
            placement="bottomRight"
          >
            <a className="hover:underline flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <UserOutlined /> Account
            </a>
          </Dropdown>
        ) : null}
      </div>

      {/* Hamburger menu for small screens */}
      <div className="sm:hidden flex items-center">
        <MenuOutlined 
          className="text-xl cursor-pointer" 
          onClick={toggleDrawer} 
        />
      </div>

      {/* Drawer for mobile navigation */}
      <Drawer
        title=""
        placement="right"
        closable={true}
        onClose={toggleDrawer}
        open={drawerVisible}
      >
        <SearchBar 
          onSearch={handleSearch} 
          className="w-full h-8 text-sm mb-4"
        />
        <Link to="/categories" className="block text-base mb-4" onClick={toggleDrawer}>
          Categories
        </Link>
        {authToken ? (
          <div onClick={toggleDrawer}>
            <AccountManu handleLogout={handleLogout} />
          </div>
        ) : (
          <Link to="/login" className="block text-base" onClick={toggleDrawer}>
            Login
          </Link>
        )}
      </Drawer>
    </header>
  );
};

export default Header;
