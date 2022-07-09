import React, { useState, useEffect } from "react";
import {ToastContainer, toast} from 'react-toastify'
import {useRouter} from 'next/router'
import 'react-toastify/dist/ReactToastify.css';

const myaccount = ({ user }) => {
  const router = useRouter();
  useEffect(() => {
    // console.log(user);
    let myuser = JSON.parse(localStorage.getItem("myuser"));
    if (!myuser) {
      router.push("/");
    }
    if (myuser && myuser.token) {
      fetchData(myuser.token);
    }
  }, []);

  const fetchData = async (token) => {
    let data = { token: token };
    const a = await fetch(`/api/getuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);
    setName(res.name);
    setAddress(res.address);
    setPincode(res.pincode);
    setPhone(res.phone);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [npassword, setNpassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
    }  else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    }
    setTimeout(() => {
      if (user) {
        if (
          name.length > 3 &&
          phone.length > 3 &&
          address.length > 3 &&
          pincode.length > 3
        ) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      } else {
        if (
          name.length > 3 &&
          email.length > 3 &&
          phone.length > 3 &&
          address.length > 3 &&
          pincode.length > 3
        ) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      }
    }, 100);
  };

  const handleUserSubmit = async () => {
    let data = { token: user.value, name, phone, pincode, address };
    const a = await fetch(`/api/updateuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    toast.success('Your Details are successfully Updated', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  const handlePasswordSubmit = async () => {
    let data = { token: user.value, password, npassword, cpassword };
    const a = await fetch(`/api/updatepassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if(res.success){
      toast.success('Your Password is successfully Updated', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else{
      toast.error("Invalid credentials, please try again", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    setPassword('');
    setNpassword('');
    setCpassword('');
  };

  return (
    <div className="container lg:mx-auto md:mx-2 min-h-screen my-9">
      <ToastContainer
      position="bottom-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      <h1 className="text-3xl my-8 text-center font-bold">Update your Account</h1>

      <h2 className="font-bold text-xl m-4">1. Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              placeholder="Enter Your Name"
              onChange={handleChange}
              value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email (Can't be Updated)
            </label>
            {user && user.value ? (
              <input
                value={user.email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                readOnly={true}
              />
            ) : (
              <input
                value={email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            )}
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            onChange={handleChange}
            value={address}
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            cols="30"
            rows="2"
          ></textarea>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              placeholder="Enter New 10 digit Phone Number"
              onChange={handleChange}
              value={phone}
              type="text"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
              placeholder="Enter New Zipcode"
              onChange={handleChange}
              value={pincode}
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleUserSubmit}
        className="disabled:bg-sky-300 flex m-2 text-white bg-sky-500 border-0 py-2 px-2 focus:outline-none hover:bg-sky-600 rounded text-sm"
      >
        Submit
      </button>

      <h2 className="font-bold text-xl m-4">2. Change Password</h2>
      <div className="mx-auto flex">
      <div className="px-2 w-full">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              placeholder="Enter Old Password"
              onChange={handleChange}
              value={password}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              cols="30"
              rows="2"
            />
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label
              htmlFor="npassword"
              className="leading-7 text-sm text-gray-600"
            >
              New Password
            </label>
            <input
              placeholder="Enter New Password"
              onChange={handleChange}
              value={npassword}
              type="password"
              id="npassword"
              name="npassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              cols="30"
              rows="2"
            />
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label
              htmlFor="cpassword"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <input
              placeholder="Enter Password Again"
              onChange={handleChange}
              value={cpassword}
              type="password"
              id="cpassword"
              name="cpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              cols="30"
              rows="2"
            />
          </div>
        </div>
      </div>
      <button onClick={handlePasswordSubmit} className="disabled:bg-sky-300 flex m-2 text-white bg-sky-500 border-0 py-2 px-2 focus:outline-none hover:bg-sky-600 rounded text-sm">
        Submit
      </button>
    </div>
  );
};

export default myaccount;
