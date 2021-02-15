const express = require("express");
const router = express.Router();
const controlimport = require("../controller/EvaluationController");
const MongoClient = require('mongodb').MongoClient;
const controller = new controlimport.Evaluationcontroller(MongoClient);

router.get('/:id',((req, res) => {
    let fetchedEval = new Promise((resolve) => {
        let fetched = controller.evalByID(req.params.id);
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

router.post("/",((req, res) => {
    controller.postEval(req.body);
    res.send("Stored Evaluationrecord");
}));
router.delete("/",((req,res) => {
    controller.delEval(req.body);
    res.send("Deleted Evaluationrecord");
}));
router.put("/",((req, res) => {
    controller.updateEval(req.body);
    res.send("Updated Evaluationrecord");
}));

module.exports ={router};
