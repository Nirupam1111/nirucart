// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from '../../models/Order'
import Product from '../../models/Product'
import connectDb from '../../middleware/mongoose'
import crypto from 'crypto';

const handler = async (req, res)=>{
  try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_KEY)
			.update(sign.toString())
			.digest("hex");

		let order = '';
		if (razorpay_signature === expectedSign) {
      		order = await Order.findOneAndUpdate({orderId: req.body.razorpay_order_id}, {status: 'Paid', transactionid: req.body.razorpay_payment_id, paymentInfo: JSON.stringify(req.body)})
			let products = order.products;
			for(let slug in products){
				await Product.findOneAndUpdate({slug: slug}, {$inc: {availablety: -products[slug].qty}});
			}
		} else {
			order = await Order.findOneAndUpdate({orderId: req.body.razorpay_order_id}, {status: 'Pending', transactionid: req.body.razorpay_payment_id, paymentInfo: JSON.stringify(req.body)})
			// return res.status(400).json({ message: "Invalid signature sent!" });
		}
    	return res.redirect(`/order?id=${order._id}&clearCart=1`, 200);
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		// console.log(error);
	}
}

export default connectDb(handler);





