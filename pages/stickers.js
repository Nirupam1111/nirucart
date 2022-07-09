import React from 'react'
import Link from 'next/link'
import Product from '../models/Product'
import mongoose from 'mongoose'

const stickers = ({products}) => {
  // console.log(products);
  return (
    <div className="min-h-screen">
      <section className="text-gray-400  body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
      {Object.keys(products).map((item)=>{ return <Link key={products[item]._id} passhref={true} href={`/product/${products[item].slug}`}><div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg">
        <a className="block relative rounded overflow-hidden">
          <img alt="ecommerce" className="m-auto md:m-0 h.[30vh] md:h.[36vh]" src={`${products[item].img}`} />
        </a>
        <div className="text-center">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
          <h2 className="text-black title-font text-lg font-medium">{products[item].title}</h2>
          <p className="mt-1">₹{products[item].price}</p>
        </div>
      </div>
      </Link>})}
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
  let products = await Product.find({category:'Stickers'})
  let stickers={}
    for(let item of products){
        if(item.title in stickers){
            if(!stickers[item.title].color.includes(item.color) && item.availablety > 0){
                stickers[item.title].color.push(item.color)
            }
            if(!stickers[item.title].size.includes(item.size) && item.availablety > 0){
                stickers[item.title].size.push(item.size)
            }
        }else{
            stickers[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availablety > 0){
                stickers[item.title].color=[item.color]
                stickers[item.title].size=[item.size]
            }else{
              stickers[item.title].color=[]
                stickers[item.title].size=[]
            }
        }
    }

  return {
    props: {products: JSON.parse(JSON.stringify(stickers))},
  }
}

export default stickers
