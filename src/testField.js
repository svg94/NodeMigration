const c = require('./controller/OpenCRXController');

let ctr = new c.OpenCRXController();
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
testGetAllPositions();