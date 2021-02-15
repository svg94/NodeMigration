const express = require("express");
const router = express.Router();
const controlimport = require("../controller/OrangeHRMController");
const controller = new controlimport.OrangeHRMController();

router.get("/getToken",(req, res) => {
    controller.getToken().then(function (token){
        res.send(token);
    });
});
router.post("/:id/salary",(req, res) => {
   controller.writeSalary(req.params.id,req.body).then(function (response){
       res.send(response);
   });
});

module.exports={router};
