const sController = require('./controller/SalesmenController');
const eController = require('./controller/EvaluationController');
const crxController = require('./controller/OpenCRXController');
const MongoClient = require('mongodb').MongoClient;
const express=require('express');
const app=express();
app.use(express.json());    //For giving a json-object in the body
var sControl = new sController.Salesmencontroller(MongoClient);
var eControl = new eController.Evaluationcontroller(MongoClient);
let crxControl = new crxController.OpenCRXController();

/*
*  Start-Screen
*/

app.get('/',(req,res)=>{
    res.send("Welcome to Node-based REST-API. <br>/Salesman/:id for getting a Salesman <br>/Salesman (post) for storing one <br>The same with /EvaluationRecord");
});

/*------------------
 *Salesman-Functions
 *------------------
 */
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
    sControl.postSalesman(req.body);
    res.send("Stored Salesman in database");
}));
app.put("/Salesman",((req, res) => {
    sControl.updateSalesman(req.body);
    res.send("Updated Salesman");
}));
app.delete("/Salesman",((req, res) => {
    sControl.delSalesman(req.body);
    res.send("Deleted Salesman");
}));
/*---------------------------
 * Evaluationrecord-Functions
 *---------------------------
 */

app.get('/Evaluationrecord/:id',((req, res) => {
    let fetchedEval = new Promise((resolve) => {
        let fetched = eControl.evalByID(req.params.id);
        setTimeout(()=>{resolve(fetched);},20);            //Is there another way than using a timer?
    });
    fetchedEval.then(
        function (value){
            res.send(value);
        },
        function (err){
            res.send(err);
        }
    )
}));

app.post("/Evaluationrecord",((req, res) => {
    eControl.postEval(req.body);
    res.send("Stored Evaluationrecord");
}));
app.delete("/Evaluationrecord",((req,res) => {
    eControl.delEval(req.body);
    res.send("Deleted Evaluationrecord");
}));
app.put("/Evaluationrecord",((req, res) => {
    eControl.updateEval(req.body);
    res.send("Updated Evaluationrecord");
}));

/*
* Default-App-Starter
* */
app.listen(8081,()=>{
    console.log('Application started.');
});

/*
*   OPENCRX-FUNCTIONS
*
*/
app.get("/openCRX/allProducts",((req, res) => {
    crxControl.getAllSalesOrders().then(function (respond){
        res.send(respond);
    });
}));

