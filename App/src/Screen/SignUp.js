import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  let [address, setAddress] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
    let latLong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    // console.log(latLong)
    let [lat, long] = latLong
    console.log(lat, long)
    const response = await fetch("http://localhost:5000/api/auth/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latLong: { lat, long } })

    });
    const { location } = await response.json()
    console.log(location);
    setAddress(location);
    setCredentials({ ...credentials, [e.target.name]: location })
  }


  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/GoHunger/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    console.log(json);

    if(!json.success) alert("Enter Valid credentials");

    if(json.success){
      localStorage.setItem('token', json.authToken)
      navigate("/login")
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div style={{ backgroundImage: 'url("https://bit.ly/imgUrl")', backgroundSize: 'cover',height: '100vh' }}>
        <div>
          <Navbar></Navbar>
        </div>
        <div className="container">
        <form className='w-50 m-auto mt-5 border bg-dark border-danger rounded' onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter your name" />
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="enter your email"/>
            </div>
            <div className="m-3">
              <label htmlFor="address" className="form-label">Address</label>
              <fieldset>
                <input type="text" className="form-control" name='address' placeholder='Click below for your current address' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
              </fieldset>
            </div>
            <div className="m-3">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-danger">Current Location </button>
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' placeholder="Create the password" />
            </div>
            <button type="submit" className="m-3 btn btn-danger">Submit</button>
            <Link to="/login" className="m-3 mx-1 btn btn-primary">Already a user</Link>
          </form>
        </div>
      </div>
    </>
  );
}
