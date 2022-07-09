// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from '../../models/User'
import connectDb from '../../middleware/mongoose'
import jsonwebtoken from 'jsonwebtoken'
var CryptoJS = require("crypto-js");

const Handler = async (req, res)=>{
    if(req.method =='POST'){
        const token = req.body.token;
        const user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        const findUser = await User.findOne({email: user.email});
        const bytes  = CryptoJS.AES.decrypt(findUser.password, 'secret12321');
        let decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        if(req.body.password == decryptedData && req.body.npassword == req.body.cpassword){
            const dbuser = await User.findOneAndUpdate({email: user.email}, {password: CryptoJS.AES.encrypt(req.body.cpassword, 'secret12321').toString()});
            res.status(200).json({success: true});
        }else{
            res.status(200).json({success: false});
        }
    }else{
        res.status(404).json({ error: "error"})
    }
       
}
  
export default connectDb(Handler);
