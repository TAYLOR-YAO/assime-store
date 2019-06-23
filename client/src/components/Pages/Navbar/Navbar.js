import React, { Component } from "react";
import "./Navbar.css";
import ToggleDrawer from "./ToggleDrawer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutStore } from "../../Utils/storeAuthActions";
import LogStoreOut from "../LogStorerOut/LogStoreOut";

class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutStore();
  };

  render() {
      const { store } = this.props.storeOwner;
    return (
      // <header className="toolBar" >
        <nav className="toolBar-navigation" style={{background:`${store.storeColor}`}}> 
          <div className="toolBar-logo"><a href="/">Assime-228 || Store</a></div>
          <div className="spacer"></div>
          <div className="toolBar-links" style={{color:`${store.textColor}`}}>
            <ul>
              <li><a href="/">{ store.company ? `Monitored By ${store.company}` : " "}</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/">Management</a></li>
             <LogStoreOut/>
            </ul>
          </div> 
          <div className="toolBar-toggle-button">
            <ToggleDrawer click={this.props.drawerClickHandler}/>
          </div>
        </nav>
      // </header>
    )
  }
}

Navbar.propTypes = {
  logoutStore: PropTypes.func.isRequired,
  storeOwner: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  storeOwner: state.storeOwner
});

export default connect(
  mapStateToProps,
  { logoutStore}
)(Navbar);

