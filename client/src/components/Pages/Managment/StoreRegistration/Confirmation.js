import React from "react";
import {Modal,Button} from "react-bootstrap";


export default  props =>
<div className="static-modal" >
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title style={{color:"green"}}>Succesfully Registred!</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{textAlign:"left", marginLeft:" 20px 5px"}}>
        <div>
            <p> Store: <span style={{fontSize:"24px", marginLeft: "5px"}}>{props.company}</span> </p>
            <p>Store ID: <span style={{fontSize:"24px", marginLeft: "5px"}}>{props.storeID}</span></p>
        </div>
        <div>
            <p style={{fontSize:"12px", color:"red", marginTop:"-5px"}}> Note: The store ID is private and should note be share with anybody else.
            </p>
        </div>
        <div>
            <p>Location: {props.location}</p>
            <br/>
            <p>Email: {props.email}</p>
            <br/>
            <p>Contact: {props.tel}</p>
            <br/>
            <p>Adress: {props.address}</p>
        </div>
    </Modal.Body>

    <Modal.Footer>
    <a href="storeregistration" ><Button bsStyle="primary">OK!</Button></a>
    </Modal.Footer>
  </Modal.Dialog>
</div>;