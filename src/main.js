const salesmen = require('./model/Salesman');
const sController = require('./controller/SalesmenController');
var MongoClient = require('mongodb').MongoClient;
const express=require('express');
const app=express();


var sControl = new sController.Salesmencontroller(MongoClient);

app.get('/',(req,res)=>{
    res.send("Welcome to Node-based REST-API");
    console.log(sControl);
});

app.get('/GetSalesman/:id',(req, res) => {
    let fetchedsalesman = new Promise((resolve, reject) => {
        let fetched = sControl.salesmanByID(req.params.id);
        setTimeout(()=>{resolve(fetched);},1000);
    });
    fetchedsalesman.then(
        function (value){
            console.log(value);
            res.send(value);
        },
        function (err){
            res.send(err);
        }
    )
});

app.listen(8081,()=>{
    console.log('Application started.');
});
/*app.get('/addS',(req,res)=>{
    let salesPromise = new Promise(function(resolve,reject){
        var s= new salesmen.Salesman("Lara","Loft",77);
        resolve(s);
    });
    salesPromise.then(s =>{
        dbo.collection("Salesmen").insertOne(s,function(err,resp){
            if(err) throw err;
            res.send("Salesmen sent.");
            database.close();
        });
    });
});*/

