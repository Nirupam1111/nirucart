import React from 'react'
import Link from 'next/link'

const Shippingpolicy= () => {
  return (
    <div className="min-h-screen">
      <section className="text-gray-600 body-font">
    <div className="mt-20 flex flex-col items-center text-center w-full">
      <h1 className="sm:text-3xl text-3xl font-medium title-font mb-4 text-gray-600">Shipping Policy
      </h1>
      </div>
    <div className="mr-20 mb-8 ml-20">
    <p className="mb-2">
    Thank you for visiting and shopping at Our Website. Following are the terms and conditions that constitute our Shipping Policy.
    </p>
  </div>  
      <h1 className="sm:text-3xl text-3xl ml-20 font-medium title-font mb-4 text-gray-500">Domestic Shipping Policy
      </h1>
      <h1 className="sm:text-xl text-xl ml-20 font-medium title-font mb-4 text-gray-500">Shipment processing time
      </h1>
      <div className="mr-20 mb-8 ml-20">
    <p  className="mb-2">
    All orders are processed within 2-3 business days. Orders are not shipped or delivered on
    weekends or holidays.
    </p>
    <p className="mb-2">
    If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please
    allow additional days in transit for delivery. If there will be a significant delay in shipment of your
    order, we will contact you via email or telephone.
      </p>
  </div>  
  <h1 className="sm:text-xl text-xl ml-20 font-medium title-font mb-4 text-gray-500">Shipping rates and delivery estimates
      </h1>
      <div className="mr-20 mb-8 ml-20">
    <p className="mb-2">
    Shipping charges for your order will be calculated and displayed at checkout.
    </p>

    <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">                
                <thead className="bg-white border-b">
                  <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Shipment method
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Estimated delivery time 
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      Shipment cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Standard</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    3-5 business days
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     Free
                    </td>
                  </tr>
                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Two Days</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    2 business days
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     Free
                    </td>
                  </tr>
                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Overnight *</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    1-2 business days
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     Free
                    </td>
                  </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    <p className="mb-2 mt-4">
    * Overnight delivery is only available for orders with delivery addresses within West Bengal.
      </p>
      <p className="mb-2">Delivery delays can occasionally occur.</p>
  </div> 

  <h1 className="sm:text-xl text-xl ml-20 font-medium title-font mb-4 text-gray-500">Shipment confirmation and Order tracking
      </h1>
      <div className="mr-20 mb-8 ml-20">
    <p  className="mb-2">
    You will receive a Shipment Confirmation email once your order has shipped containing your
    tracking number. The tracking number will be active within 24 hours.
    </p>
  </div> 

  <h1 className="sm:text-xl text-xl ml-20 font-medium title-font mb-4 text-gray-500">Customs, Duties and Taxes
      </h1>
      <div className="mr-20 mb-8 ml-20">
    <p  className="mb-2">
    Our Website is not responsible for any customs and taxes applied to your order. All
    fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
    </p>
  </div> 

  <h1 className="sm:text-xl text-xl ml-20 font-medium title-font mb-4 text-gray-500">Damages
      </h1>
      <div className="mr-20 mb-8 ml-20">
    <p  className="mb-2">
    Our Website is not liable for any products damaged or lost during shipping. If you
    received your order damaged, please contact the shipment carrier to file a claim.
    </p>
    <p className="mb-2">
    Please save all packaging materials and damaged goods before filing a claim.
      </p>
  </div> 

  <div className="mt-20 w-full">
      <h1 className="sm:text-3xl text-3xl ml-20 font-medium title-font mb-4 text-gray-500">International Shipping Policy
      </h1>
      </div>
    <div className="mr-20 mb-8 ml-20">
    <p className="mb-2">
    We currently do not ship outside the I.N.
    </p>
    </div>  

  <div className="mt-20 w-full">
      <h1 className="sm:text-3xl text-3xl ml-20 font-medium title-font mb-4 text-gray-500">Returns Policy
      </h1>
      </div>
    <div className="mr-20 mb-8 ml-20">
    <p className="mb-2">
    Our <Link href="/returnpolicy"><a className="text-gray-900 text-md">Refund and Cancellation Policy</a></Link> provides detailed information about options and procedures for
    returning your order.
    </p>
  </div>  

</section>
      </div>
  )
}

export default Shippingpolicy
