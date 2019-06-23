import React,{Component} from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
function custumerInfos(){
  const value = localStorage.getItem("currentUser");
  const customer= JSON.parse(value)
  return customer
  
}

class TakeMoney extends Component {
  constructor(props){
    super(props)
    this.state = {
      sum: this.props.cart.map(item=> item.price.$numberDecimal * item.quantity).reduce((a, b) => a + b, 0).toFixed(2) * 100
    }
  }

  onToken = (token) => {
    const data = {
      stripeToken: token.id,
      cart: this.props.cart,
      email: custumerInfos().email
    }
    axios.post("api/stripe",data).then(response =>{
        if(response.data.success){
          this.props.clearCarts(this.props.cart)
        }
    });
  }

  render() {
    return (
      <StripeCheckout
        name = "Assime-228" 
        description="marchandise 2" 
        image = {custumerInfos().image ? custumerInfos().image : "http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}
        ComponentClass = "div"
        panelLabel = "Payement" 
        amount = {this.state.sum} 
        currency = "USD"
        stripeKey="pk_test_cM23Qzh2EOsyccPOWDoXmVUA"
        locale = "en"
        email = {custumerInfos().email}
        shippingAddress
        billingAddress={true}
        zipCode={true}
        alipay 
        bitcoin 
        allowRememberMe 
        token={this.onToken} 
        opened={this.onOpened} 
        closed={this.onClosed} 
        reconfigureOnUpdate={false}
        triggerEvent="onClick"
        >
        <button className="btn-primary" id="stripe-Btn">
         Pay Now
        </button>
      </StripeCheckout>
    )
  }
}
   

function mapStateToProps(state){
  return{
      cart:state.cart
  }
}
function mapDispatchToProps(dispatch){
  return{
      clearCarts:(item) =>{
          dispatch({type: "CLEAR_CARTS"})
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TakeMoney);