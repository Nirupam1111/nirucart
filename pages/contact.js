import React from 'react'

const contact = () => {
  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col items-center text-center w-full mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Lets talk about everything!
      </h1>
      <img className="rounded-full" width="200" height="200" src="/nirucart.jpg" alt="" />
      <h1 className="sm:text-xl text-2xl font-medium title-font mb-4 text-gray-900">Feel free to ask us anything!
      </h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">If you have any questions regarding your order, feel free to send email, call or Whatsapp us on our support number
      </p>
    </div>
    <div className="flex flex-wrap">
      <div className="xl:w-2/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Corporate Address</h2>
        <p className="leading-relaxed text-base mb-2">nirucart</p>
        <p className="leading-relaxed text-base mb-2">16, Uttar Jianda</p>
        <p className="leading-relaxed text-base mb-4">Panskura, West Bengal, 721151</p>
      </div>
      <div className="xl:w-2/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
      <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Customer Support</h2>
        <p className="leading-relaxed text-base mb-2">Call/Whatsapp: +91 8609036139</p>
        <p className="leading-relaxed text-base mb-2">Email: nirupamsur10@gmail</p>
        <p className="leading-relaxed text-base mb-4">Morning: 9AM - 6PM</p>
      </div>
    </div>
  </div>
</section>
      </div>
  )
}

export default contact
