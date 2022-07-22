import React, {useState, useEffect} from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Link from 'next/link'
import {useRouter} from 'next/router'

const Checkout = ({cart, user, clearCart, addToCart, removeFromCart, subTotal}) => {
  const router = useRouter();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [showPinMessage, setShowPinMessage] = useState(0)
  // const [disabled, setDisabled] = useState(false)
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const handleChange = async (e)=>{
    if(e.target.name == 'name'){
      setName(e.target.value)
    }else if(e.target.name == 'email'){
      setEmail(e.target.value)
    }else if(e.target.name == 'phone'){
      setPhone(e.target.value)
    }else if(e.target.name == 'address'){
      setAddress(e.target.value)
    }else if(e.target.name == 'pincode'){
      setPincode(e.target.value)
      if(e.target.value.length == 6){
        getPincode(e.target.value)
      }else{
        setState('');
        setCity('');
      }
    }
  }

  useEffect(() => {
    let myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      alert("Please login to your account, to order something...");
      router.push("/");
    }
    if (myuser && myuser.token) {
      fetchData(myuser.token);
    }
  }, [])

  useEffect(() => {
    if(state.length<1 && pincode.length !== 0){
      setShowPinMessage(1);
    }else{
      setShowPinMessage(0)
    }
  })

  const fetchData = async (token) => {
    let data = { token: token };
    const a = await fetch(`/api/getuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);
    setName(res.name);
    setAddress(res.address);
    setPincode(res.pincode);
    setPhone(res.phone);
    if(res.pincode !== ""){
      getPincode(res.pincode);
    }
  };

  const getPincode = async (pin)=>{
    let pins = await fetch(`/api/pincode?pin=${pin}`)
    let pinJson = await pins.json()
    // if(Object.keys(pinJson).includes(pin)){
    //   setCity(pinJson[pin][0])
    //   setState(pinJson[pin][1])
    // }
      // console.log(pinJson);
      setCity(pinJson.Division)
      setState(pinJson.State)
  }

  const makePayment = async () => {
    let oid = Math.floor(Math.random() *Date.now())
    // console.log("here...");
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    // Make API call to the serverless API
    const data = await fetch(`/api/pretransaction`, 
    { method: "POST",
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({subTotal, cart, oid, email: user.email, name, address, pincode, phone, city, state})
     }).then((t) =>
      t.json()
    );
    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
      name: "nirucart.com",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank you for purchasing",
      callback_url: `/api/posttransaction`,
      prefill: {
        name: "nirucart.com",
        email: "nirupamsur10@gmail.com",
        contact: "9476467259",
      },
    };
    if(data.success){
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }else{
      if(data.cartClear){
        clearCart();
      }
      alert(data.error);
    }
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  return (
    <div className="container m-auto min-h-screen">
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-bold text-xl mx-4 my-4">1. Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
        <div className="mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
          <input placeholder="Enter Your Name" onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        { user && user.value 
          ? <input value={user.email} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} /> 
          : <input value={email} onChange={handleChange} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          
        }
      </div>
        </div>
        </div>
        <div className="px-2 w-full">
        <div className="mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea onChange={handleChange} value={address} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" cols="30" rows="2"></textarea>
      </div>
    </div>
    <div className="mx-auto flex">
        <div className="px-2 w-1/2">
        <div className="mb-4">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
          <input placeholder="Enter 10 digit Phone Number" onChange={handleChange} value={phone} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
        <input placeholder="Enter Your Zipcode" onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        {showPinMessage === 0 ? "" : <p className="text-pink-600 text-sm">This Pincode is not Available</p>}
      </div>
        </div>
        </div>
        <div className="mx-auto flex">
        <div className="px-2 w-1/2">
        <div className="mb-4">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
          <input onChange={handleChange} value={city} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
        <input onChange={handleChange} value={state} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
        </div>
        </div>
        <h2 className="font-bold text-xl mx-4 my-4">2. Review Cart Items & Pay</h2>

        <div className="sideCart bg-sky-100 p-8 mb-20 m-4 px-8">
      <ol className="list-decimal font-semibold">
        {Object.keys(cart).length==0 && <div className="my-4 font-normal">No items in the Cart</div>}
        {Object.keys(cart).map((k)=>{return <li key={k}>
          <div className="item sm:w-full lg:w-96 flex flex-row my-3">
          {cart[k].size ? <div className="font-semibold w-1/3 flex">{cart[k].name} ({cart[k].size}/{cart[k].varient})</div> : <div className="font-semibold w-1/3 flex">{cart[k].name}</div>}
          <div className="flex justify-end w-2/3 font-semibold"><AiFillPlusCircle onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} className="cursor-pointer text-sky-500" /><span className="mx-3">{cart[k].qty}</span><AiFillMinusCircle onClick={()=>{removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} className="cursor-pointer text-sky-500" /></div>
          </div>
        </li>})}
      </ol>
      <span className="font-bold total">Subtotal:{subTotal}</span>
      <div className="mx-4">
      <Link href={'/checkout'}><button disabled={true ? (state.length<=0 || phone.length<=0 || address.length<=0):false} onClick={makePayment} className="disabled:bg-sky-300 flex mr-2 text-white bg-sky-500 border-0 py-2 px-2 focus:outline-none hover:bg-sky-600 rounded text-sm"><BsFillBagCheckFill className="mx-2 m-1" />Pay Now</button></Link>
      </div>
    </div>
    </div>
  )
}
export default Checkout
