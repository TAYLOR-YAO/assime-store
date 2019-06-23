import React from "react";
import "./SideDrawer.css";
import SideDrawerLogStoreOut from "../LogStorerOut/SideDrawerLogStoreOut";


const SideDrawer = props =>{
    let drawerClass ="side-drawer";
    if(props.show){
        drawerClass = "side-drawer open";
    }
    return(
    <nav className={drawerClass} >
        <div><h2>Assime-228</h2></div>
        <hr/>
        <ul>
            <li><a href="/dashboard">Home</a></li>
            <li><a href="/cart">My Cart</a></li>
            <li><SideDrawerLogStoreOut/></li>                     
        </ul>
    </nav>
    );
};
export default SideDrawer