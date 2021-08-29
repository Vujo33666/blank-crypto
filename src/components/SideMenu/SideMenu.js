import React from "react";
import { slide as Menu } from 'react-burger-menu'

const SideMenu = (props) => {

        /*needs improvement*/
    return (
        <div>
            <Menu>
                <a id="dashboard" className="menu-item" href="/dashboard">Dashboard</a>
                <a id="explore" className="menu-item" href="/explore">Explore</a>
                <a id="create-token" className="menu-item" href="/create-token">Create Token</a>
            </Menu>
        </div>
    )
}

export default SideMenu;