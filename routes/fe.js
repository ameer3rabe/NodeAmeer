const express = require('express');
const router = express.Router()
module.exports = router;

router.get("/",(req, res) => {

    res.render("mainPage", {pageTitle:"בוקר טוב"});
});

router.get("/Addemployee",(req, res) => {

    res.render("workerpage", {});
});


router.get("/Addcheckin",(req, res) => {

    res.render("Checkin", {});
});


router.get("/View",(req, res) => {

    res.render("display", {});
});

