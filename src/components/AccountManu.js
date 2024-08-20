import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const AccountManu = ({ handleLogout }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/updatepassword">Change Password</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <a onClick={handleLogout} >Logout</a>
      </Menu.Item>
    </Menu>
  );

  return menu;
};

export default AccountManu;
