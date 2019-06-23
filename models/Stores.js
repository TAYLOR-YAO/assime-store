const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({

    company:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    countryOrState:{
        type:String,
        required:true
    },
   
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true
    },
    tel:{
        type:String,
        required:true
    },
    tel2:{
        type:String,
        default: ""
    },
    streetAddress:{
        type:String,
        required:true
    },
    zip:{
        type: Number,
        required:true
    },
    tax:{
        type: Schema.Types.Decimal128,
        required: true
    },
    storeRate:{
        type: Number,
        default: 3
    },
    shipping:{
        type: Schema.Types.Decimal128,
       default: 0
    },
    expressShipping:{
        type: Schema.Types.Decimal128,
        default: 0
    },
    storeColor:{
        type:String,
        default:""
    },
    textColor:{
        type:String,
        default:""
    },
    creationDate:{
        type: Date,
        default:Date.now
    }
});

const Stores = mongoose.model("Stores", StoreSchema);

module.exports = Stores;
