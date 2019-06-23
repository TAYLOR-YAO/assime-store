import React, {Component} from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Grid, Cell} from "react-mdl";
import axios from "axios";
import "./Receiving.css";

import * as firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

 
const config = {
  apiKey: "AIzaSyCp5rZR4vsAHo0CFxFDp6ptzFYI0qSb2q4",
  authDomain: "assime-images.firebaseapp.com",
  databaseURL: "https://assime-images.firebaseio.com",
  projectId: "assime-images",
  storageBucket: "gs://assime-images.appspot.com",
  messagingSenderId: "828370923910",
  appId: "1:828370923910:web:bd6b26a91ead313f"
};
firebase.initializeApp(config);


class Receiving extends Component {
    
    state={
        username: "",
        avatar: "",
        isUploading: false,
        progress: 0,
        avatarURL: "",
        company:    "",
        storeId:    "",
        storeColor: "",
        textColor: "",
        name: "",
        image: null,
        price:  "",
        // size: "",
        both:   "",
        details:    "",
        category:   "",
        brand:  "",
        type:   "",
        color:  "",
        tax: 0.00,
        expressShipping: 0,
        shipping: 0,
        storeTell: "",
        storeEmail: "",
        size: [],
        gender: [],
        demography: []

    }
    componentDidMount = () =>{
        const { store } = this.props.storeOwner;

        this.setState({
            company:store.company,
            storeId: store.id,
            storeColor: store.storeColor,
            textColor: store.textColor,
            tax: store ? store.tax.$numberDecimal : 0,
            shipping: store.shipping,
            expressShipping: store.expressShipping,
            storeTell: store.tel,
            storeEmail: store.email,
            storeAddress : `${store.streetAddress}, ${store.city}, ${store.countryOrState} ${store.zip}`
        });
    }
    // --------------------------------SIZE FUNCTION----------------------------------------------

   
  
	handleSizeText = i => e => {
	  let size = [...this.state.size]
	  size[i] = e.target.value
	  this.setState({
		size
	  })
	}
  
	handleDeleteSise = i => e => {
	  e.preventDefault()
	  let size = [
		...this.state.size.slice(0, i),
		...this.state.size.slice(i + 1)
	  ]
	  this.setState({
		size
	  })
	}
  
	addSise = e => {
	  e.preventDefault()
	  let size = this.state.size.concat([''])
	  this.setState({
		size
	  })
	}
    //   -----------------------------GENDER FUNCTION-----------------------------------------------
    getGenderValue=(event)=>{
        event.preventDefault()
        this.setState({gender: [...this.state.gender, event.target.value]})

    }
    // --------------------------------DEMOGRAPHY FUNCTION----------------------------------------------
    getDemographyValue=(event)=>{
        event.preventDefault()
        this.setState({demography: [...this.state.demography, event.target.value]})
    }

    // --------------------------------IMAGE FUNCTIONS---------------------------------------------

    // handleChangeUsername = event => this.setState({ username: event.target.value });

    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

    handleProgress = progress => this.setState({ progress });

    handleUploadError = error => {this.setState({ isUploading: false }); console.error(error); };
    
    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => {
            this.setState({ 
                avatarURL: url,
                image: url
            })

            

        });
    };

// ----------------------Input Functions--------------------------------
    handleInputsChanges = event => {
        const { target: { name, value } } = event;
        this.setState({ [name]: value });

    }

    handleProductSubmit = event => {
        event.preventDefault();
        // console.log(this.state)
        axios.post("api/addinventory",this.state).then(items=>{
            console.log(items.data)
            this.setState({
                size: [],
                gender: [],
                demography: [],
                name: " ",
                image: null,
                price:  " ",
                both:   " ",
                details:    " ",
                category:   " ",
                brand:  " ",
                type:   " ",
                color:  " ",
                username: " ",
                avatar: " ",
                isUploading: false,
                progress: 0,
                avatarURL: " "
            })
        }).catch(err=>{
            console.log(err.message)
        });
    }

    render () {
        const { store } = this.props.storeOwner;
    return( <div className="marchandises-box" style={{width: '90%', margin: 'auto'}}>
                <div style={{textAlign:"center" }}><h6>Add products to Inventory</h6></div>
                <Grid className="demo-grid-1" >
                    <Cell style={{border: "3px double #333", padding:"10px" , height:"450px", textAlign: "center"}}  col={3}>
                        <p style={{textAlign:"center"}}>Image Here</p>
                        <img className="product-image" src={this.state.image? this.state.image : "https://static1.squarespace.com/static/5317b571e4b01396b757268a/535ed193e4b081613fd31a34/535ed193e4b081613fd31a39/1398722779508/photo-placeholder.png"} alt="product"/>
                        <hr/>
                        <Grid className="previews">
                            <Cell col={8}>
                                <label style={{color:"#000"}}>Name:</label>
                                <p style={{marginTop:"-10px"}}>{this.state.name}</p>
                            </Cell>
                            <Cell col={4}>
                                <label style={{color:"#000"}}>Price ($):</label>
                                <p style={{marginTop:"-10px"}}>{this.state.price}</p>
                            </Cell>                    
                        </Grid>
                    </Cell>
                    <Cell col={9} >
                            <Grid>
                                <Cell col={4}>
                                    <Grid>
{/* ----------------------------------------------------------------------------- */}
                                        <Cell col={12}>
                                        <form>
                                            <label style={{color:"#000"}}>Upload Item Image:</label>
                                            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                                            <FileUploader
                                                accept="image/*"
                                                name="avatar"
                                                randomizeFilename
                                                storageRef={firebase.storage().ref("images")}
                                                onUploadStart={this.handleUploadStart}
                                                onUploadError={this.handleUploadError}
                                                onUploadSuccess={this.handleUploadSuccess}
                                                onProgress={this.handleProgress}
                                            />
                                            </form>
                                            
                                        </Cell>
                                        <Cell col={12}>
                                            <label style={{color:"#000"}}>Item Name</label>
                                            <input
                                            placeholder="Item Name"
                                            style={{width: '100%'}}
                                            name="name"
                                            onChange={this.handleInputsChanges}
                                            />

                                        </Cell>
                                        <Cell col={12}>
                                            <label style={{color:"#000"}}>Iteme Price</label>
                                            <input
                                            placeholder="Iteme Price"
                                            style={{width: '100%'}}
                                            name="price"
                                            onChange={this.handleInputsChanges}
                                            />
                                        </Cell>
                                        <Cell col={12}>
                                            <label style={{color:"#000"}}>Both</label>
                                            <input
                                                placeholder="Both"
                                                style={{width: '100%'}}
                                                name="both"
                                                onChange={this.handleInputsChanges}
                                            />
                                        </Cell>
                                    </Grid>

                                </Cell>
{/* ----------------------------------------------------------------------------- */}
                                <Cell col={4}>
                                    <Grid>
                                   
                                        <Cell col={12}>
                                            <label style={{color:"#000"}}>Brand</label>
                                            <input
                                            placeholder="Brand"
                                            style={{width: '100%'}}
                                            name="brand"
                                            onChange={this.handleInputsChanges}
                                            />
                                        </Cell>
                                        
                                        <Cell col={12}>
                                            <label style={{color:"#000"}}>Item Color</label>
                                            <input
                                                placeholder="Item Color"
                                                style={{width: '100%'}}
                                                name="color"
                                                onChange={this.handleInputsChanges}
                                            />
                                        </Cell>   
                                        <Cell col={12}>
                                            <label style={{color:"#000"}}>Demography(Optional)</label>
                                            <br/>
                                            <i  id="kids" className="em em-child" ><button onClick={this.getDemographyValue} value="kids">Kids</button></i>
                                            <i id="youth" className="em em-boy"><button onClick={this.getDemographyValue} value="youth">Youth</button></i>
                                            <i id="old" className="em em-older_adult"><button onClick={this.getDemographyValue} value="old">Old</button></i>
                                        </Cell> 
                                        <Cell col={12}>
                                        <hr/>
                                            <label style={{color:"#000"}}>Gender(Optional)</label>
                                            <br/>
                                            <i id="female"className="em em-female_elf" ><button value="female" onClick={this.getGenderValue} type="button" className="gender">Female</button></i>
                                            <i id="male" className="em em-man" ><button value="male" onClick={this.getGenderValue}  type="button"className="gender">Male</button></i>
                                        </Cell>
                                    </Grid>
                                </Cell>
{/* ----------------------------------------------------------------------------- */}
                                <Cell col={4}>
                                    <Grid>                   
                                        <Cell col={12}>
                                                <label style={{color:"#000"}}>Add Size(Optional)</label>
                                                <br/>
                                                <ul>
                                                    {this.state.size.map((question, index) => (
                                                        <li key={index} id="size-field">
                                                            <input
                                                                style={{width:'50px', height:"30px", textAlign:"center", color:"#6351ce", border:"1px solid #000", borderRadius:"10px", marginLeft:"5px"}}
                                                                type="text"
                                                                onChange={this.handleSizeText(index)}
                                                                value={question}
                                                            />
                                                            <button onClick={this.handleDeleteSise(index)} >X</button>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button style={{width:"40px", float:"left", marginLeft:"5px"}} onClick={this.addSise}><span>Add</span></button>
                                        </Cell>
                                        <Cell col={12}>
                                            <label style={{color:"#000"}}>Categoty(Optional)</label>
                                            <input
                                            placeholder=" EX: Outfits"
                                            style={{width: '100%'}}
                                            name="category"
                                            onChange={this.handleInputsChanges}
                                            />
                                        </Cell>
                                        <Cell col={12}>
                                            <label style={{color:"#000"}}>Item Type</label>
                                            <input
                                            placeholder="Key word"
                                            style={{width: '100%'}}
                                            name="type"
                                            onChange={this.handleInputsChanges}
                                            />
                                        </Cell>
                                        <Cell col={12}>
                                            <label>Item Details(Optional)</label>
                                            <input
                                                placeholder="Item Details"
                                                style={{width: '100%'}}
                                                name="details"
                                                onChange={this.handleInputsChanges}
                                            />
                                        </Cell>
                                    </Grid>

                                </Cell>
                            </Grid>
                            <Grid>   
                            <Cell col={12}>
                                <button className="receiving-submut" style={{background:`${store.storeColor}`, color:`${store.textColor}`}} onClick={this.handleProductSubmit}>Submit</button>
                            </Cell>
                        </Grid>
                    </Cell> 
                </Grid>
            </div>
        )
    }
}


Receiving.propTypes = {
    // logoutUser: PropTypes.func.isRequired,
    storeOwner: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    storeOwner: state.storeOwner
  });
  
  export default connect(
    mapStateToProps,
  )(Receiving);