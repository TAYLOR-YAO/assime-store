const express = require("express");
const db = require("../models");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/Keys");
// Load input validation
const validateRegisterInput = require("../validation/store-register");
const validateLoginInput = require("../validation/login");


router.post("/enroll", (req, res) => {  
    const { errors, isValid } = validateRegisterInput(req.body);
 // Check validation
   if (!isValid) {
     return res.status(400).json(errors);
   }
 db.Stores.findOne({ email: req.body.email }).then(user => {
     if (user) {
       return res.status(400).json({ email: "Email already exists" });
     } else {
       const newStore = new Store({
        company: req.body.company,
        city: req.body.city,
        countryOrState:req.body.countryOrState,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
        tel: req.body.tel,
        tel2:req.body.tel2,
        streetAddress: req.body.streetAddress,
        zip: req.body.zip,
        tax:req.body.tax,
        shipping:req.body.shipping,
        expressShipping:req.body.expressShipping,
        storeColor:req.body.storeColor,
        textColor:req.body.textColor
       });
 // Hash password before saving in database
       bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(newStore.password, salt, (err, hash) => {
           if (err) throw err;
           newStore.password = hash;
           newStore
             .save()
             .then(store => res.json(store))
             .catch(err => console.log(err));
         });
       });
     }
   });
});


router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    db.Stores.findOne({ email }).then(store => {
      // Check if user exists
      if (!store) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, store.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            city: store.city,
            countryOrState: store.countryOrState,
            email: store.email,
            tel: store.tel,
            tel2: store.tel2,
            streetAddress: store.streetAddress,
            zip: store.zip,
            tax: store.tax,
            shipping:store.shipping,
            expressShipping: store.expressShipping,
            storeColor: store.storeColor,
            textColor: store.textColor,
            id: store.id,
            company: store.company
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });
 




// router.post("/registration", (req, res) => {  
//     db.Stores.create(req.body).then(store =>{
//         res.send(store)
//     }).catch(err=>{
//         console.log(err.message);
//     });
// });

// router.get("/storeIdentification", (req, res) => {  
//     db.Stores.find({}).then(stores =>{
//         res.send(stores)
//     }).catch(err=>{
//         console.log(err.message);
//     });
// });

// router.get("/displaystoreitems", (req, res) => {   
//     db.Inventory.find({"company":req.query.company}).then(storeItems =>{
//         res.send(storeItems)
//     }).catch(err=>{
//         console.log(err);
//     });
// });

// router.get("/displaycategoryitems", (req, res) => {
//     db.Inventory.find({"category":req.query.category}).then(storeItems =>{
//         res.send(storeItems)
//     }).catch(err=>{
//         console.log(err);
//     });
// });

// router.get("/displaytypeitems", (req, res) => {     
//     db.Inventory.find({"type":req.query.type}).then(storeItems =>{
//         res.send(storeItems)
//     }).catch(err=>{
//         console.log(err);
//     });
// });

module.exports = router;
