// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from '../../models/User'
import connectDb from '../../middleware/mongoose'
import jsonwebtoken from 'jsonwebtoken'

const Handler = async (req, res)=>{
    if(req.method =='POST'){
        const token = req.body.token;
        const user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        const dbuser = await User.findOne({email: user.email});
        // console.log(dbuser);
        const {name, email, address, pincode, phone} = dbuser;
        res.status(200).json({name, email, address, pincode, phone})
    }else{
        res.status(404).json({ error: "error"})
    }
    
}
  
export default connectDb(Handler);
