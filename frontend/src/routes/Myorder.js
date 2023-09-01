import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import img from "../images/hero.avif";
import MyOrderCard from "../components/MyOrderCard";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("https://cravingcouriers.onrender.com/api/myOrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div className="row position-relative">
        <img
          src={img}
          className="d-block w-100"
          style={{
            height: "80px",
            filter: "brightness(30%)",
            objectFit: "fill",
          }}
          alt="..."
        />
        <div className="col position-absolute">
          <Navbar />
        </div>
      </div>
      <div className="container">
      <div className="row mb-3">
        {orderData !== {} ? Array(orderData).map((data) => {
            return data.orderData ? data.orderData.order_data.slice(0).reverse().map((item) => {
              return item.map((arrayData) => {
                return (
                    <>
                    {arrayData.Order_date ? (
                      <>
                        <div className="col-12 mt-5">
                          {(data = arrayData.Order_date)}
                        </div>
                        <hr/>
                      </>
                      ) : (
                      <div className="col-12 col-md-6 col-lg-3">
                        <MyOrderCard arrayData={arrayData} data={data}/>
                      </div>
                    )}
                    </>
                );
              });
            })
          : "";
        })
      : ""}
      </div>
      </div>
      <Footer />
    </div>
  );
}
