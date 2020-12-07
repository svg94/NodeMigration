var eval = require("../model/Evaluationrecord");
class Evaluationcontroller{
    constructor(mongo) {
        this.dbManager = mongo;
        this.url = "mongodb://localhost:27017/";
    }
    evalByID(Sid){
        var evalrecord={
            leadershipcompetence:[],
            openness:[],
            social:[],
            attitudetoclient:[],
            communicationskills:[],
            integritytocompany:[],
        };
        var blacklist = ['_id', 'sid'];             //filter these attributes because they are redundant and cause error in my program logic
        this.dbManager.connect(this.url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("highperformance");
            dbo.collection("evaluationrecords").findOne({sid : Number(Sid)}, function(err, result) {
                if (err) throw err;
                console.log("Fetched",result);
                Object.keys(result).filter((key)=>{return !blacklist.includes(key);}).forEach(function(key){
                    //TODO: IF result[key] empty add 2 zeros. PREVENTING ERROR
                    evalrecord[key].push(result[key][0]);
                    evalrecord[key].push(result[key][1]);

                });
                db.close();
            });
        });
        return evalrecord;
    }
    postEval(evalrecord){
        this.dbManager.connect(this.url,function(err,db) {
            if (err) throw err;
            var dbo = db.db("highperformance");
            dbo.collection("evaluationrecords").insertOne(evalrecord, function (err, resp) {
                if (err) throw err;
                db.close();
            });
        });
    }
    delEval(sid){
        this.dbManager.connect(this.url, function(err,db){
           if(err) throw err;
           let dbo = db.db("highperformance");
           dbo.collection("evaluationrecords").deleteOne(sid, function (err,resp){
               if(err) throw err;
               db.close();
           });
        });
    }
    updateEval(evalrecord){
        console.log(evalrecord.sid);
        this.dbManager.connect(this.url,function(err,db) {
            if (err) throw err;
            let dbo = db.db("highperformance");
            dbo.collection("evaluationrecords").updateOne({sid: evalrecord.sid},{$set: evalrecord}, function (err, resp) {
                if (err) throw err;
                db.close();
            });
        });
    }
}
module.exports ={Evaluationcontroller};
//{sid : Number(id)}