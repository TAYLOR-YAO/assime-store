import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Tab, Tabs} from "react-bootstrap";
import "./Office.css";
import AdminHome from "../OfficeHome";
import Inventory from "../Inventory";
import DeliveredItem from "../DeliveredItem";
import Sales from "../Sales";
import Receiving from "../Receiving";
import LayoutView from "../LayoutView";

class Office extends Component{

    render(){
        return(
            <div className="office">
               <Tabs justified defaultActiveKey={1} animation={false} id="noanim-tab-example">
                    <Tab eventKey={1} title="Dashboard" >
                        <AdminHome/>
                    </Tab>
                    <Tab eventKey={2} title="Orders" >
                        <Sales/>
                    </Tab>
                    <Tab eventKey={3} title="Delivered" >
                        <DeliveredItem/>
                    </Tab>
                    <Tab eventKey={4} title="Inventory" >
                        <Inventory/>
                    </Tab>
                    <Tab eventKey={5} title="Receiving" >
                        <Receiving/>
                    </Tab>
                    <Tab eventKey={6} title="Layout view" >
                        <LayoutView/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

Office.propTypes = {
    // logoutUser: PropTypes.func.isRequired,
    storeOwner: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    storeOwner: state.storeOwner
  });
  
  export default connect(
    mapStateToProps,
  )(Office);