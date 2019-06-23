import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./StoreRegistration.css";
import Confirmation from "./Confirmation";    
import {Grid, Cell, Textfield,Button} from "react-mdl";
import {Tab, Tabs} from "react-bootstrap";
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'
import axios from "axios";

class StoreRegistration extends Component {
    state={
        showModal: false,
        displayTextColorPicker: false,
        displayStoreColorPicker: false,
        company: "",
        streetAddress: "",
        city: "",
        countryOrState: "",
        zip: "",
        email: "",
        tel: "",
        storeColor: "",
        textColor: "",
        storeID: "",
        tax: "",
        normalShipment: "",
        express: "",
        deleteStoreId: "",
        color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
        },
    }

    handleTextClick = () => {
        this.setState({ displayTextColorPicker: !this.state.displayTextColorPicker })
    };

    handleStoreClick = () => {
    this.setState({ displayStoreColorPicker: !this.state.displayStoreColorPicker })
    };
    
    handleTextColorClose = () => {
    this.setState({ displayTextColorPicker: false })
    };
    handleStoreColorClose = () => {
        this.setState({ displayStoreColorPicker: false })
    };

    handleClose = event => {
        this.setState({ showModal: false });
    }

    ClearStore = event =>{
        const {deleteStoreId} = this.state;
        const data = {
            id: deleteStoreId
        }
        axios.post("api/clearstore",data).then(result=>{
            console.log("Result: ",result)
        });
    }

    ClearAllInventory = event =>{
        axios.delete("api/clearallproducts").then(result=>{
        });
    }

    ClearStoreInventory = event =>{
        const {deleteStoreId} = this.state;
        const data = {
            id: deleteStoreId
        }
    axios.post("api/clearstoreproducts",data).then(result=>{
    });
}
    handleInputsChanges = event => {
        const { target: { name, value } } = event;
        this.setState({ [name]: value });
    }
    handleStoreColorChoice = (color) => {
        this.setState({ storeColor: color.hex });
        // console.log(this.state.storeColor)
    };
    handleTextColorChoice = (color) => {
            this.setState({ textColor: color.hex})
            // console.log(this.state.textColor)
    };
// ------------------------------------
    handleSignUpSubmit = event => {
        event.preventDefault();
        axios.post("api/registration",this.state).then(res=>{
            this.setState({
                company: res.data.company,
                city: res.data.city,
                countryOrState: res.data.country,
                email: res.data.email,
                tel: res.data.tel,
                zip: res.data.zip,
                tax: res.data.tax.$numberDecimal ,
                normalShipment: res.data.normalShipment,
                express: res.data.express,
                streetAddress: res.data.address,
                storeID: res.data._id,
                showModal: true
            })
        }); 
        console.log(this.state)
    }

    render () {
        
       const  {showModal, company, city, country, email, tel, address, storeID} = this.state;
       if(showModal){
           return   <Confirmation
                company = {company}
                location = {`${city}, ${country}`}
                email = {email}
                tel = {tel}
                address = {address}
                storeID = {storeID}
            />
       }


       const styles = reactCSS({
        'default': {
          color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
        },
      });

    return(
        <div style={{marginTop:"15px"}}>

            <Tabs justified defaultActiveKey={1} animation={false} id="noanim-tab-example">
                <Tab eventKey={1} title="Store Registration" >
                    
                <div className="marchandises-box" style={{width: '90%', margin: 'auto'}}>
                <Grid className="demo-grid-1">
                    <Cell col={9}>
                        <div style={{textAlign:"center"}}><h3>Store ragistration</h3></div>    
                        <hr style={{ height:"3px", background:"#000"}}/>                              
                        <Grid className="demo-grid-1">
                            <Cell col={4}>
                                <h6>Company name</h6>
                                <Textfield
                                label="Company & Store Name"
                                floatingLabel
                                style={{width: "100%"}}
                                name="company"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={4}>
                                <h6>Email</h6>
                                <Textfield
                                label="Email"
                                floatingLabel
                                style={{width: '100%'}}
                                name="email"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={4}>
                                <h6>Tel</h6>
                                <Textfield
                                label="Tel"
                                floatingLabel
                                style={{width: '100%'}}
                                name="tel"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>


                            
                        </Grid>
                        <Grid className="demo-grid-1">

                        <Cell col={3}>
                                <h6>Street Address</h6>
                                <Textfield
                                label="Street Address"
                                floatingLabel
                                style={{width: "100%"}}
                                name="streetAddress"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={3}>
                                <h6>City</h6>
                                <Textfield
                                label="city"
                                floatingLabel
                                style={{width: '100%'}}
                                name="city"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={3}>
                                <h6>State & Country</h6>
                                <Textfield
                                label="State & Country"
                                floatingLabel
                                style={{width: '100%'}}
                                name="countryOrState"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={3}>
                                <h6>Zip</h6>
                                <Textfield
                                label="Zip"
                                floatingLabel
                                style={{width: "100%"}}
                                name="zip"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                        </Grid>

                        <Grid className="demo-grid-1">

                            <Cell col={2}>
                                <h6>Tax Rate</h6>
                                <Textfield
                                label=" Tax Rate"
                                floatingLabel
                                style={{width: '100%'}}
                                name="tax"
                                onChange={this.handleInputsChanges}
                                />
                            </Cell>

                            <Cell col={3}>
                                <h6>Shipment & Handling Fees</h6>
                                <Textfield
                                    label="Shipment & Handling Fees"
                                    floatingLabel
                                    style={{width: '100%'}}
                                    name="normalShipment"
                                    onChange={this.handleInputsChanges}
                                />
                            </Cell>
                            <Cell col={3}>
                                <h6>Express & Handling Fees</h6>
                                <Textfield
                                    label="Express & Handling Fees"
                                    floatingLabel
                                    style={{width: '100%'}}
                                    name="express"
                                    onChange={this.handleInputsChanges}
                                />
                            </Cell>
                            <Cell col={2}>
                                <h6>Text Color</h6>

                                <div style={ styles.swatch } onClick={ this.handleTextClick }>
                                <div style={ styles.color } />
                                </div>
                                { this.state.displayTextColorPicker ? <div style={ styles.popover }>
                                <div style={ styles.cover } onClick={ this.handleTextColorClose }/>
                                <SketchPicker color={ this.state.textColor } onChange={ this.handleTextColorChoice} />
                                </div> : null }

                            </Cell>
                            <Cell col={2}>
                                <h6>Store Color</h6>

                                <div style={ styles.swatch } onClick={ this.handleStoreClick }>
                                <div style={ styles.color } />
                                </div>
                                { this.state.displayStoreColorPicker ? <div style={ styles.popover }>
                                <div style={ styles.cover } onClick={ this.handleStoreColorClose }/>
                                <SketchPicker color={ this.state.textColor } onChange={ this.handleStoreColorChoice} />
                                </div> : null }

                            </Cell>


                        </Grid>
                        <Button raised style={{background:"#6351ce", color:"#fff"}} onClick={this.handleSignUpSubmit}>Submit</Button>
                    </Cell> 
                    <Cell col={3}  style={{borderLeft:"5px double #333", padding:" 0px 20px"}}>
                        <Grid>
                            
                            <Cell col={12}>
                                <h6>Side View</h6>
                            </Cell>
                        </Grid>
                        
                    </Cell>             
                </Grid>
            </div>

                </Tab>
                <Tab eventKey={2} title="Updates" >
                <div style={{textAlign:"center"}}><h3>Updates</h3></div>                
                    <hr style={{ height:"3px", background:"#000"}}/>
                    <Grid>
                        <Cell col={12}>
                            <h6>Delete store products</h6>  
                            <hr/> 
                            <Textfield
                                label="Insert store ID"
                                floatingLabel
                                style={{width: "100%"}}
                                name="deleteStoreId"
                                onChange={this.handleInputsChanges}
                            />                  
                            <Button raised style={{background:"#6351ce", color:"#fff"}} onClick={this.ClearStoreInventory}>Delete products</Button>
                            <hr/>
                            <Button raised style={{background:"#6351ce", color:"#fff", marginLeft:"0px"}} onClick={this.ClearStore}>Delete Store ?</Button>
                            
                        </Cell>
                    </Grid>
                    <hr style={{ height:"3px", background:"#000"}}/>
                    <Grid>
                        <Cell col={12}>
                            <h6>Delete all products</h6>
                            <hr/>
                            <Button raised style={{background:"#6351ce", color:"#fff", margin:"10px 20px"}} onClick={this.ClearAllInventory}>Delete</Button>                    
                        </Cell>
                    </Grid>
                </Tab>
            </Tabs>
        </div>
        )
    }
}
StoreRegistration.propTypes = {
    // logoutUser: PropTypes.func.isRequired,
    storeOwner: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    storeOwner: state.storeOwner
  });
  
  export default connect(
    mapStateToProps,
  )(StoreRegistration);