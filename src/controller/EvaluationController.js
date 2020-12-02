var eval = require("../model/Evaluationrecord");
class Evaluationcontroller{
    constructor(mongo) {
        this.dbManager = mongo;
        this.url = "mongodb://localhost:27017/";
    }
    EvalByID(Sid){
        var fetched=[];
        var evalrecord={
            leadershipcompetence:[],
            openness:[],
            social:[],
            attitudetoclient:[],
            communicationskills:[],
            integritytocompany:[],
        };
        var blacklist = ['_id', 'sid'];             //filter these attributes because they are redundant
        var promise = new Promise(((resolve, reject) => {
            this.dbManager.connect(this.url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("highperformance");
                dbo.collection("evaluationrecords").findOne({sid : Number(Sid)}, function(err, result) {
                    if (err) throw err;
                    console.log("Fetched",result);
                    Object.keys(result).filter((key)=>{return !blacklist.includes(key);}).forEach(function(key){
                        //IF result[key] empty add 2 zeros. PREVENTING ERROR
                        result[key].forEach((elem)=>{
                           fetched.push(elem);
                       });
                    });
                    resolve(fetched);
                    db.close();
                });
            });
        })).then(function(v){
            let buildEval = new Promise((resolve => {   //Indexed might be reversed wegen Stack
                //evalrecord = new eval.Evaluationrecord([v[0],v[1]],[v[2],v[3]],[v[4],v[5]],[v[6],v[7]],[v[8],v[9]],[v[10],v[11]]);
                let i = 0;
                Object.keys(evalrecord).forEach((key)=>{
                   evalrecord[key].push(v[i]);
                   evalrecord[key].push(v[i+1]);
                   i+=2;
                });
                resolve(evalrecord);
            })).then(function(value){
                return evalrecord;
            });
        });
        return evalrecord;
    }
    PostEval(evalrecord){
        this.dbManager.connect(this.url,function(err,db) {
            if (err) throw err;
            var dbo = db.db("highperformance");
            dbo.collection("evaluationrecords").insertOne(evalrecord, function (err, resp) {
                if (err) throw err;
                db.close();
            });
        });
    }
}
module.exports ={Evaluationcontroller};