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
        var promise = new Promise(((resolve, reject) => {
            this.dbManager.connect(this.url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("highperformance");
                dbo.collection("Salesmen").findOne({id : Number(Sid)}, function(err, result) {
                    if (err) throw err;
                    console.log("Fetched",result);
                    fetched.firstname = result.firstname;
                    fetched.lastname = result.lastname;
                    fetched.id = result.id;
                    resolve(result);
                    db.close();
                })
            });
        }));
        return fetched;
    }
    PostSalesman(salesman){
        this.dbManager.connect(this.url,function(err,db){
            if(err) throw err;
            var dbo = db.db("highperformance");
            dbo.collection("Salesmen").insertOne(salesman,function(err,resp){
                if(err) throw err;
                db.close();
            });
        })
    }
}

module.exports ={Salesmencontroller};