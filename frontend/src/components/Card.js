import React, { useEffect, useRef, useState } from "react"; 
import { UseCart, UseDispatchCart } from "./ContextReducer";

const Card = (props) => {
  let dispatch=UseDispatchCart();
  let data=UseCart();
  const priceRef=useRef();
  
  let priceOptions=Object.keys(props.options);

  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("");
  
  let foodPrice= qty * parseInt(props.options[size])

  const handleAddToCart=async()=>{
    let food=[];
    for(const item of data)
    {
      if(item.id === props.foodItem._id){
        food=item;
        break;
      }
    }
    if(food!==[]){
      if(food.size===size){
        await dispatch({type:"UPDATE",id:props.foodItem._id,price:foodPrice,qty:qty})
        return
      }
      else if(food.size!==size){
        await dispatch({type:"ADD",img:props.foodItem.img,id:props.foodItem._id,name:props.foodItem.name,price:foodPrice,qty:qty,size:size})
        return
      }
      return
    } 
    await dispatch({type:"ADD",img:props.foodItem.img,id:props.foodItem._id,name:props.foodItem.name,price:foodPrice,qty:qty,size:size})
    // console.log(data);
  }
  
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div className="m-3">
      <div className="card" style={{"width": "18rem"}}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{"height": "12rem","objectFit":"fill"}}/>
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select className="m-2 h-100 bg-light rounded" onChange={(e)=>{setQty(e.target.value)}}>
                {
                    Array.from(Array(6),(e,i)=>{
                        return(
                            <option key={i+1} value={i+1}>{i+1}</option>
                        )
                    }
                )}
            </select>
            <select className="m-2 h-100 bg-light rounded" ref={priceRef} onChange={(e)=>{setSize(e.target.value)}}>
                {priceOptions.map((data)=>{
                  return(
                    <option key={data} value={data}>{data}</option>
                  )
                })}
            </select>
            <div className="d-inline h-100 fs-5 mx-2">
              ₹{foodPrice}/-
            </div>
            <hr/>
            <button className="btn btn-success" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
