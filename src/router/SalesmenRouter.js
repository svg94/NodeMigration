const express = require("express");
const router = express.Router();
const controlimport = require("../controller/SalesmenController");
const MongoClient = require('mongodb').MongoClient;
const controller = new controlimport.Salesmencontroller(MongoClient);

router.get('/:id',(req, res) => {
    let fetchedsalesman = new Promise((resolve) => {
        let fetched = controller.salesmanByID(req.params.id);
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
router.post("/",((req, res) => {
    controller.postSalesman(req.body);
    res.send("Stored Salesman in database");
}));
router.put("/",((req, res) => {
    controller.updateSalesman(req.body);
    res.send("Updated Salesman");
}));
router.delete("/",((req, res) => {
    controller.delSalesman(req.body);
    res.send("Deleted Salesman");
}));

module.exports={router};
