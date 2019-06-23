const express = require("express");
const mongoose = require("mongoose");
const db = require("../models");
const router = express.Router();

router.get("/getsells", (req, res) => { 
        db.Sells.find({"storeEmail":req.query.storeEmail}).then(sells =>{
        res.send(sells)
    }).catch(err=>{
        return err.message
    })

});

module.exports = router;