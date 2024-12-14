import Order from "../models/order.model.js"


async function getOrder(req, res) {

    try {
        
    } catch (error) {
        
    }
    
}


async function createOrder(req, res) {

     const {cartId, totalPrice, customerAddress, paymentInfo} = req.body
    try {
        

    } catch (error) {
        
    }
    
}


async function cancelOrder(req, res) {
    
    try {
        
    } catch (error) {
        
    }
}


async function updateOrder(req, res) {
    
    try {
        
    } catch (error) {
        
    }
}

export {getOrder, createOrder, cancelOrder, updateOrder}