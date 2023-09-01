import React from "react";

const MyOrderCard = (props) => {
  return (
    <div>
      <div className="card mt-3" style={{width: "16rem",maxHeight: "360px"}}>
        <img src={props.arrayData.img} className="card-img-top" alt="..." style={{height: "120px",objectFit: "fill"}}/>
        <div className="card-body">
          <h5 className="card-title">{props.arrayData.name}</h5>
          <div className="container w-100 p-0" style={{ height: "38px" }}>
            <span className="m-1">{props.arrayData.qty}</span>
            <span className="m-1">{props.arrayData.size}</span>
            <span className="m-1">{props.data}</span>
            <div className=" d-inline ms-2 h-100 w-20 fs-5">
              ₹{props.arrayData.price}/-
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderCard;
