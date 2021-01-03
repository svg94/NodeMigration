const axios = require('axios');
class OpenCRXController{
    constructor() {
        this.baseURL = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX";
        this.credentials = {
            username: 'guest',
            password: 'guest',
        };
        this.config ={
            headers: {'Accept': 'application/json'},
            auth: this.credentials,
        };
    }
    async getAllSalesOrders(){
        const fetchedsalesOrders = await axios.get(`${this.baseURL}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder`, this.config);
        const salesOrders = fetchedsalesOrders.data.objects;
        return salesOrders;
    }
    async getSalesOrder(id){
        const fetchedsalesOrder = await axios.get(`${this.baseURL}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${id}`, this.config);
        return fetchedsalesOrder["data"];
    }
    async getCustomerFromSalesOrder(id) {
        const fetchedData = await this.getSalesOrder(id);
        //console.log(fetchedData);
        const customerURL = fetchedData["customer"]["@href"];
        const fetchCustomer = await axios.get(customerURL,this.config);
        const customerData ={
            url: customerURL,
            name: fetchCustomer["data"]["fullName"],
        };
        return customerData;
    }
    async getSalesmanFromSalesOrder(id){
        const fetchedData = await this.getSalesOrder(id);
        const salesmanURL = fetchedData["salesRep"]["@href"];
        const fetchSalesman = await axios.get(salesmanURL,this.config);
        const salesman ={
            url: salesmanURL,
            name: fetchSalesman["data"]["fullName"],
        };
        return salesman;
    }
    async getAllPositionsFromOrder(orderId){
        const fetchPosition = await axios.get(`${this.baseURL}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${orderId}/position`,this.config);
        return fetchPosition["data"].objects;
    }
    async getPositionFromOrder(orderId,positionID){
        const fetchPosition = await axios.get(`${this.baseURL}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${orderId}/position/${positionID}`,this.config);
        return fetchPosition["data"];
    }
    async getProductNameFromPositionFromOrder(orderId,positionID){
        const position = await this.getPositionFromOrder(orderId,positionID);
        const productURL = position["product"]["@href"];
        const fetchedProduct = await axios.get(productURL,this.config);
        return fetchedProduct["data"]["name"];
    }
    async getQuantityFromProductFromPositionFromOrder(orderId, positionID){
        const position = await this.getPositionFromOrder(orderId,positionID);
        return position["quantityBackOrdered"];
    }
    async getClientRanking(orderId){
        const client = await this.getCustomerFromSalesOrder(orderId);
        const clientRanking = await axios.get(client["url"],this.config);
        return clientRanking["data"]["accountRating"];
    }
}
module.exports ={OpenCRXController};