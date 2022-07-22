const Razorpay = require("razorpay");
const shortid = require("shortid");
import Order from '../../models/Order'
import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose'
import pincodes from '../../pincodes.json'

const Handler = async (req, res)=>{

  if (req.method === "POST") {
    // console.log(req.body);

    //check if user loggedin or not
    if(!req.body.email){
      res.status(200).json({success: false, "error": "Please Login your Account to order!!!", cartClear: false})
      return
    }

    //check if pincode is serviceble
    // if(!Object.keys(pincodes).includes(req.body.pincode)){
    //   res.status(200).json({success: false, "error": "The pincode is not serviceble!", cartClear: false})
    //   return
    // }

    //check if the cart is tempared with 
    let sumTotal = 0;
    let cart = req.body.cart;
    if(req.body.subTotal <= 0){
      res.status(200).json({success: false, "error": "Your Cart is Empty. Please try again!!!", cartClear: false})
      return
    }
    for(let item of Object.keys(cart)){
      // console.log(item);
      sumTotal += cart[item].price*cart[item].qty;
      let product = await Product.findOne({slug: item})

      //if cart item are not out of stock
      if(product.availablety < cart[item].qty) {
        res.status(200).json({success: false, "error": "Some product of your cart is Out of Stock. Please try again!!!", cartClear: true})
      }

      if(product.price != cart[item].price){
        res.status(200).json({success: false, "error": "The price of some items in your cart has changed. Please try again!!!", cartClear: true})
        return;
      }
    }
    if(sumTotal !== req.body.subTotal){
      res.status(200).json({success: false, "error": "The price of some items in your cart has changed. Please try again!!!", cartClear: true})
      return;
    }

    //if detailes are valid
            //  || !Number.isInteger(req.body.phone)
    if(req.body.phone.length !== 10 || parseInt(req.body.phone)===NaN){
      res.status(200).json({success: false, "error": "Please enter your valid 10 digit phone number", cartClear: false})
      return
    }
    if(req.body.pincode.length !== 6 || parseInt(req.body.pincode)===NaN){
      res.status(200).json({success: false, "error": "Please enter your valid 6 digit pincode", cartClear: false})
      return
    }

    //initiaie an order corresponding to this order id 
    let order = new Order({
      email: req.body.email,
      orderId: req.body.oid,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      name: req.body.name,
      phone: req.body.phone,
      amount: req.body.subTotal,
      products: req.body.cart
    })
    await order.save()


    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
      key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = req.body.subTotal;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      await Order.findOneAndUpdate({orderId: req.body.oid}, {orderId: response.id})
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        success: true,
        cartClear: false,
      });
    } catch (err) {
      // console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
export default connectDb(Handler);
