function Evaluationrecord(lead,open,s,a,c,i) {
    if(lead.length !== 2 || lead.length !== 2 || lead.length !== 2 || lead.length !== 2 || lead.length !== 2 || lead.length !== 2) throw new Error("Initialise Error Length from EvaluationRecord is wrong");
    this.leadershipcompetence = lead;
    this.openness = open;
    this.social = s;
    this.attitudetoclient = a;
    this.communicationskills = c;
    this.integritytocompany = i;
}

module.exports={Evaluationrecord};