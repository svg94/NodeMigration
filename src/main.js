const crxController = require('./controller/OpenCRXController');
const crxSummarize = require("./controller/Summarizer/OpenCRXData");
const express=require('express');
const app=express();
app.use(express.json());    //For giving a json-object in the body

let crxControl = new crxController.OpenCRXController();

let salesmenRouter = require("./router/SalesmenRouter");
app.use("/salesmen",salesmenRouter.router);

let evaluationRouter = require("./router/EvaluationRouter");
app.use("/evaluationrecords",evaluationRouter.router);
/*
*  Start-Screen
*/

app.get('/',(req,res)=>{
    res.send("");
});

app.listen(8081,()=>{
    console.log('Application started.');
});

/*
*   OPENCRX-FUNCTIONS
*
*/
app.get("/openCRX/orderEvaluation/:id",((req, res) => {
    crxSummarize.CollectOpenCRXData(crxControl,req.params.id).then(function(respond){
        res.send(respond);
    });
}));

