import Head from 'next/head'
import Image from 'next/image'
import {FaTshirt, FaShippingFast} from 'react-icons/fa';
import {MdLocalOffer} from 'react-icons/md';
import Script from 'next/script'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* <Head>
        <title>nirucart - wear the code</title>
        <meta name="descript ion" content="nirucart.com - wear the code" />
        <link rel="icon" href="/favicon.jpg" />
      </Head> */}

      {/* <Navbar /> */}
      <div className="flex flex-wrap m-8 mt-8 mb-20 sm:flex-col lg:flex-row items-center text-center">
      <div className="lg:w-1/2">
        <p className="m-8 text-center text-2xl font-mono leading-10 font-bold">"Hey developers, now get your favourite ecessories here on <span className="text-3xl text-sky-500"><a href="/">nirukart.com</a></span>." </p>
        </div>
        <div className="lg:w-1/2">
        <img className="" src="/home.jpg" alt="" />
        </div>
      </div>

      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <h1 className="text-gray-900 font-bold text-4xl title-font">Our Latest Collections</h1>
    <div className="h-1 w-60 bg-sky-500 mb-8 mt-2 rounded"></div>
    <div className="flex flex-wrap w-full mb-20 flex-row items-center text-center">
      <div className="bg-gray-100 sm:w-1/2 lg:w-3/12 border-solid m-auto mb-20 border-2 border-sky-200 cursor-pointer p-4 rounded-lg"><a href="/product/git-hub-black-XL"><img className="rounded h-80 w-full object-contain object-top mb-6" src="/images/git-hub-black.jpg" alt="content" /><h3 className="tracking-widest text-sky-500 text-xs font-medium title-font">Tshirts</h3><h2 className="text-lg text-gray-900 font-medium title-font mb-4">Img Src (XL/black)</h2><p className="leading-relaxed text-base">Available in multiple sizes</p></a>
      </div>
      <div className="bg-gray-100  sm:w-1/2 lg:w-3/12 border-solid border-2 border-sky-200 cursor-pointer p-4 m-auto mb-20 rounded-lg"><a href="/product/hprogrammer-blue-XXL"><img className="rounded h-80 w-full object-contain object-top mb-6" src="/images/hprogrammer-blue.jfif" alt="content" /><h3 className="tracking-widest text-sky-500 text-xs font-medium title-font">Hoodies</h3><h2 className="text-lg text-gray-900 font-medium title-font mb-4">Img Src (XXL/blue)</h2><p className="leading-relaxed text-base">Available in multiple sizes</p></a>
      </div>
      <div className="bg-gray-100  sm:w-1/2 lg:w-3/12 border-solid border-2 border-sky-200 cursor-pointer p-4 m-auto mb-20 rounded-lg"><a href="/product/binary-tree-white-XL"><img className="rounded h-80 w-full object-contain object-top mb-6" src="/images/binary-tree-white.jpg" alt="content" /><h3 className="tracking-widest text-sky-500 text-xs font-medium title-font">Tshirts</h3><h2 className="text-lg text-gray-900 font-medium title-font mb-4">Img Src (XL/white)</h2><p className="leading-relaxed text-base">Available in multiple sizes</p></a>
      </div>
    </div>

    <div className="flex flex-wrap -m-4">
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-sky-100 text-sky-500 mb-4">
            <FaTshirt />
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Premium Tshirts</h2>
          <p className="leading-relaxed text-base">Our T-Shirts are 100% made of cotton.</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-sky-100 text-sky-500 mb-4">
            <FaShippingFast />
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Free Shipping
          </h2>
          <p className="leading-relaxed text-base">We ship all over India for FREE.
            </p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-sky-100 text-sky-500 mb-4">
            <MdLocalOffer />
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Exciting Offers
          </h2>
          <p className="leading-relaxed text-base">We provide amazing offers & discounts on our products.</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* <Footer /> */}

    </div>
  )
}
