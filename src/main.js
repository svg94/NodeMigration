const sController = require('./controller/SalesmenController');
const eController = require('./controller/EvaluationController');
const MongoClient = require('mongodb').MongoClient;
const express=require('express');
const app=express();
app.use(express.json());
var sControl = new sController.Salesmencontroller(MongoClient);
var eControl = new eController.Evaluationcontroller(MongoClient);

app.get('/',(req,res)=>{
    res.send("Welcome to Node-based REST-API");
});

app.get('/Salesman/:id',(req, res) => {
    let fetchedsalesman = new Promise((resolve) => {
        let fetched = sControl.salesmanByID(req.params.id);
        setTimeout(()=>{resolve(fetched);},20);            //Is there another way than using a timer?
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
app.post("/Salesman",((req, res) => {
    console.log(req.body.firstname);
    sControl.PostSalesman(req.body);
    //res.json({requestBody: req.body});
    res.send("Stored Salesman in database");
}));

app.get('/Evaluationrecord/:id',((req, res) => {
    let fetchedEval = new Promise((resolve) => {
        let fetched = eControl.EvalByID(req.params.id);
        setTimeout(()=>{resolve(fetched);},20);            //Is there another way than using a timer?
    });
    fetchedEval.then(
        function (value){
            console.log(value);
            res.send(value);
        },
        function (err){
            res.send(err);
        }
    )
}));

app.listen(8081,()=>{
    console.log('Application started.');
});


