import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer.jsx";
import Navbar from "../Components/Navbar.jsx";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    // console.log(localStorage.getItem('userEmail'));
    await fetch("http://localhost:3001/GoHunger/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setOrderData(response.eId.order_data);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  console.log(orderData);
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          <h1>Order History</h1>
          {orderData.map((item) =>
            item.map((it) => {
              return (
                <div className="col-12 col-md-6 col-lg-3">
                  <div
                    className="card mt-3"
                    style={{ width: "16rem", maxHeight: "360px" }}
                  >
                    <img
                      src={it.img}
                      className="card-img-top"
                      alt="..."
                      style={{ height: "120px", objectFit: "fill" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{it.name}</h5>
                      <div
                        className="container w-100 p-0"
                        style={{ height: "38px" }}
                      >
                        <span className="m-1">{it.qty}</span>
                        <span className="m-1">{it.size}</span>
                        {/* <span className='m-1'>{it}</span> */}
                        <div className=" d-inline ms-2 h-100 w-20 fs-5">
                          ₹{it.price}/-
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
