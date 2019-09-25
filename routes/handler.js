var express = require('express');
var router = express.Router();
var path = require('path');
//var queries = require(path.join(__dirname,'../model/queries'));
// const mime = require('mime');
//var multer = require('multer');
var request = require('request');
var query = require('.././model/queries');
const { requ, GraphQLClient } =require('graphql-request');
const endpoint = 'https://highnot.herokuapp.com/v1/graphql'

router.get('/',(req,res)=>{
    console.log("here?");
   res.render('leaderboard');

});


// router.get('/main2',(req,res)=>{
//     console.log("here11?");
//    res.render('main2',{layout: 'main2.handlebars'});
// });


router.get('/user',(req,res)=>{
   res.render('user',{layout: 'user.handlebars'});
});

router.post('/vehicle',(req,res)=>{

console.log(req.body.type);

let url = "https://www.carbonhub.org/v1/vehicle",
    data = {
    "type": req.body.type,
    "origin": req.body.origin,
    "destination": req.body.destination,
    "mileage": req.body.mileage,
    "mileage_unit": req.body.mileage_unit
    },
    headers = {
    "access-key":"ccbeca73-e148-5f81-886e-64e191f920bb",
    "Content-Type":"application/json"
    };
getVehicleEmissions(url,data,headers);

});


function getVehicleEmissions(url,data,headers){

    var options = {
        url: url,
        method : 'POST' , 
        headers: headers,
        form: data
    }
    request(options, function (error, response, body) {
console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
console.log("HI");            // Print out the response body
            console.log(body);

requ(endpoint, query, body).then(data => console.log(data))

        }
    });
}


router.get('/form1',(req,res)=>{
   res.render('form1',{layout: 'form1.handlebars'});
});

router.post('/appliance',(req,res)=>{

let url = "https://www.carbonhub.org/v1/appliances",
    data = {
     "appliance":req.body.appliance,
    "type":req.body.type,
    "region":req.body.region,
    "quantity":req.body.qty,
    "running_time":req.body.rt
    },
    headers = {
    "access-key":"ccbeca73-e148-5f81-886e-64e191f920bb",
    "Content-Type":"application/json"
    };
getApplianceEmissions(url,data,headers);

});


function getApplianceEmissions(url,data,headers){

    var options = {
        url: url,
        method : 'POST' , 
        headers: headers,
        form: data
    }
    request(options, function (error, response, body) {
// console.log(response.body);
// console.log(error.body);
console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
console.log("HI");            // Print out the response body
            console.log(body);
        }
    });
}

router.get('/power',(req,res)=>{
   res.render('power',{layout: 'power.handlebars'});
});


router.post('/power',(req,res)=>{

let url = "https://www.carbonhub.org/v1/emissions",
    data = {
    "item": "electricity",
    "region": req.body.reg,
    "unit": req.body.unit,
    "quantity": req.body.qty
    },
    //use your api key here
    headers = {
    "access-key":"ccbeca73-e148-5f81-886e-64e191f920bb",
    "Content-Type":"application/json"
    };
    getEmissions(url,data,headers);

});

function getEmissions(url,data,headers){
    var options = {
        url: url,
        method: 'POST',
        headers: headers,
        form: data
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body) ; 
        }
    });
}


module.exports=router;