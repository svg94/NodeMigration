/*Diese Klasse dient der Zusammenfassung der OpenCRX Daten in einer Funktion.
 *Dies sorgt dafür, dass der Client dieser REST API nur Zugriff auf eine Zusammenfassung hat.
 * Mehr braucht der Client nicht, um das Bonussheet auszufüllen
*/
/*
* Programmablaufsplan:
* 1.Input Argument ist die ID eines Salesman.
* 2. Speicher alle SalesOrders
* 3. Filter Sie, sodass nur die Orders von dem bestimmten Salesman kommen
* 4. Suche alle Produktnamen, die vom Salesman verkauft wurden
* (5. //Sortiere die Salesorders nach den Produktnamen)
* 6. Erstelle Objekte mit {productname: "Staubsauger", clientname:"", ranking:"", items:42}
*
* */
const opencrx = require("../OpenCRXController");
async function CollectOpenCRXData(controller, sid){
    let viewDataList=[];    //The list to be returned.
    const orderData = await controller.getAllSalesOrders();
    const filteredOrders = orderData.filter((order)=>{              //Filter the orders where the responsible Salesman has the same Account ID as the argument sid.
        const splitted = order["salesRep"]["@href"].split("/");
        const accountID = splitted[splitted.length-1];
        return accountID === sid;
    });
    //console.log(filteredOrders, filteredOrders.length);
    for(let i = 0; i < filteredOrders.length; i++){
        const splitted = filteredOrders[i]["@href"].split("/");
        const orderID = splitted[splitted.length-1];
        let productname = [];   //pname and items are lists because there can be more than one positions per salesorder.
        let items = [];
        const customer = await controller.getCustomerFromSalesOrder(orderID);
        const customerRanking = await controller.getClientRanking(orderID);
        const positions = await controller.getAllPositionsFromOrder(orderID);   //Fetch all positions
        //console.log(positions);
        if(positions) { //When a SalesOrder has no Positions the script crashes. So get some error handling.
            for (let j = 0; j < positions.length; j++) {
                const psplitted = positions[j]["@href"].split("/");
                const positionID = psplitted[psplitted.length - 1];
                const prName = await controller.getProductNameFromPositionFromOrder(orderID, positionID);
                const quantity = await controller.getQuantityFromProductFromPositionFromOrder(orderID, positionID);
                productname.push(prName);
                items.push(quantity);
            }
        }
        //build one json thingy to return
        let jsonOrder= {
          productname: productname,
          clientname: customer,
          clientranking: customerRanking,
          items: items,
        };
        viewDataList.push(jsonOrder);
        console.log(jsonOrder);
    }
    return viewDataList;
}
//let contr = new opencrx.OpenCRXController();
//CollectOpenCRXData(contr, "NI7XwEIBEd29BeMf4vj8cA");    //sid = AccountID
//L0NTAXG7TQTPM0EBHQA5MAZ7J Sallinger
//NI7XwEIBEd29BeMf4vj8cA Guest
module.exports = {CollectOpenCRXData};