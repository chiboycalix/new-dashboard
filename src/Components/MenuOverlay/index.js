import React from 'react';
import { Menu } from "antd";

const MenuOverlay = (onClick) => {
  return (
      <Menu
        style={{ boxShadow: "0px 3px 6px #00000029", borderRadius: 5, width: 88 }}
      >
        <Menu.Item
          disabled={true}
          style={{ color: "#FFF", background: "#031A2F" }}
          key="1"
          onClick={onClick}
        >
          Sort by
        </Menu.Item>
        <Menu.Item style={{ padding: 10 }} key="earliest" onClick={onClick}>
          Earliest
        </Menu.Item>
        <Menu.Item style={{ padding: 10 }} key="oldest" onClick={onClick}>
          Oldest
        </Menu.Item>
      </Menu>
    )
}

export default MenuOverlay;