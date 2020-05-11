import React from "react";
import { Menu as MenuList, MenuItem } from "./Styles/Menu";

const Menu = () => {
	return (
        <MenuList>
            <MenuItem to="/create">Create chat</MenuItem>
            <MenuItem to="/chats">Chats</MenuItem>
        </MenuList>
	);
}

export default Menu;