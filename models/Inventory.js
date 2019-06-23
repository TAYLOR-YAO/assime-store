const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({

    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    storeId:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    storeColor:{
        type: String,
        default: "maroon"
    },
    textColor:{
        type: String,
        default: "white"
    },
    size:{
        type: [String],
        default: []
      },
      demography:{
        type: [String],
        default: []
      },
      gender:{
        type: [String],
        default: []
      },
    price:{
        type: Schema.Types.Decimal128,
        required: true
    },
    storeTell:{
        type: String,
        require: true
    },
    storeEmail: {
        type: String,
        require: true
    },
    tax:{
        type: Schema.Types.Decimal128,
        required: true
    },
    shipping:{
        type: Schema.Types.Decimal128,
        default: 0
    },
    expressShipping:{
        type: Schema.Types.Decimal128,
        default: 0
    },
    both:{
        type: Number,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        require: true
    },
    color:{
        type: String,
        default: ""
    },
    updatedTime:{
        type: Date,
        default: Date.now
    }
});

const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;