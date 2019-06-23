import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutStore} from "../../Utils/storeAuthActions";
import {IconButton, Menu, MenuItem} from "react-mdl"

class LogStoreOut extends Component {
  lonLogoutClick = e => {
    e.preventDefault();
    // localStorage.removeItem("store_jwtToken")
    this.props.logoutStore();
  };
render() {
    const { store } = this.props.storeOwner;
return (
      <div style={{position: 'relative'}}>
          <IconButton name="more_vert" id="demo-menu-lower-right" />
          <Menu target="demo-menu-lower-right" align="right">
              <MenuItem>My profile</MenuItem>
              <MenuItem>Edit profile</MenuItem>
              {store.company ? <MenuItem onClick={this.lonLogoutClick}>Logout</MenuItem> : <MenuItem><a href="/login" style={{color:"#000"}}>login</a></MenuItem>}
          </Menu>
      </div>
    );
  }
}
LogStoreOut.propTypes = {
  logoutStore: PropTypes.func.isRequired,
  storeOwner: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  storeOwner: state.storeOwner
});
export default connect(
  mapStateToProps,
  { logoutStore }
)(LogStoreOut);
