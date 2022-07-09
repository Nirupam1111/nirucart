import React, {useRef, useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image' 
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import {useRouter} from 'next/router'

const Navbar = ({logout, user, cart, addToCart, removeFromCart, clearCart, subTotal, saveCart}) => {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);

  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)

  const router = useRouter()
  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted = ['/checkout', '/order', '/orders', '/myaccount', '/signup', '/login', '/forgot', '/logout']
    if(exempted.includes(router.pathname)){
      setSidebar(false);
    }
  }, [])

  const toggleCart = () => {
    setSidebar(!sidebar);

    // if (ref.current.classList.contains('translate-x-full')){
    //   ref.current.classList.remove('translate-x-full')
    //   ref.current.classList.add('translate-x-0')
    // }
    // else if (!ref.current.classList.contains('translate-x-full')){
    //   ref.current.classList.remove('translate-x-0')
    //   ref.current.classList.add('translate-x-full')
    // }
  }
  const ref = useRef()

  return (
    <>
     <span>
          {dropdown && <div onMouseOver={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)} className="absolute bg-sky-100 right-14 rounded-md px-5 z-30 top-9 w-36">
          <ul>
            <Link href={"/myaccount"}><a><li className="py-1 hover:text-sky-800 text-sm">My Account</li></a></Link>
            <Link href={"/orders"}><a><li className="py-1 hover:text-sky-800 text-sm">My Orders</li></a></Link>
            <Link href={"/"}><a><li onClick={logout} className="py-1 hover:text-sky-800 text-sm">Logout</li></a></Link>
          </ul>
        </div>}     
        </span>

    <div style={{backgroundColor: '#f5f5f0'}} className={`shadow-xl flex flex-col py-2 md:flex-row md:justify-start justify-center relative items-center top-0 z-10 ${!sidebar && 'overflow-hidden'}`}>
      <div className="logo mr-auto md:mx-5">
        <Link href={'/'}><a><Image src="/nirucart.jpg" alt="" width="100" height="70" /></a></Link>
      </div>
        <div className="nav">
          <ul className="flex md:text-md items-center space-x-4 font-bold">
              <Link href={'/tshirts'}><a><li>TShirts</li></a></Link>
              <Link href={'/hoodies'}><a><li>Hoodies</li></a></Link>
              <Link href={'/stickers'}><a><li>Stickers</li></a></Link>
              <Link href={'/mugs'}><a><li>Mugs</li></a></Link>              
          </ul>
      </div>
      <div className="cursor-pointer items-center cart absolute right-0 top-4 mx-5 flex">  
        {!user.value && <Link href={'/login'}><a><button className="bg-sky-600 px-2 py-1 rounded-md text-sm text-white mx-2">Login</button></a></Link>}
        <span onMouseOver={()=>setDropdown(true)}  onMouseLeave={()=>setDropdown(false)}>
        {user.value && <MdAccountCircle className="text-xl md:text-2xl mx-2" />}    
        </span>
        <AiOutlineShoppingCart onClick={toggleCart} className="text-xl md:text-2xl" />
      </div>

      <div ref={ref} className={`z-50 w-72 h-[100vh] sideCart overflow-y-scroll absolute bg-sky-100 top-0 p-10 px-8 transition-all ${sidebar ?'right-0': '-right-96'}`}>
      <h2 className="text-center text-xl font-bold">Shopping Cart</h2>
      <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-sky-500"><AiFillCloseCircle /></span>
      <ol className="list-decimal font-semibold">
        {Object.keys(cart).length==0 && <div className="my-4 font-normal">No items in the Cart</div>}
        {Object.keys(cart).map((k)=>{return <li key={k}>
          <div className="item flex my-3">
          {(cart[k].size) ? <div className="w-2/3 flex font-semibold">{cart[k].name}({cart[k].size}/{cart[k].varient})</div> : <div className="w-2/3 flex font-semibold">{cart[k].name}</div>}
          <div className="flex ml-2 justify-end w-1/3 font-semibold"><AiFillPlusCircle onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient)}} className="my-1 cursor-pointer text-sky-500" /><span className="mx-2 mt-0">{cart[k].qty}</span><AiFillMinusCircle onClick={()=>{removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].varient)}} className="my-1 cursor-pointer text-sky-500" /></div>
          </div>
        </li>})}
      </ol>
      <span className="font-bold total">Subtotal:{subTotal}</span>
      <div className="flex">
      <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} onClick={saveCart} className="flex mr-2 text-white bg-sky-500 disabled:bg-sky-300 border-0 py-2 px-2 focus:outline-none hover:bg-sky-600 rounded text-sm"><BsFillBagCheckFill className="mx-2 m-1" />Checkout</button></Link>
        <button onClick={clearCart} disabled={Object.keys(cart).length === 0} className="flex mr-2 text-white bg-sky-500 disabled:bg-sky-300 border-0 py-2 px-4 focus:outline-none hover:bg-sky-600 rounded text-sm">Clear Cart</button>
      </div>

    </div>
    </div>
    </>
  )
}

export default Navbar
