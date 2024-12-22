
type Pizza = {
  pizza:string,
  price:number,
}


const menu= [
  { pizza: "margaritta", price: 800 },
  { pizza: "hawaiian", price: 900 },
  { pizza: "veggies", price: 800 },
  { pizza: "panner", price: 900 },
];

const myName = "akash"
let myName2 = "Akasn"



type Order = {
  id: number;
  pizza: Pizza;
  status: string;
}

let chashInRegister: number = 100;
let orderId: number = 0;
const orderQueue: Order[] = [];


function addNewPizza(pizzaObj : Pizza) {
  menu.push(pizzaObj);
}

function placeOrder(pizzaName: string) {
  const orderPizza = menu.find((obj) => obj.pizza === pizzaName);

  if (!orderPizza) {
    console.error("error");
    return;
  }
  chashInRegister = chashInRegister + orderPizza.price;

  const newOrder = { pizza: orderPizza, status: "ordered", id: orderId++ };

  orderQueue.push(newOrder);

  return newOrder;
}

function completeOrder(id: number) {
  const foundOrder = orderQueue.find((order) => order.id === id);

  if (!foundOrder) {
    console.error("error");
    return;
  }
  foundOrder.status = "completed";

  return foundOrder;
}
