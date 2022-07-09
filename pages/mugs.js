import React from 'react'
import Link from 'next/link'
import Product from '../models/Product'
import mongoose from 'mongoose'

const Mugs = ({products}) => {
  // console.log(products);
  return (
    <div className="min-h-screen">
      <section className="text-gray-400  body-font">
  <div className="container px-5 py-24 mx-auto">
    { products.length>0 ? <div className="flex flex-wrap -m-4 justify-center">
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
    : <div className="text-black title-font mx-8 text-lg flex flex-wrap -m-4 justify-center">Sorry!!! All Mugs are sold out,  no Mugs are available now.</div>}
  </div>
</section>
    </div>
  )
}

export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({category:'Mugs'})
  let mugs={}
    for(let item of products){
        if(item.title in mugs){
            if(!mugs[item.title].color.includes(item.color) && item.availablety > 0){
                mugs[item.title].color.push(item.color)
            }
            if(!mugs[item.title].size.includes(item.size) && item.availablety > 0){
                mugs[item.title].size.push(item.size)
            }
        }else{
            mugs[item.title] = JSON.parse(JSON.stringify(item))
            if(item.availablety > 0){
                mugs[item.title].color=[item.color]
                mugs[item.title].size=[item.size]
            }else{
              mugs[item.title].color=[]
                mugs[item.title].size=[]
            }
        }
    }

  return {
    props: {products: JSON.parse(JSON.stringify(mugs))},
  }
}

export default Mugs
