import React from 'react'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router'

const signup = () => {
  const router = useRouter();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e)=>{
    if(e.target.name === 'name'){
      setName(e.target.value)
    }else if(e.target.name === 'email'){
      setEmail(e.target.value)
    }else if(e.target.name === 'password'){
      setPassword(e.target.value)
    }
  }

  useEffect(() => {
    if(localStorage.getItem("myuser")){
      router.push('/')
    }
  }, [])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const data = {name, email, password}

    let res = await fetch(`/api/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    let response = await res.json()
    // console.log(response);

    setName('')
    setEmail('')
    setPassword('')
    if(response.success == 'success') {
      toast.success('Your account has been created!!! Please Login with your email and password', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        setTimeout(() => {
          router.push('/')
        }, 2000);
    }else{
      toast.error("Oops!!! Something went wrong. Try again", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }  
  }

  return (
       <div>
         <ToastContainer
      position="bottom-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      <form onSubmit={handleSubmit} method="POST" className="text-gray-600 bg-gray-100 body-font">
  <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
    <div className="lg:w-2/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 m-auto">
      <img src="nirucart.jpg" alt="" />
      <h1 className="title-font font-medium text-3xl text-gray-900">nirucart.com</h1>
      <p className="leading-relaxed mt-4">Hey, why are u waiting, signup now to get premium quality t-shirts, hoodies, stickers, mugs and many more...</p>
    </div>
    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 lg:mr-8">
      <h2 className="text-gray-900 text-lg font-medium title-font ">Sign Up to New Account</h2>
      <Link href={'/login'}><span className="cursor-pointer float-right pb-2 text-sky-600">or Log In</span></Link>
      <div className="relative mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input value={name} onChange={handleChange} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input value={email} onChange={handleChange} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
        <input value={password} onChange={handleChange} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      <button type="submit" className="text-white bg-sky-500 border-0 py-2 px-8 focus:outline-none hover:bg-sky-600 rounded text-lg">Button</button>
    </div>
  </div>
</form>
    </div>
  )
}

export default signup
