import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import StoreIdentification from "./StoreIdentification";


class OfficeHome extends Component{
    state = {
        identified: false
    }
    render(){
        
        return(
            <div style={{marginBottom:"250px"}}>  
                <h1>Dashboard</h1>
            </div>
        )
    }
}

OfficeHome.propTypes = {
    storeOwner: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    storeOwner: state.storeOwner
  });
  
  export default connect(
    mapStateToProps,
  )(OfficeHome);