const axios = require('axios');
const qs = require('querystring');
class OrangeHRMController{
    constructor() {
        this.baseUrl = "https://sepp-hrm.inf.h-brs.de/symfony/web/index.php";
        this.bodyToken =qs.stringify({
            client_id: 'api_oauth_id',
            client_secret: 'oauth_secret',
            grant_type: 'password',
            username: 'Savic',
            password: '*Safb02!StudentAsUserPwd$IA'
        });
        this.token = "";
        this.config = {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            }
        };
    }
    async getToken(){
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            }
        };
        const res = await axios.post(`${this.baseUrl}/oauth/issueToken`, this.bodyToken, config);
        if (res.data.error) {
            throw Error(res.data.error);
        }
        this.token = res.data['access_token'];
        return this.token;
    }
    async writeSalary(id){

    }
    async getAllSalesmen(){

    }
    async getSalesman(id){

    }
    async getNameFromSalesman(id){

    }
}
module.exports = {OrangeHRMController};