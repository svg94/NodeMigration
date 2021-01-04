const c = require('./controller/OpenCRXController');
const oc = require('./controller/OrangeHRMController');

let ctr = new c.OpenCRXController();
let octr = new oc.OrangeHRMController();
async function testGetCustomer(){
    let x = await ctr.getCustomerFromSalesOrder("9DTSXR06DLHPM0EBHQA5MAZ7J");
    console.log(x);
    return 1;
}
async function testGetSalesman(){
    let x = await ctr.getSalesmanFromSalesOrder("3E8SW73JWB08B3YYXPE68DGJ5");
    console.log(x);
    return 1;
}
async function testGetPosition(){
    let x = await ctr.getPositionFromOrder("9DTSXR06DLHPM0EBHQA5MAZ7J","3CZN0GINLXPT60EBHQA5MAZ7J");
    console.log(x);
    return 1;
}
async function testGetQuantity(){
    let x = await ctr.getQuantityFromProductFromPositionFromOrder("9DTSXR06DLHPM0EBHQA5MAZ7J","3CZN0GINLXPT60EBHQA5MAZ7J");
    console.log(x);
    return 1;
}
async function testGetPName(){
    let x = await ctr.getProductNameFromPositionFromOrder("9DTSXR06DLHPM0EBHQA5MAZ7J","3CZN0GINLXPT60EBHQA5MAZ7J");
    console.log(x);
    return 1;
}
async function testGetClientRanking(){
    let x = await ctr.getClientRanking("9DTSXR06DLHPM0EBHQA5MAZ7J");
    console.log(x);
    return 1;
}
async function testGetAllPositions(){
    let x = await ctr.getAllPositionsFromOrder("9DTSXR06DLHPM0EBHQA5MAZ7J");
    console.log(x.length);
}
async function testGetSalesOrder(){
    let x = await ctr.getSalesOrder("9DTSXR06DLHPM0EBHQA5MAZ7J");
    console.log(x);
}
//testGetSalesOrder();

//OrangeHRM Tests
async function testToken(){
    let x = await octr.getToken();
    console.log(x);
}
testToken();