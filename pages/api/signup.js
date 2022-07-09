import User from '../../models/User'
import connectDb from '../../middleware/mongoose'
var CryptoJS = require("crypto-js");

const Handler = async (req, res)=>{
    if(req.method ==='POST'){
        // console.log(req.body);
        const {name, email} = req.body
        let u = new User({name, email, password: CryptoJS.AES.encrypt(req.body.password, 'secret12321').toString()});
        await u.save();
        
        res.status(200).json({ success:"success" })
    }else{
        res.status(400).json({ error:"This method is not allowed" })
    }
}

export default connectDb(Handler);
  