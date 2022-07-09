import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import Order from "../models/Order";
import mongoose from "mongoose";

const MyOrder = ({order, clearCart}) => {
  let router = useRouter();
  useEffect(() => {
    if(!router.query.id){
      router.push('/')
    }
  }, [])
  const products = order.products;
  // console.log(products);

  useEffect(() => {
    if(router.query.clearCart == 1){
      clearCart();
    }
  }, [])

  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">NIRUCART.COM</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
        <p className="leading-relaxed mb-2">Your Order has been sucessfully placed.</p>
         <p  className="font-semibold leading-relaxed mb-4">Your payment status is <span className="text-sky-600">{order.status}</span></p>
         <p className="leading-relaxed mb-2">Order placed on: {order.createdAt}.</p>
        <div className="flex my-8 mb-4">
          <a className="flex-grow border-b-2 py-2 text-lg px-1">Description</a>
          <a className="flex-grow border-b-2   py-2 text-lg px-30">Quantity</a>
          <a className="flex-grow border-b-2   py-2 text-lg px-15">Item Total</a>
        </div>
        {Object.keys(products).map((key)=>{
          return <div key={key} className="flex border-t border-gray-200 py-2">
          {products[key].size ? <span className="text-gray-500">{products[key].name}({products[key].size}/{products[key].varient})</span> : <span className="text-gray-500">{products[key].name}</span>}
          <span className="m-auto text-gray-900">{products[key].qty}</span>
          <span className="m-auto text-gray-900">₹{products[key].price} x {products[key].qty} = {(products[key].price)*(products[key].qty)}</span>
        </div>
        })}
        <div className="my-8 flex">
          <span className="title-font font-medium text-2xl text-gray-900">₹{order.amount}</span>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://cdn.pixabay.com/photo/2012/04/14/16/20/t-shirt-34481_960_720.png" />
    </div>
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let order = '';
  if(context.query.id){
    order = await Order.findById(context.query.id)
  }else{
    order = {products: ""};
  }

  return {
    props: {order: JSON.parse(JSON.stringify(order))}
  }
}

export default MyOrder
