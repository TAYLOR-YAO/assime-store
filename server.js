
//  Node packages
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const inventoryRoutes = require("./routes/inventory-routes")
const storeRoutes = require("./routes/stores-routes");
const deliveredRoutes = require("./routes/delivered-routes");
const sellsRoutes = require("./routes/sells-routes");
const updatesRoutes = require("./routes/updates-routes");
const paymentRoute = require("./routes/payment-routes");

const path = require("path");
//  =================================================

//  Connection with express modules
const app = express();
const PORT = process.env.PORT || 5001;
//  ========================================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use (express.static("client/build"))

//Connection to mongoDB
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://assime:assime228@ds341837.mlab.com:41837/heroku_tk9srqsq', ()=>{
    console.log("Succesfuly Connected to MongoDB")
});


// ---------------------------------CosmossDB Connector --------------------------------
// mongoose.connect(process.env.CONNECTING_STRING || 'mongodb://localhost/assime228', ()=>{
//         console.log("Succesfuly Connected to CosmosDB")
    // });
// --------------------------------------------------------------------------------------

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
app.use("/api",inventoryRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api", deliveredRoutes);
app.use("/api", sellsRoutes);
app.use("/api", updatesRoutes);
app.use("/api", paymentRoute);


app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});




// PORT Listener
server.listen(process.env.PORT || PORT)
// app.listen(PORT,()=>{
//     console.log(`Listening on port: ${PORT}`);
// });