const express = require("express");
const ex1router = express.Router();


ex1router.get("/ex01", (req,res)=>{
    console.log(req.query)

    res.render('ex01', {
        name : req.query.userName,
        season : req.query.season
    })
});

module.exports = ex1router;