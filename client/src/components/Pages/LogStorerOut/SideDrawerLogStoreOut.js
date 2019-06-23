import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutStore} from "../../Utils/storeAuthActions";
import {IconButton, Menu, MenuItem} from "react-mdl"
class SideDrawerLogStoreOut extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutStore();
  };
render() {
    const { store } = this.props.storeOwner;
return (
        <div style={{position: 'absolute', color:"#fff" }}>
            <IconButton name="more_vert" id="demo-menu-lower-left" />
            <Menu target="demo-menu-lower-left" valign="bottom" ripple>
                <MenuItem>Some Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                {store.company ? <MenuItem onClick={this.onLogoutClick}>Logout</MenuItem> : <MenuItem><a href="/login" style={{color:"#000"}}>login</a></MenuItem>}
            </Menu>
        </div>


    );
  }
}
SideDrawerLogStoreOut.propTypes = {
  logoutStore: PropTypes.func.isRequired,
  storeOwner: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  storeOwner: state.storeOwner
});
export default connect(
  mapStateToProps,
  { logoutStore }
)(SideDrawerLogStoreOut);
