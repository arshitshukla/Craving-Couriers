import React from 'react'
import hero from '../images/hero.avif'
import { UseCart, UseDispatchCart } from '../components/ContextReducer'

const Cart = () => {
    let data=UseCart();
    let dispatch=UseDispatchCart();

    if(data.length===0)
    {
        return (
            <div>
                <div className="m-5 w-100 text-center text-white fs-5">The Cart is empty</div>
            </div>
        )
    }
    const handleCheckout=async()=>{
        let userEmail=localStorage.getItem('userEmail');
        const response=await fetch("http://localhost:5000/api/orderData",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date:new Date().toDateString()
            })
        });
        if(response.status===200){
            dispatch({type:"DROP"});
        }
    }
    let totalPrice=data.reduce((total,food)=> total + food.price , 0);
  return (
    <div>
    <div className="row position-relative">
        <div className="col">
            <img src={hero} className="d-block w-100" style={{"filter":"brightness(20%)","objectFit":"fill"}} alt="..."/>
        </div>
        <div className="col position-absolute">
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className='table table-hover'>
                    <thead className="text-danger fs-4">
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((food, index) => (
                        <tr className='text-white'>
                            <th scope='row' >{index + 1}</th>
                            <td >{food.name}</td>
                            <td>{food.qty}</td>
                            <td>{food.size}</td>
                            <td>{food.price}</td>
                            <td ><button type="button" className="btn p-0">
                            <i className="fa-solid fa-trash" style={{color: "#ffffff"}} onClick={()=>{dispatch({type:"REMOVE",index:index})}}/>
                                </button> </td>
                        </tr>
                     ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className="btn btn-danger my-4" onClick={handleCheckout}>CheckOut</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Cart
