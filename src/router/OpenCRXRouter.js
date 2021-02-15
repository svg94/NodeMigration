const express = require("express");
const router = express.Router();
const summarizer = require("../controller/Summarizer/OpenCRXData");
const controlimport = require("../controller/OpenCRXController");
let controller = new controlimport.OpenCRXController();

router.get("/orderEvaluation/:id",(req,res)=>{
    summarizer.CollectOpenCRXData(controller,req.params.id).then(function(respond){
        res.send(respond);
    });
});
module.exports={router};
