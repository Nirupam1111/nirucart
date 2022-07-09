import { useRouter } from 'next/router'
import {useState, useEffect } from 'react'
import mongoose from 'mongoose'
import Product  from '../../models/Product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error'
import Image from 'next/image'

const Post = ({addToCart,buyNow,product,variants, error}) => {
  // console.log(product, variants);
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [service, setService] = useState()
  
  const [color, setColor] = useState()
  const [size, setSize] = useState()
  useEffect(() => {
    if(!error){
      setColor(product.color)
      setSize(product.size)
    }
  }, [router.query])
  
 
  const checkServiceability = async ()=>{
    let pins = await fetch(`${process.env.PORT}/api/pincode`)
    let pinJson = await pins.json()
    if(Object.keys(pinJson).includes(pin)){
      setService(true)
      toast.success('Your pincode is serviceble', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else{
      setService(false)
      toast.error('Sorry!!! Your pincode is not serviceble', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  }

  const onChangePin = (e)=>{
    setPin(e.target.value)
  }

  const refreshVariants=(newcolor, newsize)=>{
    let url = `${process.env.PORT}/product/${variants[newcolor][newsize]['slug']}`;
    router.push(url);
  }

  if (error == 404) {
    return <Error statusCode={404} />
  }
 
  return <>
    <section className="text-gray-600 body-font min-h-screen overflow-hidden">
    <ToastContainer position="bottom-center" autoClose={1000} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

  <div className="container px-5 py-16 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded" src={product.img} />
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">nirucart</h2>
        {(product.category == 'Tshirts' || product.category == 'Hoodies') ? <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1> : <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>}

        <p className="leading-relaxed">{product.desc}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          {(product.category == 'Tshirts' || product.category == 'Hoodies') && <div className="flex">
            <span className="mr-3">Color</span>
            {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={()=>{refreshVariants('red', size)}} className="border-2 border-gray-300 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
            {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={()=>{refreshVariants('green', size)}} className="border-2 border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
            {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={()=>{refreshVariants('blue', size)}} className="border-2 border-gray-300 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
            {Object.keys(variants).includes('yellow') && Object.keys(variants['yellow']).includes(size) && <button onClick={()=>{refreshVariants('yellow', size)}} className="border-2 border-gray-300 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
            {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={()=>{refreshVariants('white', size)}} className="border-2 border-gray-300 bg-white rounded-full w-6 h-6 focus:outline-none"></button>}
            {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={()=>{refreshVariants('black', size)}} className="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
          </div>}
          {(product.category == 'Tshirts' || product.category == 'Hoodies') && <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select value={size} onChange={(e)=>{refreshVariants(color, e.target.value)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-500 text-base pl-3 pr-10">
                {color && Object.keys(variants[color]).includes("S") && <option value={'S'}>S</option>}
                {color && Object.keys(variants[color]).includes("M") && <option value={'M'}>M</option>}
                {color && Object.keys(variants[color]).includes("L") && <option value={'L'}>L</option>}
                {color && Object.keys(variants[color]).includes("XL") && <option value={'XL'}>XL</option>}
                {color && Object.keys(variants[color]).includes("XXL") && <option value={'XXL'}>XXL</option>}
                
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>}
        </div>
        <div className="flex">
        {product.availablety<=0
          ?<span className="title-font font-medium text-2xl text-gray-900">Out of Stock!!!</span>
          :<span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
        }
          <button disabled={product.availablety<=0?true:false} onClick={()=>{buyNow(slug, 1, product.price, product.title, size, color)}}className="disabled:bg-sky-300 flex ml-4 text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded">Buy Now</button>
          <button disabled={product.availablety<=0?true:false} onClick={()=>{addToCart(slug, 1, product.price, product.title, size, color)}} className="disabled:bg-sky-300 flex ml-8 text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded">Add to Cart</button>
         
        </div>
        <div className="pin mt-6 flex space-x-2 text-sm">
          <input placeholder="Enter Your pincode" onChange={onChangePin} className="px-2 border-2 border-gray-400 rounded" type="text" />
          <button onClick={checkServiceability} className="flex ml-14 text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-sky-600 rounded">Check</button>
        </div>
        {(!service && service != null) &&<div className="text-red-700 text-sm mt-3">
          Sorry! we don't deliver to this pincode yet
        </div>}
        {(service && service != null) &&<div className="text-green-700 text-sm mt-3">
          Yay! This pincode is serviceble
        </div>}
      </div>
    </div>
  </div>
</section>
  </>
}

export async function getServerSideProps(context) {
  let error = null;
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({slug: context.query.slug})
  if(product == null){
    return {
      props: {error: 404}
    }
  }  
  let variants= await Product.find({title: product.title, category: product.category})
  let colorSizeSlug={}
  for(let item of variants){
    if(Object.keys(colorSizeSlug).includes(item.color)){
      colorSizeSlug[item.color][item.size]={slug: item.slug}
    }else{
      colorSizeSlug[item.color]={}
      colorSizeSlug[item.color][item.size]={slug: item.slug}
    }
  }

  return {
    props: {error: error, product: JSON.parse(JSON.stringify(product)),
                variants: JSON.parse(JSON.stringify(colorSizeSlug))}
  }
}

export default Post
