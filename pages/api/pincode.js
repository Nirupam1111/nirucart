import pincodes from "../../pincodes.json"

export default async function Handler(req, res) {

    let reqPin = req.query.pin;

    let pins = await fetch(`https://api.postalpincode.in/pincode/${reqPin}`)
    let pinJson = await pins.json()
    // console.log(pinJson);

    let myResult = "";
    if(pinJson[0].PostOffice == null){
        myResult = {Division: "", State: ""}
    }else{
        let x = pinJson[0].PostOffice[0];
        myResult = {Division: x.Division, State: x.State}
    }
    // let pincode = pincodes;
    res.status(200).json(myResult)
}
