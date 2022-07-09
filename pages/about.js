import React from 'react'
import Link from 'next/link'

const about = () => {
  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col items-center text-center w-full mb-20">
      <img  className="rounded-full" width="200" height="200" src="/nirucart.jpg" alt="" />
      <h1 className="sm:text-2xl text-3xl font-medium title-font mb-4 text-gray-900">Welcome to nirucart.com
      </h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
      This website is an attempt to deliver amazing products at a good and reasonable price. This entire website was built by me, a new web-developer as a NextJs project. This website is powerd by NextJs + React + MongoDB for storing the data. For the server side logic, we use NextJs built in SSR. And the Project is inspired by Youtube vidio, Channel name 'CodeWithHarry'. If you are curious enough to find how this website was build, checkout Nextjs playlist from CodeWithHarry on YouTube and if you are not, buy yourself a trendy geek Tshirt from nirucart :) !
      </p>
    </div>
    <a href="/tshirts" className="flex mx-auto mt-16 text-white bg-sky-500 w-40 border-0 py-2 px-8 focus:outline-none hover:bg-sky-600 rounded text-lg"><span className="text-sm">Start Shopping</span></a>

    <div className="mt-20 w-full">
    <h1 className="sm:text-2xl text-3xl font-medium title-font mb-4 text-gray-900">About nirucart</h1>
    <p className="">
    nirucart.com is an attempt to serve the people of india with unique designs on apparels. E-commerce is revolutionizing the way we all shop in India. Why do you want to hop from one store to another in search of your favorite geek hoodie when you can find it on the Internet in a single click? Not only hoodies, we also have a wide variety of stickers, mugs and other apparels!</p>
    <p>
      If you are wondering why you should shop from nirucart when there are multiple options available to you, our unique designs and quality products will answer your question.
      </p>
    </div>
  </div>  
</section>
      </div>
  )
}

export default about
