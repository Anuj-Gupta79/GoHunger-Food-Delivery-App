import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://go-hunger-backend-e2cn.onrender.com/GoHunger/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (!json.success) alert("Enter Valid credentials");
    if (json.success){
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken);
      // console.log(localStorage.getItem("authToken"));
      navigate('/');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return(
    <>
      <div style={{backgroundImage: 'url("https://bit.ly/imgUrl")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div className='container'>
        <form className='w-50 m-auto mt-5  bg-dark  rounded' style={{border:"2px solid #168794"}}  onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter your email"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' placeholder="Enter your password" />
          </div>
          <button type="submit" className="m-3 btn" style={{background:"#168794"}}>Submit</button>
          <Link to="/signup" className="m-3 mx-1 btn btn-danger">Create an account !</Link>
        </form>

      </div>
    </div>
    </>
  );
}
