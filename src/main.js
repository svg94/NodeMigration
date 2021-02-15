const express=require('express');
const app=express();
app.use(express.json());    //For giving a json-object in the body


let salesmenRouter = require("./router/SalesmenRouter");
app.use("/salesmen",salesmenRouter.router);

let evaluationRouter = require("./router/EvaluationRouter");
app.use("/evaluationrecords",evaluationRouter.router);

let openCRXRouter= require("./router/OpenCRXRouter");
app.use("/crx",openCRXRouter.router);

let orangeHRMRouter = require("./router/OrangeHRMRouter");
app.use("/hrm",orangeHRMRouter.router);


app.listen(8081,()=>{
    console.log('Application started.');
});
