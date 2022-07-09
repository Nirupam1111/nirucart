import pincodes from "../../pincodes.json"

export default function Handler(req, res) {

    let pincode = pincodes;
    res.status(200).json(pincode)
}
