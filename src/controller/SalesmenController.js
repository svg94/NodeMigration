var salesmen = require('../model/Salesman');
class Salesmencontroller{
    constructor(mongo) {
        this.dbManager = mongo;
        this.url = "mongodb://localhost:27017/";
    }
    salesmanByID(Sid){
        var fetched={
            firstname: "",
            lastname: "",
            id: 0,
        };
        this.dbManager.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("highperformance");
            dbo.collection("Salesmen").findOne({id : Number(Sid)}, function(err, result) {
                if (err) throw err;
                fetched.firstname = result.firstname;
                fetched.lastname = result.lastname;
                fetched.id = result.id;
                db.close();
            })
        });
        return fetched;
    }
    postSalesman(salesman){
        this.dbManager.connect(this.url,function(err,db){
            if(err) throw err;
            var dbo = db.db("highperformance");
            dbo.collection("Salesmen").insertOne(salesman,function(err,resp){
                if(err) throw err;
                db.close();
            });
        })
    }
    delSalesman(id){
        this.dbManager.connect(this.url,function(err,db){
            if(err) throw err;
            var dbo = db.db("highperformance");
            dbo.collection("Salesmen").deleteOne(id,function(err,resp){
                if(err) throw err;
                db.close();
            });
        })
    }
    updateSalesman(salesman){
        this.dbManager.connect(this.url,function(err,db) {
            if (err) throw err;
            let dbo = db.db("highperformance");
            dbo.collection("Salesmen").updateOne({id: salesman.id},{$set: salesman}, function (err, resp) {
                if (err) throw err;
                db.close();
            });
    });
    }
}

module.exports ={Salesmencontroller};